import { sendEmailVerification, User } from "firebase/auth";
import { getFirebaseAuth } from "../../../server";
import { useState } from "react";
import { Notification } from "../Notification/Notification";

type NotifContent = {
  content: string;
  type: "success" | "error";
};

export function NotVerifiedEmailPopup(props: { className?: string }) {
  const [notification, setNotification] = useState<NotifContent>({
    content: "",
    type: "error",
  });
  const [notifVisible, setNotifVisible] = useState(false);

  const sendEmail = () => {
    if (getFirebaseAuth().currentUser) {
      sendEmailVerification(getFirebaseAuth().currentUser as User)
        .then(() => {
          // Email sent with success
          showNotif(
            "We sent you an email. Don't forget to check your spam !",
            "success"
          );
        })
        .catch((err) => {
          // Error while sending email
          showNotif(
            `Error while sending ${err.replaceAll(
              "FirebaseError: Firebase: Error",
              ""
            )}`,
            "error"
          );
        });
    } else {
      showNotif(
        "Error while sending. Please sign out and sign in again.",
        "error"
      );
    }
  };

  const showNotif = (content: string, type: "success" | "error") => {
    setNotification({ content: content, type: type });
    setNotifVisible(true);
  };

  if (!getFirebaseAuth().currentUser?.emailVerified) {
    return (
      <>
        <Notification
          visible={notifVisible}
          setVisible={setNotifVisible}
          content={notification.content}
          type={notification.type}
        />
        <div
          className={`w-full flex flex-col items-center rounded-lg px-4 py-2 mt-2 bg-yellow-600 ${props.className}`}
        >
          <p className="flex flex-row items-center gap-2">
            <i className="fi fi-rr-exclamation"></i>
            <span className="-translate-y-0.5">
              Your email is not verified !
            </span>
          </p>
          <button onClick={sendEmail} className="underline font-semibold">
            Send me an email
          </button>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
