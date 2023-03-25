import { Link } from "react-router-dom";
import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { Cta } from "../../../components";
import { Input } from "../../../components/form";
import { getFirebaseAuth } from "../../../../server";

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="p-8 pb-16 absolute bottom-0 w-full">
      <h2 className="text-3xl font-semibold">Let's sign you in</h2>
      <p className="text-neutral-500">Welcome back !</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          name="email"
          type="email"
          onChange={(e: any) => setEmail(e.target?.value)}
        />
        <Input
          name="password"
          type="password"
          onChange={(e: any) => setPassword(e.target?.value)}
        />
        <Link
          className="text-right mt-2 text-neutral-500 block w-full"
          to="/reset"
        >
          Forgot password ?
        </Link>
        <p className="block text-neutral-500 w-full text-center text-md mb-4 mt-20">
          Don't have an account ?{" "}
          <Link to="/register" className="text-white">
            Register
          </Link>
          .
        </p>
        <Cta
          type="button"
          btnType="submit"
          onClick={() => {
            signInWithEmailAndPassword(getFirebaseAuth(), email, password)
              .then(() => {
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
                    error = err.code
                      .replaceAll("auth/", "")
                      .replaceAll("-", " ");
                    break;
                }
                alert(error);
              });
          }}
        >
          Sign in
        </Cta>
      </form>
    </div>
  );
}
