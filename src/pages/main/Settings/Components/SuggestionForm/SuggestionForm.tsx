import { useState } from "react";
import { Input, Textarea } from "../../../../../components/form";
import { Cta } from "../../../../../components";

export function SuggestionForm() {
  const [suggName, setSuggName] = useState("");
  const [suggContent, setSuggContent] = useState("");

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
      <Cta type="button" className="mt-6">
        Submit suggestion
      </Cta>
    </form>
  );
}
