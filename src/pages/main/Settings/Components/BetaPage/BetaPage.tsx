import { useState } from "react";
import { getFirebaseAuth } from "../../../../../../server";
import { Modal, SecondaryText } from "../../../../../components";
import { BetaIssueForm } from "../BetaIssueForm/BetaIssueForm";

export type IssueCategory =
  | "auth"
  | "code"
  | "theme"
  | "data"
  | "slowness"
  | "translation"
  | "other"
  | "missing-or-misplaced-element";

export function BetaPage() {
  const [modalShown, setModalShown] = useState(false);

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
        <BetaIssueForm />
      </Modal>
    </>
  );
}
