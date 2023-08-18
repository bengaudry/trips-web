import { useState, ReactNode } from "react";
import { Modal } from "../../../../components";
import { useTranslation } from "react-i18next";
import {
  ChangePass as ChangePassModal,
  DeleteAccount as DeleteAccountModal,
  RequestData as RequestDataModal,
} from "./components";

export function Button(props: {
  children: ReactNode;
  icon: string;
  noborder?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`w-full text-left text-neutral-400 hover:text-black dark:text-grayblue-500 dark:hover:text-white transition-colors duration-300 px-4 py-2 ${
        !props.noborder ? "border-b border-white dark:border-grayblue-900" : ""
      }`}
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

  const currentModalView = {
    ChangePass: <ChangePassModal />,
    DeleteAccount: <DeleteAccountModal />,
    RequestData: <RequestDataModal />,
  }[currModal];

  const showModal = (modal: Modals) => {
    setCurrModal(modal);
    setModalShown(true);
  };

  return (
    <>
      <h2 className="text-3xl font-semibold mb-4">
        {t("settingsPage.popups.profile.title")}
      </h2>

      <div className="rounded-lg w-full bg-neutral-100 dark:bg-grayblue-800">
        <Button icon="user">Account information</Button>

        <Button icon="lock" onClick={() => showModal("ChangePass")}>
          Change your password
        </Button>
        <Button icon="download" onClick={() => showModal("RequestData")}>
          Request my data
        </Button>
        <Button
          icon="trash"
          onClick={() => showModal("DeleteAccount")}
          noborder
        >
          Deactivate your account
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
    </>
  );
}
