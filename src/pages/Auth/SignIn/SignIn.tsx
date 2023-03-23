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
        <p className="block text-neutral-500 w-full text-center text-md mb-4 mt-20">
          Don't have an account ?{" "}
          <Link to="/register" className="text-white">
            Register
          </Link>
          .
        </p>
        <Cta
          func="button"
          btnType="submit"
          onClick={() => {
            signInWithEmailAndPassword(getFirebaseAuth(), email, password)
              .then((user) => { window.location.href = "/" })
              .catch((err) => alert(err));
          }}
        >
          Sign in
        </Cta>
      </form>
    </div>
  );
}
