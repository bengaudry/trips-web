import { useState } from "react";
import { getFirebaseAuth } from "../../../../../../server";
import { Cta, Modal, SecondaryText } from "../../../../../components";
import { Input, Select } from "../../../../../components/form";

type IssueCategory =
  | "auth"
  | "code"
  | "theme"
  | "data"
  | "slowness"
  | "translation"
  | "other";

export function BetaPage() {
  const [modalShown, setModalShown] = useState(false);
  const [issueCategory, setIssueCategory] = useState<IssueCategory>("auth");
  const [otherIssueCategory, setOtherIssueCategory] = useState("");

  return (
    <>
      <h1 className="text-3xl font-semibold">Beta</h1>
      <SecondaryText className="text-lg">
        Welcome to your beta tester space{" "}
        {getFirebaseAuth().currentUser?.displayName} !
      </SecondaryText>
      <div className="flex flex-col gap-3 py-6">
        <button
          onClick={() => setModalShown(true)}
          className="w-full px-4 py-2 bg-red-500/40 hover:bg-red-500/60 transition-colors duration-300 rounded-full flex flex-row items-center gap-2 text-lg font-medium"
        >
          <i className="fi fi-rr-exclamation translate-y-0.5" />
          Report an issue
        </button>
        <button className="w-full px-4 py-2 bg-sky-500/40 hover:bg-sky-500/60 transition-colors duration-300 rounded-full flex flex-row items-center gap-2 text-lg font-medium">
          <i className="fi fi-rr-bulb translate-y-0.5" />
          Submit a suggestion
        </button>
      </div>

      <Modal
        showFn={setModalShown}
        isShown={modalShown}
        title="Report an issue"
      >
        Issue type
        <select
          className="bg-grayblue-900 w-full py-2 px-4 rounded-lg"
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
            placeholder="How would you name this issue ?"
            required
          />
          <label>
            Description *
            <textarea
              placeholder="Describe as precisely as possible the issue you faced while using the app"
              className="bg-transparent border-2 border-grayblue-700 rounded-lg w-full h-36 resize-none outline-none px-6 py-3 placeholder:text-grayblue-500 focus:border-brand-500"
            />
          </label>
          <Input
            name="url"
            type="text"
            placeholder="The url where the issue poped (optionnal)"
          />
          <Cta type="button" className="mt-4">
            Submit issue
          </Cta>
        </div>
      </Modal>
    </>
  );
}
