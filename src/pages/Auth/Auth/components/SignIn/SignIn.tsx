import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "../../../../../../server";

import { Cta, Modal, Text } from "@/components";
import { Input } from "@/components/form";
import { toast } from "react-toastify";
import { ResetPassword } from "../ResetPassword/ResetPassword";

export function SignInPage(props: { onRegisterClick: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassModalShown, setResetPassModalShown] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = () => {
    signInWithEmailAndPassword(getFirebaseAuth(), email, password)
      .then(() => {
        localStorage.setItem("connected", "true");
        navigate("/");
      })
      .catch((err) => {
        toast(
          `Error while signing you in. Please try again. (Code: ${err.code})`,
          { type: "error" }
        );
      });
  };

  return (
    <div className="px-8 py-16 overflow-scroll md:grid md:place-content-center w-full h-max">
      <Modal
        visible={resetPassModalShown}
        setVisible={setResetPassModalShown}
        title="Forgot password ?"
      >
        <ResetPassword email={email} />
      </Modal>
      <Text.Title rank={2}>Let's sign you in</Text.Title>
      <Text.Secondary>Welcome back !</Text.Secondary>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          name="email"
          type="email"
          onChange={(event) => setEmail(event.target?.value)}
        />
        <Input
          name="password"
          type="password"
          onChange={(event) => setPassword(event.target?.value)}
        />
        <button
          type="button"
          className="text-right mt-2 text-grayblue-500 block w-full"
          onClick={() => setResetPassModalShown(true)}
        >
          Forgot password ?
        </button>
        <Text.Secondary className="block w-full text-center text-md mb-4 mt-20">
          Don't have an account ?{" "}
          {/* <button
            type="button"
            className="text-brand-400 dark:text-grayblue-100"
            onClick={props.onRegisterClick}
          >
            Register
          </button> */}
          <NavLink to="/" className="text-brand-400">
            Become a beta tester
          </NavLink>
          .
        </Text.Secondary>
        <Cta type="button" btnType="submit" onClick={handleSignIn}>
          Sign in
        </Cta>
      </form>
    </div>
  );
}
