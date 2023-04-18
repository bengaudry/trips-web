import { sendEmailVerification, User } from "firebase/auth";
import { getFirebaseAuth } from "../../../server";

export function NotVerifiedEmailPopup(props: { className?: string }) {
  if (!getFirebaseAuth().currentUser?.emailVerified) {
    return (
      <div
        className={`w-full flex flex-col items-center rounded-lg px-4 py-2 mt-2 bg-yellow-600 ${props.className}`}
      >
        <p className="flex flex-row items-center gap-2">
          <i className="fi fi-rr-exclamation"></i>
          <span className="-translate-y-0.5">Your email is not verified !</span>
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
    );
  } else {
    return <></>;
  }
}
