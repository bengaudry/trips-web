import { Link } from "react-router-dom";
import { useState } from "react";

import {
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Notification, Cta } from "../../../../../components";
import { Input } from "../../../../../components/form";
import { getFirebaseAuth } from "../../../../../../server";

export function RegisterPage(props: { onSignInClick: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Error popup states
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  return (
    <div className="p-8 pb-16 absolute md:static md:grid place-content-center bottom-0 w-full">
      <Notification
        visible={errorVisible}
        setVisible={setErrorVisible}
        type="error"
        content={errorContent}
      />
      <h2 className="text-3xl font-semibold">Let's register you</h2>
      <p className="text-grayblue-500">Welcome to Trips !</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          name="email"
          type="email"
          onChange={(event) => {
            setEmail(event.target?.value);
          }}
          required
        />
        <Input
          name="password"
          type="password"
          onChange={(event) => {
            setPassword(event.target?.value);
          }}
          required
        />
        <Input
          name="name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target?.value);
          }}
          required
        />
        <p className="block text-grayblue-500 w-full text-center text-md mb-4 mt-20">
          Already have an account ?{" "}
          <button
            type="button"
            className="text-brand-400 dark:text-white"
            onClick={props.onSignInClick}
          >
            Sign In
          </button>
          .
        </p>
        <Cta
          type="button"
          btnType="submit"
          onClick={() => {
            createUserWithEmailAndPassword(getFirebaseAuth(), email, password)
              .then(() => {
                if (getFirebaseAuth().currentUser) {
                  sendEmailVerification(getFirebaseAuth().currentUser as User);
                  updateProfile(getFirebaseAuth().currentUser as User, {
                    displayName: name,
                  })
                    .then(() => {
                      localStorage.setItem("connected", "true");
                      window.location.href = "/";
                    })
                    .catch((err) => {
                      setErrorContent(err.code);
                      setErrorVisible(true);
                    });
                }
              })
              .catch((err) => {
                setErrorContent(err.code);
                setErrorVisible(true);
              });
          }}
        >
          Register
        </Cta>
      </form>
    </div>
  );
}
