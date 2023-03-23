import { updatePassword, User } from "firebase/auth";
import { useState } from "react";
import { getFirebaseAuth } from "../../../../../server";
import { Cta } from "../../../../components";

export function ProfilePopup() {
  const [newPass, setNewPass] = useState<string>("");
  const [newPassConfirm, setNewPassConfirm] = useState<string>("");

  return (
    <>
      <h2 className="text-3xl font-semibold mb-4">Change password</h2>
      <input
        type="password"
        className="bg-neutral-800 w-full rounded-lg py-3 px-4 mb-4"
        placeholder="New password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />
      <input
        type="password"
        className="bg-neutral-800 w-full rounded-lg py-3 px-4 mb-4"
        placeholder="New password confirmation"
        value={newPassConfirm}
        onChange={(e) => setNewPassConfirm(e.target.value)}
      />
      <Cta
        func="button"
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
        Change password
      </Cta>
    </>
  );
}
