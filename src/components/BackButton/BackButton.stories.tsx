import { BackButton } from "./BackButton";
import { ComponentMeta } from "@storybook/react";

export default {
  title: "UI/Back Button",
  component: BackButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BackButton>;

export const DEFAULT = (args: { onClick: CallableFunction }) => {
  return <BackButton onClick={(e: any) => args.onClick(e)} />;
};
