import {
  User,
  sendEmailVerification,
  signOut,
  updatePassword,
} from "firebase/auth";
import { getFirebaseAuth } from "../../../server";
import { ReactNode, useState } from "react";
import { Cta } from "../../components/Buttons/Cta";
import { Setting } from "./Components/Setting";

function Popup(props: {
  children: ReactNode;
  shown: boolean;
  hideFn: CallableFunction;
}) {
  const [newPass, setNewPass] = useState<string>("");
  const [newPassConfirm, setNewPassConfirm] = useState<string>("");

  return (
    <div
      className={`${
        props.shown
          ? "translate-x-0 pointer-events-auto"
          : "translate-x-full pointer-events-none"
      } transition-transform duration-500 w-screen h-screen bg-neutral-900 z-40 fixed inset-0 p-8 py-16
      `}
    >
      <button
        className="text-neutral-400 font-semibold text-lg mb-8 flex flex-row items-center gap-2"
        onClick={() => props.hideFn(false)}
      >
        <i className="fi fi-rr-angle-left translate-y-0.5"></i>
        <span>Back</span>
      </button>
      {props.children}
      <input
        type="password"
        className="bg-neutral-800 w-full rounded-lg py-3 px-4 mb-4"
        placeholder="New password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />
      <input
        type="password"
        className="bg-neutral-800 w-full rounded-lg py-3 px-4 mb-4"
        placeholder="New password confirmation"
        value={newPassConfirm}
        onChange={(e) => setNewPassConfirm(e.target.value)}
      />
      <Cta
        func="button"
        btnType="submit"
        className="mt-6"
        onClick={() => {
          if (newPass === newPassConfirm) {
            updatePassword(getFirebaseAuth().currentUser as User, newPass)
              .then(() => props.hideFn())
              .catch((err) => alert(err));
          }
        }}
      >
        Change password
      </Cta>
    </div>
  );
}

export function Settings(props: {
  user: User;
  setCurrentUser: CallableFunction;
}) {
  const [changePasswordPopupShown, setChangePasswordPopupShown] =
    useState<boolean>(false);

  return (
    <>
      <Popup
        shown={changePasswordPopupShown}
        hideFn={setChangePasswordPopupShown}
      >
        <h2 className="text-3xl font-semibold mb-4">Change password</h2>
      </Popup>
      <div className="px-5 py-16">
        <h1 className="text-4xl font-bold mb-6">Settings</h1>
        <h2 className="text-3xl semibold">Account</h2>

        <div className="flex flex-row items-center justify-between py-4 mb-8" onClick={() => setChangePasswordPopupShown(true)}>
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

        <h2 className="text-3xl semibold mb-4">Settings</h2>

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
