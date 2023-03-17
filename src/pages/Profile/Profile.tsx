import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "../../../server";

export function Profile(props: { setCurrentUser: CallableFunction }) {
  return (
    <>
      <button
        onClick={() => {
          signOut(getFirebaseAuth());
          props.setCurrentUser(null);
        }}
      >
        Log out
      </button>
    </>
  );
}
