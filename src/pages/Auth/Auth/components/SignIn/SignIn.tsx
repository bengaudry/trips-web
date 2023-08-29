import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { Notification, Cta, Modal } from "../../../../../components";
import { Input } from "../../../../../components/form";
import { getFirebaseAuth } from "../../../../../../server";
import { ResetPassword } from "../ResetPassword/ResetPassword";
import { NavLink } from "react-router-dom";

export function SignInPage(props: { onRegisterClick: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error popup state
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const [resetPassModalShown, setResetPassModalShown] = useState(false);

  const handleSignIn = () => {
    signInWithEmailAndPassword(getFirebaseAuth(), email, password)
      .then(() => {
        localStorage.setItem("connected", "true");
        window.location.href = "/";
      })
      .catch((err) => {
        var error: string;
        switch (err.code) {
          case "auth/wrong-password":
            error = "Wrong password";
            break;

          case "auth/user-not-found":
            error = "This email is not registered";
            break;

          case "auth/invalid-email":
            error = "Email format is invalid";
            break;

          default:
            error = err.code.replaceAll("auth/", "").replaceAll("-", " ");
            break;
        }
        setErrorContent(error);
        setErrorVisible(true);
      });
  };

  return (
    <div className="px-8 py-16 overflow-scroll md:grid md:place-content-center w-full h-max">
      <Modal
        showFn={setResetPassModalShown}
        isShown={resetPassModalShown}
        title="Forgot password ?"
      >
        <ResetPassword email={email} />
      </Modal>
      <Notification
        visible={errorVisible}
        setVisible={setErrorVisible}
        type="error"
        content={errorContent}
      />
      <h2 className="text-3xl font-semibold">Let's sign you in</h2>
      <p className="text-grayblue-500">Welcome back !</p>
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
        <p className="block text-grayblue-500 w-full text-center text-md mb-4 mt-20">
          Don't have an account ?{" "}
          {/* <button
            type="button"
            className="text-brand-400 dark:text-white"
            onClick={props.onRegisterClick}
          >
            Register
          </button> */}
          <NavLink to="/" className="text-brand-400">
            Become a beta tester
          </NavLink>
          .
        </p>
        <Cta type="button" btnType="submit" onClick={handleSignIn}>
          Sign in
        </Cta>
      </form>
    </div>
  );
}
