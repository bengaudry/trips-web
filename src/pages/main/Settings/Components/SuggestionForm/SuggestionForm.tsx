import { useState } from "react";
import { Input } from "../../../../../components/form";

export function SuggestionForm() {
  const [suggName, setSuggName] = useState("");

  return (
    <form>
      <Input
        name="Suggestion name"
        type="text"
        value={suggName}
        onChange={(e) => setSuggName(e.target.value)}
      />
    </form>
  );
}
