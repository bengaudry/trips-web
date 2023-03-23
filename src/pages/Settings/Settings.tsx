import {
  User,
  sendEmailVerification,
  signOut,
  updateProfile,
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
      <div className="px-5 py-16">
        <h2 className="text-4xl font-bold mb-6">Settings</h2>
        <h3 className="text-3xl font-semibold">Account</h3>

        {/* <input
          type="text"
          className="bg-neutral-800"
          onChange={(e) => {
            updateProfile(getFirebaseAuth().currentUser as User, {
              displayName: e.target.value,
            });
          }}
        /> */}

        <Setting
          color="82, 82, 82"
          icon="user"
          subTitle="Personal info"
          name={getFirebaseAuth().currentUser?.displayName as string}
          onClick={() => setChangePasswordPopupShown(true)}
          bigIcon
        />

        <SlidingPage
          isOpened={changePasswordPopupShown}
          setPanelOpened={(val: boolean) => setChangePasswordPopupShown(val)}
        >
          <ProfilePopup />
        </SlidingPage>

        {!getFirebaseAuth().currentUser?.emailVerified ? (
          <div className="w-full flex flex-col items-center rounded-lg px-4 py-2 mt-2 bg-yellow-600">
            <p className="flex flex-row items-center gap-2">
              <i className="fi fi-rr-exclamation"></i>
              <span className="-translate-y-0.5">
                Your email is not verified !
              </span>
            </p>
            <button
              onClick={() => {
                if (getFirebaseAuth().currentUser !== null) {
                  sendEmailVerification(getFirebaseAuth().currentUser as User);
                }
              }}
              className="underline font-semibold"
            >
              Send me an email
            </button>
          </div>
        ) : (
          <></>
        )}

        <h3 className="text-3xl font-semibold mb-4 mt-10">Settings</h3>

        <Setting color="125, 211, 252" icon="interrogation" name="Help" />
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
