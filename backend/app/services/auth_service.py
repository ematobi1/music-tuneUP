from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from app.db.mongodb import get_database
from app.schemas.user_schema import UserCreate, UserLogin
from bson.objectid import ObjectId
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import os

SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")


class AuthService:
    def __init__(self):
        self.db = get_database()["users"]

    async def register_user(self, user_data: UserCreate):
        existing = await self.db.find_one({"email": user_data.email})
        if existing:
            raise Exception("User already exists")
        hashed_pw = pwd_context.hash(user_data.password)
        user = {
            "username": user_data.username,
            "email": user_data.email,
            "password": hashed_pw
        }
        result = await self.db.insert_one(user)
        return {
            "id": str(result.inserted_id),
            "username": user_data.username,
            "email": user_data.email
        }

    async def login_user(self, user_data: UserLogin):
        user = await self.db.find_one({"email": user_data.email})
        if not user or not pwd_context.verify(user_data.password, user["password"]):
            raise Exception("Invalid credentials")
        access_token = jwt.encode({
            "sub": str(user["_id"]),
            "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        }, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": access_token, "token_type": "bearer"}


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return user_id
