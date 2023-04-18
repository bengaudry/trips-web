import { Cta, CtaProps } from "./Cta";
import { ComponentMeta } from "@storybook/react";

export default {
  title: "UI/Cta",
  component: Cta,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Cta>;

export const NORMAL = (args: CtaProps) => {
  return (
    <Cta type={args.type} color="normal">
      {args.children}
    </Cta>
  );
};
