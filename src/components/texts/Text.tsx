import { ReactNode } from "react";

type TextProps = {
  children?: ReactNode | string;
  className?: string;
};

export class Text {
  constructor() {}

  public static Secondary = (props: TextProps) => (
    <p className={`text-neutral-400 dark:text-grayblue-400 ${props.className}`}>
      {props.children}
    </p>
  );

  public static Plain = (props: TextProps) => {
    <p className={`text-black dark:text-white ${props.className}`}>
      {props.children}
    </p>;
  };

  public static Title = (props: TextProps & { rank?: 1 | 2 | 3 }) => {
    let rank = props.rank ?? 1;

    if (rank === 2) {
      return (
        <h2 className={`text-2xl font-semibold ${props.className}`}>
          {props.children ?? ""}
        </h2>
      );
    }

    if (rank === 3) {
      return (
        <h3 className={`text-xl font-medium ${props.className}`}>
          {props.children ?? ""}
        </h3>
      );
    }

    return (
      <h1 className={`text-4xl font-bold ${props.className}`}>
        {props.children ?? ""}
      </h1>
    );
  };
}
