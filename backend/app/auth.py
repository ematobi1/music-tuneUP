from fastapi import APIRouter
from app.schemas.user_schema import UserCreate, UserOut, UserLogin
from app.services.auth_service import AuthService

router = APIRouter()
auth_service = AuthService()

@router.post("/register", response_model=UserOut)
async def register(user_data: UserCreate):
    return await auth_service.register_user(user_data)

@router.post("/login")
async def login(user_data: UserLogin):
    return await auth_service.login_user(user_data)
