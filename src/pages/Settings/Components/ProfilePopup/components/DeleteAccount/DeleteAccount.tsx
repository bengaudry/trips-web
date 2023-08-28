import { deleteUser, User } from "firebase/auth";
import { getFirebaseAuth } from "../../../../../../../server";
import { Cta } from "../../../../../../components";

export function DeleteAccount() {
  const deleteAccount = () => {
    if (confirm("Confirmez la suppression")) {
      if (getFirebaseAuth().currentUser) {
        localStorage.setItem("connected", "false");
        deleteUser(getFirebaseAuth().currentUser as User);
      }
    }
  };

  return (
    <>
      <p className="text-lg text-grayblue-500 mb-4">
        This action is definitive. You will no longer be able to access your
        account and your data will be permanently deleted. There is no way to
        recover your account after it's deletion.
      </p>
      <Cta type="button" color="danger" onClick={deleteAccount}>
        Delete account
      </Cta>
    </>
  );
}
