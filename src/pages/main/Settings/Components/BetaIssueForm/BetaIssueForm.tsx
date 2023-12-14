import { useState } from "react";
import { Cta } from "components";
import { Input, Textarea } from "components/form";
import type { IssueCategory } from "../BetaPage/BetaPage";
import { collection, addDoc } from "firebase/firestore";
import { getFirebaseDb } from "../../../../../../server";
import { strTruish } from "../../../../../lib/functions";
import { toast } from "react-toastify";
import { CurrentUser } from "api";

export async function addIssue(
  content: {
    category: IssueCategory | string;
    otherCategory?: string;
    title: string;
    description: string;
    issueUrl?: string;
  },
  onSuccess: () => void
) {
  const tripsCollection = collection(getFirebaseDb(), "/betaIssues");

  await addDoc(tripsCollection, {
    ...content,
    testerEmail: CurrentUser.getEmail(),
  })
    .then(() => {
      onSuccess();
    })
    .catch((err) => {
      toast(`Error while adding issue to database. (Code: ${err.code})`, {
        type: "error",
      });
    });
}

export function BetaIssueForm(props: { onSubmit: () => void }) {
  const [issueCategory, setIssueCategory] = useState<IssueCategory>("auth");
  const [otherIssueCategory, setOtherIssueCategory] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [issueUrl, setIssueUrl] = useState("");

  const handleSubmitIssue = () => {
    if (
      strTruish(issueTitle) &&
      strTruish(issueCategory) &&
      strTruish(issueDesc)
    ) {
      addIssue(
        {
          category:
            issueCategory === "other"
              ? `Other : ${otherIssueCategory}`
              : issueCategory,
          title: issueTitle,
          description: issueDesc,
          issueUrl: issueUrl,
        },
        props.onSubmit
      );
    } else {
      toast("Please fill in all fields");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      Issue type
      <select
        className="dark:bg-grayblue-900 w-full py-2 px-4 rounded-lg"
        onChange={(e) => setIssueCategory(e.target.value as IssueCategory)}
      >
        <option value="auth" selected>
          Authentication
        </option>
        <option value="code">Code</option>
        <option value="theme">Dark / Light mode</option>
        <option value="data">Data</option>
        <option value="slowness">Slowness</option>
        <option value="translation">Translation</option>
        <option value="missing-or-misplaced-element">
          Missing or misplaced element
        </option>
        <option value="other">Other</option>
      </select>
      {issueCategory === "other" && (
        <Input
          name="Other category"
          type="text"
          required
          placeholder="What category would you put this issue in ?"
          value={otherIssueCategory}
          onChange={(e) => setOtherIssueCategory(e.target.value)}
        />
      )}
      <div className="flex flex-col gap-4">
        <Input
          name="title"
          type="text"
          value={issueTitle}
          onChange={(e) => setIssueTitle(e.target.value)}
          placeholder="How would you name this issue ?"
          required
        />
        {/* <label>
          Description *
          <textarea
            placeholder="Describe as precisely as possible the issue you faced while using the app"
            value={issueDesc}
            onChange={(e) => setIssueDesc(e.target.value)}
            className="bg-transparent border-2 border-grayblue-700 rounded-lg w-full h-36 resize-none outline-none px-6 py-3 placeholder:text-grayblue-500 focus:border-brand-500"
          />
        </label> */}
        <Textarea
          name="Description"
          required
          placeholder="Describe as precisely as possible the issue you faced while using the app"
          className="h-48"
          value={issueDesc}
          onChange={(val) => setIssueDesc(val)}
        ></Textarea>
        <Input
          name="url"
          type="text"
          value={issueUrl}
          onChange={(e) => setIssueUrl(e.target.value)}
          placeholder="The url where the issue poped (optionnal)"
        />
        <Cta type="button" className="mt-4" onClick={handleSubmitIssue}>
          Submit issue
        </Cta>
      </div>
    </form>
  );
}
