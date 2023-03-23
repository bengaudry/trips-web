import {
  signOut,
} from "firebase/auth";
import { getFirebaseAuth } from "../../../server";
import { useState } from "react";
import { SlidingPage } from "../../components";
import { Setting } from "./Components/Setting";
import { ProfilePopup } from "./Components/ProfilePopup/ProfilePopup";

export function Settings() {
  const [changePasswordPopupShown, setChangePasswordPopupShown] =
    useState<boolean>(false);

  return (
    <>
      <SlidingPage isOpened={changePasswordPopupShown} setPanelOpened={(val: boolean) => setChangePasswordPopupShown(val)}>
        <ProfilePopup />
      </SlidingPage>
      <div className="px-5 py-16">
        <h1 className="text-4xl font-bold mb-6">Settings</h1>
        <h2 className="text-3xl font-semibold">Account</h2>

        <div
          className="flex flex-row items-center justify-between py-4 mb-8"
          onClick={() => setChangePasswordPopupShown(true)}
        >
          <div className="flex flex-row items-center gap-4">
            <div className="h-16 aspect-square rounded-full bg-neutral-600/40 flex flex-row items-center justify-center">
              <i className="fi fi-rr-user text-3xl text-neutral-600 translate-y-1"></i>
            </div>
            <div className="flex flex-col">
              <p className="text-xl font-semibold">
                {getFirebaseAuth().currentUser?.displayName}
              </p>
              <p className="text-xl text-neutral-500">Personal info</p>
            </div>
          </div>
          <div className="h-12 aspect-square rounded-2xl bg-neutral-800 flex flex-roww items-center justify-center">
            <i className="fi fi-rr-angle-right text-neutral-400 translate-y-0.5"></i>
          </div>
        </div>

        {/* {!props.user.emailVerified ? (
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
          <div className="w-full flex flex-row gap-2 items-center rounded-lg px-4 py-2 mt-2 bg-green-600">
            <i className="fi fi-rr-shield-check text-md translate-y-0.5"></i>
            <span className="font-semibold">Verified user</span>
          </div>
        )}
        <div
          className="w-full flex flex-row gap-2 items-center rounded-lg px-4 py-2 mt-2 bg-neutral-700"
          onClick={() => setChangePasswordPopupShown(true)}
        >
          <i className="fi fi-rr-lock text-md translate-y-0.5"></i>
          <span className="font-semibold">Change my password</span>
        </div> */}

        <h2 className="text-3xl font-semibold mb-4">Settings</h2>

        <Setting color="125, 211, 252" icon="bell" name="Notification" />
        <Setting color="253, 186, 116" icon="world" name="Language" />
        <Setting
          color="252, 165, 165"
          icon="exit"
          name="Log out"
          onClick={() => {
            if (confirm("Do you really want to be disconnected ?")) {
              signOut(getFirebaseAuth());
            }
          }}
          reduceIconSize
        />
      </div>
    </>
  );
}
