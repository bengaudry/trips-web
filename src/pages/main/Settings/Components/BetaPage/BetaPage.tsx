import { useState } from "react";
import { Modal, Text } from "@/components";
import { BetaIssueForm } from "../BetaIssueForm/BetaIssueForm";
import { SuggestionForm } from "../SuggestionForm/SuggestionForm";
import { CurrentUser } from "@/api";

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
        Welcome to your beta tester space {CurrentUser.getDisplayName()} !
      </Text.Secondary>
      <div className="flex flex-col gap-3 py-6">
        <button
          onClick={() => {
            setModalContent("issue");
            setModalShown(true);
          }}
          className="w-full px-4 py-2 bg-red-500/40 md:hover:bg-red-500/60 transition-colors duration-300 rounded-full flex flex-row items-center gap-2 text-lg font-medium"
        >
          <i className="fi fi-rr-exclamation translate-y-0.5" />
          Report an issue
        </button>
        <button
          onClick={() => {
            setModalContent("suggestion");
            setModalShown(true);
          }}
          className="w-full px-4 py-2 bg-sky-500/40 md:hover:bg-sky-500/60 transition-colors duration-300 rounded-full flex flex-row items-center gap-2 text-lg font-medium"
        >
          <i className="fi fi-rr-bulb translate-y-0.5" />
          Submit a suggestion
        </button>
        <a
          href="https://github.com/bengaudry/trips-web"
          target="_blank"
          className="w-full px-4 py-2 bg-black/40 md:hover:bg-black/60 text-grayblue-100 transition-colors duration-300 rounded-full flex flex-row items-center gap-2 text-lg font-medium"
        >
          <img src="/github-mark-white.svg" className="h-5" />
          See on Github
        </a>
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
