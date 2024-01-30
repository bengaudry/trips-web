import { getFormattedDate } from "@/lib/functions";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { getFirebaseDb } from "../../../server";

function isEmailValid(email: string): boolean {
  const pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

export function JoinBetaPopup({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  const [betaEmailInputFocused, setBetaEmailInputFocused] = useState(false);
  const [betaEmail, setBetaEmail] = useState("");
  const [emailValid, setEmailValid] = useState<boolean | undefined>(false);
  const [emailInUse, setEmailInUse] = useState(false);

  // Checks if the email is in a valid format
  useEffect(() => {
    if (betaEmail === "") {
      setEmailValid(undefined);
      return;
    }
    setEmailValid(isEmailValid(betaEmail));
  }, [betaEmail]);

  // Checks if the beta email is in use
  useEffect(() => {
    const tripsCollection = collection(getFirebaseDb(), "/trips");

    const fetchData = async () => {
      let q = query(tripsCollection, where("email", "==", betaEmail));
      await getDocs(q)
        .then((val) => {
          if (val.docs.length > 0) {
            setEmailInUse(true);
          } else setEmailInUse(false);
        })
        .catch((err) => console.error(`Error while fetching data : ${err}`));
    };

    fetchData();
  }, [emailValid]);

  const getUserDevice = () => {
    return navigator.platform;
  };

  const handleNewBetaTester = async () => {
    if (!betaEmail || betaEmail === "" || !isEmailValid(betaEmail)) return;

    const betaTestersCollection = collection(getFirebaseDb(), "/betaTesters");

    let q = query(betaTestersCollection, where("email", "==", betaEmail));
    await getDocs(q).then(async (val) => {
      if (val.docs.length > 0) {
        toast(t("landing.betaModal.errors.alreadyUsed"), {
          type: "warning",
        });
      } else {
        await addDoc(betaTestersCollection, {
          email: betaEmail,
          creationDate: getFormattedDate(),
          device: getUserDevice(),
        })
          .then(() => {
            setBetaEmail("");
            onClose();
            toast("You are on the waitlist !", {
              type: "success",
            });
          })
          .catch((err) => {
            toast(
              `Error while sending to the database, please contact us. (Code: ${err.code})`,
              { type: "error" }
            );
          });
      }
    });
  };

  return (
    <div
      className={`${
        opened
          ? "pointer-events-all opacity-100 backdrop-blur-lg"
          : "pointer-events-none opacity-0 backdrop-blur-none"
      } transition-all duration-500 ease-out join-beta-popup fixed grid gap-4 place-content-center w-full h-screen bg-[#00000060] z-50`}
    >
      <button
        onClick={onClose}
        className="absolute z-40 w-full h-screen md:hover:cursor-default"
      />
      <button className="fixed top-4 right-4 md:hover:cursor-pointer text-grayblue-100">
        <i className="fi fi-rr-cross"></i>
      </button>

      <div
        className={`${
          opened ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        } flex flex-col z-50 gap-4 max-w-sm lg:max-w-none transition-all duration-500 delay-300 px-6`}
      >
        <h2 className="text-3xl lg:text-5xl font-semibold text-grayblue-100">
          {t("landing.betaModal.title")}
        </h2>
        <div
          className={`relative bg-[#00000040] rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
            emailValid && !emailInUse
              ? "border-green-400"
              : emailValid !== undefined
              ? "border-red-400"
              : "border-transparent"
          } ${
            betaEmailInputFocused
              ? "shadow-2xl scale-110"
              : "border-transparent"
          }`}
        >
          <input
            type="email"
            placeholder={t("landing.betaModal.inputPlaceholder") as string}
            className="w-full bg-transparent px-6 py-3 outline-none"
            onChange={(e) => setBetaEmail(e.target.value)}
            onFocus={() => setBetaEmailInputFocused(true)}
            onBlur={() => setBetaEmailInputFocused(false)}
          />
          <button
            className="absolute grid place-content-center right-0 top-0 text-xl h-full aspect-square disabled:text-neutral-400 transition-colors"
            disabled={!betaEmail || betaEmail === "" || !emailValid}
            onClick={() => handleNewBetaTester()}
          >
            <i className="fi fi-rr-angle-circle-right translate-y-0.5" />
          </button>
        </div>
        <span
          className={`${
            emailValid !== undefined && !emailValid ? "opacity-1" : "opacity-0"
          } text-red-400 font-medium`}
        >
          {t("landing.betaModal.errors.emailFormat")}
        </span>
        <span
          className={`${
            emailValid && emailInUse ? "opacity-1" : "opacity-0"
          } text-red-400 font-medium`}
        >
          {t("landing.betaModal.errors.alreadyUsed")}
        </span>
      </div>
    </div>
  );
}
