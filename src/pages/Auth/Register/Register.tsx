import { Link } from "react-router-dom";
import { useState } from "react";

import {
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Cta } from "../../../components";
import { Input } from "../../../components/form";
import { getFirebaseAuth } from "../../../../server";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="p-8 pb-16 absolute bottom-0 w-full">
      <h2 className="text-3xl font-semibold">Let's register you</h2>
      <p className="text-neutral-500">Welcome to Trips !</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          name="email"
          type="email"
          onChange={(e: any) => {
            setEmail(e.target?.value);
          }}
          required
        />
        <Input
          name="password"
          type="password"
          onChange={(e: any) => {
            setPassword(e.target?.value);
          }}
          required
        />
        <Input
          name="name"
          type="text"
          value={name}
          onChange={(e: any) => {
            setName(e.target?.value);
          }}
          required
        />
        <p className="block text-neutral-500 w-full text-center text-md mb-4 mt-20">
          Already have an account ?{" "}
          <Link to="/signin" className="text-white">
            Sign In
          </Link>
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
                    .then(() => (window.location.href = "/"))
                    .catch((err) => alert(err));
                }
              })
              .catch((err) => alert(err));
          }}
        >
          Register
        </Cta>
      </form>
    </div>
  );
}
