import { Component, Dispatch, ReactNode, SetStateAction } from "react";
import { Text } from "@/components/texts";

interface ModalProps {
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title?: string | ReactNode;
  unClosable?: boolean;
}

export class Modal extends Component {
  props: ModalProps;
  state: { shakingAnim: boolean };

  constructor(props: ModalProps) {
    super(props);
    this.props = props;

    this.state = {
      shakingAnim: false,
    };
  }

  setShakingAnim = (val: boolean) => {
    this.setState({ shakingAnim: val });
  };

  componentDidUpdate() {
    // Start shaking animation if user tries to dismiss when not allowed
    if (this.state.shakingAnim) {
      setTimeout(() => {
        this.setShakingAnim(false);
      }, 300);
    }

    // Disables scrolling on body when popup is visible
    if (this.props.visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  render() {
    const { visible, setVisible, children, title, unClosable } = this.props;

    return (
      <div
        role="modal"
        className={`${
          this.props.visible
            ? "bg-black/80 pointer-events-auto"
            : "bg-transparent pointer-events-none"
        } fixed flex flex-row items-end justify-start inset-0 transition-colors duration-500 z-50 lg:items-center`}
      >
        <Modal.CloseBackgroundBtn
          setShakingAnim={this.setShakingAnim}
          {...this.props}
        />
        <Modal.MainContainer
          shakingAnim={this.state.shakingAnim}
          {...this.props}
        >
          <Modal.RoundedBar />
          <div className="flex flex-row items-center justify-between px-8">
            {this.props.title ? (
              <Modal.Title value={this.props.title} />
            ) : (
              <div />
            )}
            <Modal.CloseBtn {...this.props} />
          </div>
          <main className="max-h-[70vh] overflow-scroll px-8 pb-10">
            {this.props.children}
          </main>
        </Modal.MainContainer>
      </div>
    );
  }

  public static CloseBackgroundBtn = (props: {
    unClosable?: boolean;
    setVisible?: Dispatch<SetStateAction<boolean>>;
    setShakingAnim: (val: boolean) => void;
  }) => (
    <button
      className={`absolute z-40 w-full h-screen  ${
        props.unClosable && "cursor-not-allowed"
      }`}
      onClick={() => {
        if (props.unClosable) props.setShakingAnim(true);
        if (props.setVisible) props.setVisible(false);
      }}
    />
  );

  public static MainContainer = (props: {
    visible?: boolean;
    shakingAnim?: boolean;
    children: ReactNode;
  }) => (
    <div
      className={`${
        props.visible
          ? "translate-y-0 opacity-100 pointer-events-auto lg:scale-100"
          : "translate-y-full opacity-0 pointer-events-none lg:scale-75 lg:translate-y-0"
      } pt-3 rounded-t-3xl w-full overflow-hidden mx-auto z-50 bg-white dark:bg-grayblue-800 max-w-screen-sm transition-all duration-500 lg:duration-300 lg:rounded-xl lg:pt-10 ${
        props.shakingAnim && "shaking-modal-anim"
      }`}
    >
      {props.children}
    </div>
  );

  public static RoundedBar = () => (
    <div
      className="w-12 mb-10 h-1 bg-grayblue-500 rounded-full m-auto lg:hidden"
      onTouchMoveCapture={(e) => console.log(e)}
    />
  );

  public static Title = (props: { value: string | ReactNode }) => (
    <Text.Title rank={2} className="mb-4">
      {props.value}
    </Text.Title>
  );

  public static CloseBtn = (props: {
    setVisible?: Dispatch<SetStateAction<boolean>>;
    unClosable?: boolean;
  }) => (
    <button
      onClick={() => {
        if (props.setVisible) props.setVisible(false);
      }}
    >
      <Text.Secondary className="hidden lg:block  md:hover:text-black dark:md:hover:text-white transition-colors">
        <i
          className={`fi fi-rr-cross -translate-y-2  ${
            props.unClosable && "hidden"
          }`}
        />
      </Text.Secondary>
    </button>
  );
}
