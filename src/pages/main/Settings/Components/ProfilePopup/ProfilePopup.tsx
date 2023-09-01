import { useState, ReactNode } from "react";
import { Modal } from "../../../../../components";
import { useTranslation } from "react-i18next";
import {
  ChangePass as ChangePassModal,
  DeleteAccount as DeleteAccountModal,
  RequestData as RequestDataModal,
} from "./components";
import { Input } from "../../../../../components/form";
import { getFirebaseAuth } from "../../../../../../server";
import { updateCurrentUser, updateEmail, updateProfile } from "firebase/auth";

export function Button(props: {
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
          ? "text-red-500  hover:bg-red-500 hover:text-white dark:hover:text-grayblue-800"
          : "text-grayblue-500 hover:text-black dark:hover:text-grayblue-200  dark:bg-grayblue-800"
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

  const [email, setEmail] = useState(
    getFirebaseAuth().currentUser?.email as string
  );
  const [userName, setUserName] = useState(
    getFirebaseAuth().currentUser?.displayName as string
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
    const user = getFirebaseAuth().currentUser;
    if (!email || email === "" || !userName || userName === "" || !user) return;

    updateEmail(user, email)
      .then((val) => {
        updateProfile(user, { displayName: userName })
          .then(() => {
            alert("success");
            setEditMode(false);
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        setEmail(user.email as string);
        alert(err);
      });
  };

  return (
    <div className="relative h-full">
      <h2 className="text-3xl font-semibold mb-4">
        {t("settingsPage.popups.profile.title")}
      </h2>

      <section className="flex flex-col gap-2 mb-12">
        <div className="flex flex-row items-center gap-3">
          <i className="fi fi-rr-envelope translate-y-0.5" />
          <input
            type="email"
            className={`${
              editMode
                ? "text-black dark:text-white px-4"
                : "text-grayblue-500 px-0"
            } bg-transparent border-2 disabled:border-transparent border-grayblue-700 rounded-xl py-2 w-full focus:border-black dark:focus:border-brand-500 outline-none transition-[border-color,color,padding] duration-300`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!editMode}
          />
        </div>

        <div className="flex flex-row items-center gap-3">
          <i className="fi fi-rr-id-badge translate-y-0.5" />
          <input
            type="text"
            className={`${
              editMode
                ? "text-black dark:text-white px-4"
                : "text-grayblue-500 px-0"
            } bg-transparent border-2 disabled:border-transparent border-grayblue-700 rounded-xl py-2 w-full focus:border-black dark:focus:border-brand-500 outline-none transition-[border-color,color,padding] duration-300`}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={!editMode}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 pt-3 w-full">
          <button
            onClick={() => setEditMode((prevEditMode) => !prevEditMode)}
            className={`flex flex-row w-full items-center gap-2 border-2 rounded-full pr-6 pl-5 py-2 transition-colors duration-300 border-[#00000030] hover:border-[#00000060] dark:border-[#ffffff30] dark:hover:border-[#ffffff60]`}
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
            className={`bg-brand-400 w-full border-brand-400 hover:bg-brand-500 hover:border-brand-500 text-white flex flex-row items-center gap-2 border-2 rounded-full pr-6 pl-5 py-2 transition-[transform,background-color,border-color] origin-left duration-200 ${
              editMode ? "scale-x-1" : "scale-x-0"
            }`}
          >
            <i className="block translate-y-0.5 fi fi-rr-user-pen p-0 m-0" />
            <span>Update my profile</span>
          </button>
        </div>
      </section>

      <div className="flex flex-col overflow-hidden gap-0.5 rounded-lg w-full absolute bottom-6">
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
        showFn={setModalShown}
        isShown={modalShown}
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
