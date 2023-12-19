import { getFirebaseAuth } from "../../server"

// let user = getFirebaseAuth().currentUser;
export const CurrentUser = {
  getUser: () => getFirebaseAuth().currentUser, // Returns the User as is in firebase object User
  
  getUid: () => getFirebaseAuth().currentUser?.uid || null,
  getEmail: () => getFirebaseAuth().currentUser?.email || null,
  getDisplayName: () => getFirebaseAuth().currentUser?.displayName || null,
  getPhoneNumber: () => getFirebaseAuth().currentUser?.phoneNumber || null,
  
  isLoggedIn: () => getFirebaseAuth().currentUser ? true : false,
  isEmailVerified: () => getFirebaseAuth().currentUser?.emailVerified || false,
  isPremium: () => {
    // Implement premium logic based on user data
    // For now, returning true by default
    return true;
  },
} as const;