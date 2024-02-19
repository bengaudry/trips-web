import { sendEmailVerification, User } from "firebase/auth";
import { toast } from "react-toastify";
import { CurrentUser } from "@/api";
import { useEffect, useState } from "react";

export function NotVerifiedEmailPopup(props: { className?: string }) {
  const [visible, setVisible] = useState(false);

  const sendEmail = () => {
    if (CurrentUser.isLoggedIn()) {
      sendEmailVerification(CurrentUser.getUser() as User)
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

  // Showing the email not verified box only after three seconds
  // to avoid making content flash
  useEffect(() => {
    if (CurrentUser.isEmailVerified()) {
      setVisible(false);
    } else {
      console.log("Setting to false");
      setVisible(false);
      setInterval(() => {
        if (!CurrentUser.isEmailVerified()) setVisible(true);
        console.log("Setting to true");
      }, 3000);
    }
  }, []);

  return visible ? (
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
  ) : (
    <></>
  );
}
