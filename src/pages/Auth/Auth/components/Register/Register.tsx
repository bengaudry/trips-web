import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "@/api";
import { Cta, Text } from "@/components";
import { Input } from "@/components/form";
import {
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { getFirebaseAuth } from "../../../../../../server";

export function RegisterPage(props: { onSignInClick: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    createUserWithEmailAndPassword(getFirebaseAuth(), email, password)
      .then(() => {
        if (CurrentUser.isLoggedIn()) {
          sendEmailVerification(CurrentUser.getUser() as User);
          updateProfile(CurrentUser.getUser() as User, {
            displayName: name,
          })
            .then(() => {
              localStorage.setItem("connected", "true");
              toast("Created your account successfully. Welcome aboard !", {
                type: "success",
              });
              navigate("/");
            })
            .catch((err) => {
              toast(
                `Error while creating your profile. Please try again. (Code: ${err.code})`,
                { type: "error" }
              );
            });
        }
      })
      .catch((err) => {
        toast(
          `Error while creating your profile. Please try again. (Code: ${err.code})`,
          { type: "error" }
        );
      });
  };

  return (
    <div className="p-8 pb-16 absolute md:static md:grid place-content-center bottom-0 w-full">
      <Text.Title rank={2}>Let's register you</Text.Title>
      <Text.Secondary>Welcome to Trips !</Text.Secondary>
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
        <Text.Secondary className="block w-full text-center text-md mb-4 mt-20">
          Already have an account ?{" "}
          <button
            type="button"
            className="text-brand-400 dark:text-grayblue-100"
            onClick={props.onSignInClick}
          >
            Sign In
          </button>
          .
        </Text.Secondary>
        <Cta type="button" btnType="submit" onClick={handleRegister}>
          Register
        </Cta>
      </form>
    </div>
  );
}
