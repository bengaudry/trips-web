import { deleteUser, updatePassword, User } from "firebase/auth";
import { ChangeEvent, ReactNode, useState } from "react";
import { getFirebaseAuth } from "../../../../../server";
import { Cta, Modal } from "../../../../components";
import { useTranslation } from "react-i18next";
import { Input } from "../../../../components/form";

export function ProfilePopup() {
  const { t } = useTranslation();

  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");

  const [changePasswordModalShown, setChangePasswordModalShown] =
    useState(false);
  const [deleteAccountModalShown, setDeleteAccountModalShown] = useState(false);

  return (
    <>
      <h2 className="text-3xl font-semibold mb-4">
        {t("settingsPage.popups.profile.title")}
      </h2>
      {/* 

      <Cta
        type="button"
        color="danger"
        className="mt-48"
        onClick={() => {
          if (confirm("Voulez vous vraiment supprimer votre compte ?")) {
            if (getFirebaseAuth().currentUser) {
              deleteUser(getFirebaseAuth().currentUser as User);
            }
          }
        }}
      >
        {t("settingsPage.popups.profile.buttons.deleteAccount")}
      </Cta> */}

      <div className="rounded-lg w-full bg-grayblue-800">
        <Button icon="user">Account information</Button>
        <Button
          icon="lock"
          onClick={() => {
            setChangePasswordModalShown(true);
          }}
        >
          Change your password
        </Button>
        <Button icon="download">Download my data</Button>
        <Button
          icon="trash"
          noborder
          onClick={() => {
            setDeleteAccountModalShown(true);
          }}
        >
          Deactivate my account
        </Button>
      </div>

      <Modal
        isShown={changePasswordModalShown}
        showFn={setChangePasswordModalShown}
      >
        <Input
          type="password"
          className="bg-grayblue-800 w-full rounded-lg py-3 px-4 mb-4"
          name={t("settingsPage.popups.profile.placeholders.newPass") as string}
          value={newPass}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewPass(e.target.value)
          }
        />
        <Input
          type="password"
          className="bg-grayblue-800 w-full rounded-lg py-3 px-4 mb-4"
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
      </Modal>

      <Modal
        isShown={deleteAccountModalShown}
        showFn={setDeleteAccountModalShown}
      >
        <>
          <h2 className="text-2xl font-semibold">
            Do you really want to delete your account ?
          </h2>
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
      </Modal>
    </>
  );
}

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
