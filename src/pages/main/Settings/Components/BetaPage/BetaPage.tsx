import { useState } from "react";
import { getFirebaseAuth } from "../../../../../../server";
import { Modal, Text } from "components";
import { BetaIssueForm } from "../BetaIssueForm/BetaIssueForm";
import { SuggestionForm } from "../SuggestionForm/SuggestionForm";

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
  const [modalContent, setModalContent] = useState<"issue" | "suggestion">(
    "issue"
  );

  return (
    <>
      <Text.Title>Beta</Text.Title>
      <Text.Secondary className="text-lg">
        Welcome to your beta tester space{" "}
        {getFirebaseAuth().currentUser?.displayName} !
      </Text.Secondary>
      <div className="flex flex-col gap-3 py-6">
        <button
          onClick={() => {
            setModalContent("issue");
            setModalShown(true);
          }}
          className="w-full px-4 py-2 bg-red-500/40 hover:bg-red-500/60 transition-colors duration-300 rounded-full flex flex-row items-center gap-2 text-lg font-medium"
        >
          <i className="fi fi-rr-exclamation translate-y-0.5" />
          Report an issue
        </button>
        <button
          onClick={() => {
            setModalContent("suggestion");
            setModalShown(true);
          }}
          className="w-full px-4 py-2 bg-sky-500/40 hover:bg-sky-500/60 transition-colors duration-300 rounded-full flex flex-row items-center gap-2 text-lg font-medium"
        >
          <i className="fi fi-rr-bulb translate-y-0.5" />
          Submit a suggestion
        </button>
      </div>

      <Modal
        visible={modalShown}
        setVisible={setModalShown}
        title={
          modalContent === "issue" ? "Report an issue" : "Submit a suggestion"
        }
      >
        {modalContent === "issue" ? (
          <BetaIssueForm onSubmit={() => setModalShown(false)} />
        ) : (
          <SuggestionForm onSubmit={() => setModalShown(false)} />
        )}
      </Modal>
    </>
  );
}
