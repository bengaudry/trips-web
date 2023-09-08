import { useState } from "react";

import { updateProfile, User } from "firebase/auth";
import { getFirebaseAuth } from "../../../../../server";

import { Cta, Text } from "components";
import { Input } from "components/form";

export function SetUserNameModal(props: {
  setUserNameUnset: (val: boolean) => void;
}) {
  const [newDisplayName, setNewDisplayName] = useState("");

  return (
    <>
      <Text.Secondary>
        Looks like we haven't met yet ! How should we call you ?
      </Text.Secondary>
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
