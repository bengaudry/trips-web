import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { Input } from "../../../components/Forms/Input/Inputs";
import { getFirebaseAuth } from "../../../../server";

export function RegisterPage(props: { setCurrentUser: CallableFunction }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex flex-col items-center py-10 px-4">
        <h2 className="text-2xl font-semibold">Register</h2>
        <form onSubmit={(e) => e.preventDefault()} className="w-10/12">
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
          <button
            type="submit"
            className="bg-emerald-500 px-10 py-2 mt-4 rounded-lg transition-colors duration-300 hover:bg-emerald-700 block mx-auto"
            onClick={() => {
              createUserWithEmailAndPassword(getFirebaseAuth(), email, password)
                .then((user) => props.setCurrentUser(user))
                .then(() => window.location.href = "/")
                .catch((err) => alert(err));
            }}
          >
            Register
          </button>
        </form>
      </div>
      <p className="block w-full text-center">
        Have an account ?{" "}
        <Link to="/" className="text-emerald-400 underline">
          Login here
        </Link>
        .
      </p>
    </>
  );
}
