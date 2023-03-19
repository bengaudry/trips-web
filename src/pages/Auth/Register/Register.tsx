import { Link } from "react-router-dom";
import { useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Input } from "../../../components/Forms/Input/Inputs";
import { getFirebaseAuth } from "../../../../server";
import { Cta } from "../../../components/Buttons/Cta";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

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
        <Input
          name="last-name"
          type="text"
          value={lastName}
          onChange={(e: any) => {
            setLastName(e.target?.value);
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
          func="button"
          btnType="submit"
          onClick={() => {
            createUserWithEmailAndPassword(getFirebaseAuth(), email, password)
              .then((user) => {
                updateProfile(user.user, {
                  displayName: `${name} ${lastName}`,
                });
                window.location.href = "/";
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
