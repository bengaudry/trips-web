import { deleteUser, updatePassword, User } from "firebase/auth";
import { ChangeEvent, useState, ReactNode } from "react";
import { getFirebaseAuth } from "../../../../../server";
import { Cta, Modal } from "../../../../components";
import { useTranslation } from "react-i18next";
import { Input } from "../../../../components/form";

export function Button(props: {
  children: ReactNode;
  icon: string;
  noborder?: boolean;
  onClick?: CallableFunction;
}) {
  return (
    <button
      className={`w-full text-left text-grayblue-500 hover:text-white transition-colors duration-300 px-4 py-2 ${
        !props.noborder ? "border-b border-grayblue-900" : ""
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

export function ProfilePopup() {
  const { t } = useTranslation();

  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");

  const [modalShown, setModalShown] = useState(false);
  const [currentModal, setCurrentModal] =
    useState<"changePass" | "deleteAccount" | "downloadData">("changePass");
  const [modalTitle, setModalTitle] = useState("");

  const showModal = (
    modal: "changePass" | "deleteAccount" | "downloadData"
  ) => {
    let modalTitle: string;
    switch (modal) {
      case "changePass":
        modalTitle = "Change password";
        break;

      case "deleteAccount":
        modalTitle = "Delete your account";
        break;

      case "downloadData":
        modalTitle = "Download your data";
        break;
    }
    setModalTitle(modalTitle);

    setModalShown(true);
    setCurrentModal(modal);
  };

  return (
    <>
      <h2 className="text-3xl font-semibold mb-4">
        {t("settingsPage.popups.profile.title")}
      </h2>

      <div className="rounded-lg w-full bg-grayblue-800">
        <Button icon="user">Account information</Button>

        <Button icon="lock" onClick={() => showModal("changePass")}>
          Change your password
        </Button>
        <Button icon="download" onClick={() => showModal("downloadData")}>
          Download my data
        </Button>
        <Button icon="trash" onClick={() => showModal("deleteAccount")}>
          Deactivate your account
        </Button>
      </div>

      <Modal showFn={setModalShown} isShown={modalShown} title={modalTitle}>
        {currentModal === "changePass" ? (
          <>
            <Input
              type="password"
              className="bg-grayblue-800"
              name={
                t("settingsPage.popups.profile.placeholders.newPass") as string
              }
              value={newPass}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPass(e.target.value)
              }
            />
            <Input
              type="password"
              className="bg-grayblue-800"
              name={
                t(
                  "settingsPage.popups.profile.placeholders.newPassConfirm"
                ) as string
              }
              value={newPassConfirm}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPassConfirm(e.target.value)
              }
            />
            <Cta
              type="button"
              btnType="submit"
              className="mt-6"
              onClick={() => {
                if (newPass === newPassConfirm) {
                  updatePassword(
                    getFirebaseAuth().currentUser as User,
                    newPass
                  ).catch((err) => alert(err));
                }
              }}
            >
              {t("settingsPage.popups.profile.buttons.changePass")}
            </Cta>
          </>
        ) : currentModal === "downloadData" ? (
          <Cta type="button">Download my data</Cta>
        ) : (
          <>
            <p className="text-lg text-grayblue-500 mb-4">
              This action is definitive
            </p>
            <Cta
              type="button"
              color="danger"
              onClick={() => {
                if (confirm("Confirmez la suppression")) {
                  if (getFirebaseAuth().currentUser) {
                    localStorage.setItem("connected", "false");
                    deleteUser(getFirebaseAuth().currentUser as User);
                  }
                }
              }}
            >
              Delete account
            </Cta>
          </>
        )}
      </Modal>
    </>
  );
}
