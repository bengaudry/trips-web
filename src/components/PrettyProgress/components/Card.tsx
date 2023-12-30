import { Description } from "./Description";
import { Number } from "./Number";

interface CardProps {
  active?: boolean;
  isActivating?: boolean;
  nb: string;
  desc: string;
}

export function Card(props: CardProps) {
  return (
    <div className="bg-grayblue-900 w-full aspect-square rounded-lg grid place-content-center place-items-center z-20">
      {/* <Number active={props.active} isActivating={props.isActivating}>
        {props.nb}
      </Number> */}
      <Description>{props.desc}</Description>
    </div>
  );
}
