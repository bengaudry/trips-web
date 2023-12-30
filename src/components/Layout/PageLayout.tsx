import { ReactNode } from "react";
import { Text } from "components";
import { motion } from "framer-motion";

export function PageLayout(props: {
  title?: string | null;
  children: ReactNode;
  className?: string;
  key: string | number;
}) {
  return (
    <motion.div
      className={`px-5 py-12 ${props.className}`}
      role="page"
      key={props.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, bounce: false }}
    >
      <Text.Title className="mb-3">{props.title ?? ""}</Text.Title>
      {props.children}
    </motion.div>
  );
}
