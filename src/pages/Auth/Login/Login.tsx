import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Input } from "../../../components/Forms/Input/Inputs";
import { getFirebaseAuth } from "../../../../server";

export function LoginPage(props: { setCurrentUser: CallableFunction }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex flex-col items-center py-10 px-4">
        <h2 className="text-2xl font-semibold">Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            name="email"
            type="email"
            onInput={(e: any) => setEmail(e.target?.value)}
          />
          <Input
            name="password"
            type="password"
            onInput={(e: any) => setPassword(e.target?.value)}
          />
          <button
            type="submit"
            className="bg-emerald-500 px-10 py-2 mt-4 rounded-lg transition-colors duration-300 hover:bg-emerald-700 block mx-auto"
            onClick={() => {
              signInWithEmailAndPassword(getFirebaseAuth(), email, password)
                .then((user) => props.setCurrentUser(user))
                .catch((err) => alert(err));
            }}
          >
            Login
          </button>
        </form>
      </div>
      <p className="block w-full text-center">
        Don't have an account ?{" "}
        <Link to="/register" className="text-emerald-400 underline">
          Register here
        </Link>
        .
      </p>
    </>
  );
}
