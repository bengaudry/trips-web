import {
  User,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
  updateEmail
} from "firebase/auth";
import { getFirebaseAuth } from "../../../server";
import { useState } from "react";

export function Profile(props: {
  user: User;
  setCurrentUser: CallableFunction;
}) {
  const [signOutPopupVisible, setSignOutPopupVisible] =
    useState<boolean>(false);

  return (
    <div className="px-5 py-16">
      <h1 className="text-4xl font-semibold mb-4">Profile</h1>
      <p>
        Logged in as <span className="font-semibold">{props.user.email}</span>
      </p>
      {!props.user.emailVerified ? (
        <div className="w-full flex flex-col items-center rounded-lg px-4 py-2 mt-2 bg-yellow-600">
          <p className="flex flex-row items-center gap-2">
            <i className="fi fi-rr-exclamation"></i>
            <span className="-translate-y-0.5">
              Your email is not verified !
            </span>
          </p>
          <button
            onClick={() => sendEmailVerification(props.user)}
            className="underline font-semibold"
          >
            Send me an email
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-row gap-2 items-center rounded-lg px-4 py-1 mt-2 bg-green-600">
          <i className="fi fi-rr-shield-check text-sm"></i>
          <span className="font-semibold -translate-y-0.5">Verified user</span>
        </div>
      )}
      <div
        className="w-full flex flex-row gap-2 items-center rounded-lg px-4 py-1 mt-2 bg-slate-700"
      >
        <i className="fi fi-rr-lock text-sm"></i>
        <span className="font-semibold -translate-y-0.5">
          Change my password
        </span>
      </div>
      <button
        onClick={() => {
          setSignOutPopupVisible(true);
        }}
        className="bg-red-600 px-4 py-1 rounded-md font-semibold transition-colors duration-200 hover:bg-red-800 mt-4"
      >
        Log out
      </button>
      <div
        className={`${
          signOutPopupVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } bg-[#00000099] transition-opacity duration-300 fixed z-50 inset-0 w-screen h-screen flex flex-row items-center justify-center`}
        onClick={() => {
          setSignOutPopupVisible(false);
        }}
      >
        <div
          className={`${
            signOutPopupVisible ? "scale-100" : "scale-0"
          } bg-slate-800 px-8 py-8 max-w-[90%] transition-transform duration-300 rounded-lg`}
        >
          <h2 className="text-2xl font-semibold">
            Do you really want to log out ?
          </h2>
          <div className="flex flex-row items-center justify-end gap-2">
            <button
              onClick={() => {
                setSignOutPopupVisible(false);
              }}
              className="bg-transparent border-2 border-red-600 px-4 py-1 rounded-md text-red-500 font-semibold transition-colors duration-200 mt-4"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                signOut(getFirebaseAuth());
                props.setCurrentUser(null);
              }}
              className="bg-red-600 border-2 border-red-600 px-4 py-1 rounded-md font-semibold transition-colors duration-200 hover:bg-red-800 hover:border-red-800 mt-4"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
