import { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { getFirebaseDb, getFirebaseAuth } from "../../../../../../server";

import { strTruish } from "../../../../../lib/functions";
import { Cta } from "components";
import { Input, Textarea } from "components/form";

async function addSuggestion(content: { name: string; content: string }) {
  const tripsCollection = collection(getFirebaseDb(), "/betaSuggestions");

  await addDoc(tripsCollection, {
    ...content,
    testerEmail: getFirebaseAuth().currentUser?.email,
  })
    .then(() => {
      window.location.href = "/settings";
    })
    .catch((err) => {
      console.log("Firebase error :", err);
      alert(
        `Error while sending to the database, please contact us. (Error: ${err})`
      );
      return false;
    });

  return true;
}

export function SuggestionForm() {
  const [suggName, setSuggName] = useState("");
  const [suggContent, setSuggContent] = useState("");

  const handleSuggestionSubmit = () => {
    if (strTruish(suggName) && strTruish(suggContent)) {
      addSuggestion({
        name: suggName,
        content: suggContent,
      });
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
