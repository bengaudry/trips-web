import { useState } from "react";
import { useTranslation } from "react-i18next";

import { updatePassword as firebaseUpdatePassword, User } from "firebase/auth";

import { Cta } from "components";
import { Input } from "components/form";
import { CurrentUser } from "api";

export function ChangePass() {
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");

  const { t } = useTranslation();

  const updatePassword = () => {
    if (newPass === newPassConfirm) {
      firebaseUpdatePassword(
        CurrentUser.getUser() as User,
        newPass
      ).catch((err) => alert(err));
    }
  };

  return (
    <>
      <Input
        type="password"
        className="dark:bg-grayblue-800"
        name={t("settingsPage.popups.profile.placeholders.newPass") as string}
        value={newPass}
        onChange={(event) => setNewPass(event.target.value)}
      />
      <Input
        type="password"
        className="dark:bg-grayblue-800"
        name={
          t("settingsPage.popups.profile.placeholders.newPassConfirm") as string
        }
        value={newPassConfirm}
        onChange={(event) => setNewPassConfirm(event.target.value)}
      />
      <Cta
        type="button"
        btnType="submit"
        className="mt-6"
        onClick={updatePassword}
      >
        {t("settingsPage.popups.profile.buttons.changePass")}
      </Cta>
    </>
  );
}
