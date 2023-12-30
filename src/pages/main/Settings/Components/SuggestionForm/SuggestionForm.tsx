import { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { getFirebaseDb } from "../../../../../../server";

import { strTruish } from "@/lib/functions";
import { Cta } from "@/components";
import { Input, Textarea } from "@/components/form";
import { toast } from "react-toastify";
import { CurrentUser } from "@/api";

async function addSuggestion(
  content: { name: string; content: string },
  onSuccess: () => void
) {
  const tripsCollection = collection(getFirebaseDb(), "/betaSuggestions");

  await addDoc(tripsCollection, {
    ...content,
    testerEmail: CurrentUser.getEmail(),
  })
    .then(() => {
      onSuccess();
    })
    .catch((err) => {
      toast(`Error while adding suggestion to database. (Code: ${err.code})`, {
        type: "error",
      });
    });
}

export function SuggestionForm(props: { onSubmit: () => void }) {
  const [suggName, setSuggName] = useState("");
  const [suggContent, setSuggContent] = useState("");

  const handleSuggestionSubmit = () => {
    if (strTruish(suggName) && strTruish(suggContent)) {
      addSuggestion(
        {
          name: suggName,
          content: suggContent,
        },
        props.onSubmit
      );
    }
  };

  return (
    <form>
      <Input
        name="Suggestion name"
        type="text"
        value={suggName}
        onChange={(e) => setSuggName(e.target.value)}
      />
      <Textarea
        name="Content"
        value={suggContent}
        onChange={(val) => setSuggContent(val)}
      />
      <Cta type="button" className="mt-6" onClick={handleSuggestionSubmit}>
        Submit suggestion
      </Cta>
    </form>
  );
}
