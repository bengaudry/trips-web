import { useState } from "react";

import { sendEmailVerification, User } from "firebase/auth";
import { getFirebaseAuth } from "../../../../server";

import { toast } from "react-toastify";

export function NotVerifiedEmailPopup(props: { className?: string }) {
  const sendEmail = () => {
    if (getFirebaseAuth().currentUser) {
      sendEmailVerification(getFirebaseAuth().currentUser as User)
        .then(() => {
          toast("We sent you an email. Don't forget to check your spam !", {
            type: "info",
          });
        })
        .catch((err) => {
          toast(
            `Error while sending ${err.replaceAll(
              "FirebaseError: Firebase: Error",
              ""
            )}`,
            { type: "error" }
          );
        });
    } else {
      toast("Error while sending. Please sign out and sign in again.", {
        type: "error",
      });
    }
  };

  return !getFirebaseAuth().currentUser?.emailVerified ? (
    <>
      <div
        className={`w-full flex flex-col items-center rounded-lg px-4 py-2 mt-2 bg-yellow-600 ${props.className}`}
      >
        <p className="flex flex-row items-center gap-2">
          <i className="fi fi-rr-exclamation"></i>
          <span className="-translate-y-0.5">Your email is not verified !</span>
        </p>
        <button onClick={sendEmail} className="underline font-semibold">
          Send me an email
        </button>
      </div>
    </>
  ) : (
    <></>
  );
}
