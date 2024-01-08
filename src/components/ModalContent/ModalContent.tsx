import React, { ReactNode } from "react";

interface ModalContentProps {
  onClose: () => void;
  children: ReactNode;
}

const ModalContent: React.FC<ModalContentProps> = ({ onClose, children }) => {
  return (
    <div>
      <div>{children}</div>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
};

export default ModalContent;
