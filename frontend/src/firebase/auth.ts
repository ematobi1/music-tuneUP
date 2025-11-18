import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./config";
import type { User } from "firebase/auth";

/**
 * Listen to auth state changes.
 */
export function onUser(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Sign in a user with email and password.
 */
export async function login(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

/**
 * Register a new user with email and password.
 */
export async function register(email: string, password: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

/**
 * Sign out the current user.
 */
export async function logout(): Promise<void> {
  await signOut(auth);
}
