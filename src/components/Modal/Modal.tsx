import { Component, ReactNode } from "react";

interface ModalProps {
  isShown?: boolean;
  showFn: CallableFunction;
  children: ReactNode;
  title?: string;
}

export class Modal extends Component {
  props: ModalProps;

  constructor(props: ModalProps) {
    super(props);
    this.props = props;
  }

  componentDidMount(): void {
    if (this.props.isShown) {
      document.body.style.overflow = "hidden"
    }
  }

  componentWillUnmount(): void {
    document.body.style.overflow = "auto"
  }

  render() {
    return (
      <div
        className={`${
          this.props.isShown
            ? "bg-black/80 pointer-events-auto"
            : "bg-transparent pointer-events-none"
        } fixed flex flex-row items-end justify-start inset-0 transition-colors duration-500 z-50`}
      >
        <button
          className="absolute z-40 w-full h-screen"
          onClick={() => this.props.showFn(false)}
        ></button>
        <div
          className={`${
            this.props.isShown
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-full opacity-0 pointer-events-none"
          } pb-10 pt-3 px-8 rounded-t-3xl w-full z-50 bg-grayblue-800 transition-all duration-500`}
        >
          <div className="w-12 mb-10 h-1 bg-grayblue-500 rounded-full m-auto"></div>
          {this.props.title ? (
            <h2 className="text-2xl font-semibold mb-4">{this.props.title}</h2>
          ) : (
            ""
          )}
          <>{this.props.children}</>
        </div>
      </div>
    );
  }
}
