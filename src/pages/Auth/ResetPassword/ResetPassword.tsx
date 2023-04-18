import { sendPasswordResetEmail } from "firebase/auth";
import { Input } from "../../../components/form";
import { getFirebaseAuth } from "../../../../server";
import { BackButton, Cta } from "../../../components";
import { useState } from "react";
import { Link } from "react-router-dom";

export function ResetPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="p-8 pb-16 absolute bottom-0 w-full">
      <Link to="/signin">
        <BackButton onClick={function () {}} />
      </Link>
      <h2 className="text-3xl font-semibold">Forgot your password ?</h2>
      <p className="text-grayblue-500">Let's send you an email to reset it</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target?.value)}
        />
        <Cta
          type="button"
          btnType="submit"
          className="mt-8"
          onClick={() => {
            if (email !== "") {
              sendPasswordResetEmail(getFirebaseAuth(), email).catch((err) =>
                alert(err)
              );
            }
          }}
        >
          Send email
        </Cta>
      </form>
    </div>
  );
}
