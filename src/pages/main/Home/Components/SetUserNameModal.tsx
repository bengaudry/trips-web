import { useState } from "react";

import { updateProfile, User } from "firebase/auth";
import { Input } from "../../../../components/form";
import { getFirebaseAuth } from "../../../../../server";
import { SecondaryText, Cta } from "../../../../components";

export function SetUserNameModal(props: {
  setUserNameUnset: (val: boolean) => void;
}) {
  const [newDisplayName, setNewDisplayName] = useState("");

  return (
    <>
      <SecondaryText>
        Looks like we haven't met yet ! How should we call you ?
      </SecondaryText>
      <Input
        name="Your name"
        type="text"
        value={newDisplayName}
        onChange={(e) => setNewDisplayName(e.target.value)}
      />
      <Cta
        type="button"
        className="mt-4"
        onClick={() => {
          if (newDisplayName.length >= 2 && getFirebaseAuth().currentUser) {
            updateProfile(getFirebaseAuth().currentUser as User, {
              displayName: newDisplayName,
            })
              .then(() => props.setUserNameUnset(false))
              .catch((err) => {
                console.error(err);
              });
          }
        }}
      >
        Submit
      </Cta>
    </>
  );
}