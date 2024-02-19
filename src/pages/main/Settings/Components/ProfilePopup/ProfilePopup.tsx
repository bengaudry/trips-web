import { useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { User, updateEmail, updateProfile } from "firebase/auth";

import { Modal, Text } from "@/components";
import {
  ChangePass as ChangePassModal,
  DeleteAccount as DeleteAccountModal,
  RequestData as RequestDataModal,
} from "./components";
import { toast } from "react-toastify";
import { capitalizeString } from "@/lib/functions";
import { CurrentUser } from "@/api";

function Button(props: {
  children: ReactNode;
  icon: string;
  noborder?: boolean;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`${
        props.danger
          ? "text-red-500  md:hover:bg-red-500 md:hover:text-grayblue-100 dark:md:hover:text-grayblue-800"
          : "text-grayblue-500 md:hover:text-black dark:md:hover:text-grayblue-200  dark:bg-grayblue-800"
      } bg-neutral-100 dark:bg-grayblue-800 w-full text-left  transition-colors duration-300 px-4 py-2`}
      onClick={() => {
        if (props.onClick) props.onClick();
      }}
    >
      <i
        className={`inline-block fi fi-rr-${props.icon} mr-2 translate-y-0.5`}
      ></i>
      <span>{props.children}</span>
    </button>
  );
}

type Modals = "ChangePass" | "DeleteAccount" | "RequestData";

export function ProfilePopup() {
  const { t } = useTranslation();

  const [currModal, setCurrModal] = useState<Modals>("ChangePass");
  const [modalShown, setModalShown] = useState(false);

  const [email, setEmail] = useState(CurrentUser.getEmail() as string);
  const [userName, setUserName] = useState(
    CurrentUser.getDisplayName() as string
  );

  const [editMode, setEditMode] = useState(false);

  const currentModalView = {
    ChangePass: <ChangePassModal />,
    DeleteAccount: <DeleteAccountModal />,
    RequestData: <RequestDataModal />,
  }[currModal];

  const showModal = (modal: Modals) => {
    setCurrModal(modal);
    setModalShown(true);
  };

  const handleEditProfile = () => {
    if (
      !email ||
      email === "" ||
      !userName ||
      userName === "" ||
      !CurrentUser.isLoggedIn()
    ) {
      return toast("Please fill in all fields correctly", { type: "warning" });
    }

    const user = CurrentUser.getUser() as User;

    updateEmail(user, email)
      .then(() => {
        updateProfile(user, { displayName: userName })
          .then(() => {
            toast("Updated your profile successfully", { type: "success" });
            setEditMode(false);
          })
          .catch((err) => {
            console.log(err.code);
            toast(
              capitalizeString(
                err.code.replaceAll("-", " ").replaceAll("auth/", "")
              ),
              { type: "error" }
            );
          });
      })
      .catch((err) => {
        toast(
          capitalizeString(
            err.code.replaceAll("-", " ").replaceAll("auth/", "")
          ),
          { type: "error" }
        );
      });
  };

  return (
    <div>
      <Text.Title rank={2} className="text-3xl font-semibold mb-4">
        {t("settingsPage.popups.profile.title")}
      </Text.Title>

      <section className="flex flex-col gap-2 mb-12">
        <div className="flex flex-row items-center gap-3">
          <i className="fi fi-rr-envelope translate-y-0.5 absolute left-8" />
          <input
            type="email"
            autoComplete="false"
            className={`${
              editMode
                ? "text-black dark:text-grayblue-100"
                : "dark:text-grayblue-500"
            } pl-10 bg-transparent border-2 disabled:border-neutral-300/40 dark:disabled:border-grayblue-700/40 border-neutral-300 dark:border-grayblue-700 rounded-xl py-2 w-full focus:border-brand-300 dark:focus:border-brand-500 outline-none transition-all duration-300`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!editMode}
          />
        </div>

        <div className="flex flex-row items-center gap-3">
          <i className="fi fi-rr-id-badge translate-y-0.5 absolute left-8" />
          <input
            type="text"
            autoComplete="false"
            className={`${
              editMode
                ? "text-black dark:text-grayblue-100"
                : "dark:text-grayblue-500"
            } pl-10 bg-transparent border-2 disabled:border-neutral-300/40 dark:disabled:border-grayblue-700/40 border-neutral-300 dark:border-grayblue-700 rounded-xl py-2 w-full focus:border-brand-300 dark:focus:border-brand-500 outline-none transition-all duration-300`}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={!editMode}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 pt-3 w-full">
          <button
            onClick={() => setEditMode((prevEditMode) => !prevEditMode)}
            className={`flex flex-row w-full items-center gap-2 border-2 rounded-full pr-6 pl-5 py-2 transition-colors duration-300 border-[#00000030] md:hover:border-[#00000060] dark:border-white/10 dark:md:hover:border-white/20`}
          >
            <i
              className={`block translate-y-0.5 fi fi-rr-${
                editMode ? "cross" : "pencil"
              } p-0 m-0`}
            />
            <span>{editMode ? "Stop editing" : "Edit profile"}</span>
          </button>

          <button
            onClick={handleEditProfile}
            className={`bg-brand-400 w-full overflow-hidden border-brand-400 md:hover:bg-brand-500 md:hover:border-brand-500 text-grayblue-100 grid rounded-full pr-6 pl-5 transition-all origin-left duration-200 ${
              editMode
                ? "grid-rows-[1fr] py-2 border-2"
                : "grid-rows-[0fr] py-0 border-none"
            }`}
          >
            <div className="w-full overflow-hidden flex flex-row items-center gap-2">
              <i className="block translate-y-0.5 fi fi-rr-user-pen p-0 m-0" />
              <span>Update my profile</span>
            </div>
          </button>
        </div>
      </section>

      <div className="flex flex-col overflow-hidden gap-0.5 rounded-lg">
        <Button icon="lock" onClick={() => showModal("ChangePass")}>
          Change my password
        </Button>
        <Button icon="download" onClick={() => showModal("RequestData")}>
          Request my data
        </Button>
        <Button icon="trash" danger onClick={() => showModal("DeleteAccount")}>
          Deactivate my account
        </Button>
      </div>

      <Modal
        visible={modalShown}
        setVisible={setModalShown}
        title={
          currModal === "ChangePass"
            ? "Change password"
            : currModal === "DeleteAccount"
            ? "Deactivate my account"
            : "Request my data"
        }
      >
        {currentModalView}
      </Modal>
    </div>
  );
}
