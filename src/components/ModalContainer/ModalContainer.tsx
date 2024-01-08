import { useModal } from "hooks";
import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const { modalContent } = useModal();
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  const modalWrapper = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(modalContent);

    return () => {
      modalRoot.removeChild(modalWrapper);
    };
  }, [modalRoot, modalWrapper]);

  return isOpen ? ReactDOM.createPortal(children, modalWrapper) : null;
};

export default ModalContainer;
