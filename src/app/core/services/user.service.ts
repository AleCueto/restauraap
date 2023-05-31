import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { 
  }

  /**
   * Registers a new user with email and password
   * @param email The user's email
   * @param password The user's password
   * @returns A promise that resolves when the user is registered
   */
  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Logs in a user with email and password
   * @param email The user's email
   * @param password The user's password
   * @returns A promise that resolves when the user is logged in
   */
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Logs in a user with Google authentication
   * @returns A promise that resolves when the user is logged in with Google
   */
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  /**
   * Logs out the current user
   * @returns A promise that resolves when the user is logged out
   */
  logout() {
    return signOut(this.auth);
  }

  /**
   * Retrieves the UID of the current user
   * @returns The UID of the current user as a string, or an empty string if the UID is not available
   */
  getUid(): string {
    if (this.auth.currentUser?.uid) {
      return this.auth.currentUser?.uid;
    } else {
      return "";
    }
  }

}
