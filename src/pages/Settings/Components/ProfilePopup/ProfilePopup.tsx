import { deleteUser, updatePassword, User } from "firebase/auth";
import { useState } from "react";
import { getFirebaseAuth } from "../../../../../server";
import { Cta } from "../../../../components";
import { useTranslation } from "react-i18next";

export function ProfilePopup() {
  const { t } = useTranslation();

  const [newPass, setNewPass] = useState<string>("");
  const [newPassConfirm, setNewPassConfirm] = useState<string>("");

  return (
    <>
      <h2 className="text-3xl font-semibold mb-4">{t("settingsPage.popups.profile.title")}</h2>
      <input
        type="password"
        className="bg-grayblue-800 w-full rounded-lg py-3 px-4 mb-4"
        placeholder={t("settingsPage.popups.profile.placeholders.newPass") as string}
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />
      <input
        type="password"
        className="bg-grayblue-800 w-full rounded-lg py-3 px-4 mb-4"
        placeholder={t("settingsPage.popups.profile.placeholders.newPassConfirm") as string}
        value={newPassConfirm}
        onChange={(e) => setNewPassConfirm(e.target.value)}
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
      </Cta>
    </>
  );
}
