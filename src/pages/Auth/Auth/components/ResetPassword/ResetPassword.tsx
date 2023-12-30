import { Cta } from "@/components";
import { Input } from "@/components/form";
import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { getFirebaseAuth } from "../../../../../../server";

export function ResetPassword(props: { email?: string }) {
  const [email, setEmail] = useState(props.email ?? "");

  useEffect(() => {
    setEmail((prevEmail) => props.email ?? email);
  }, [props.email]);

  return (
    <div>
      <p className="text-grayblue-500">Let's send you an email to reset it</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          name="email"
          type="email"
          value={email}
          placeholder="youremail@example.com"
          onChange={(event) => setEmail(event.target?.value)}
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
