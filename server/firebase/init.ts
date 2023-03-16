// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./config";
import { FirebaseConfig } from "../index";
import { Auth, getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function getFirebaseApp(): FirebaseApp {
  return app;
}

export function getFirebaseAnalytics(): Analytics {
  return analytics;
}

export function getFirebaseConfig(): FirebaseConfig {
  return firebaseConfig;
}

export function getFirebaseAuth(): Auth {
  return getAuth(app);
}