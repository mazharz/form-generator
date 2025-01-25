import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  when: boolean;
}>;

const Visible = ({ when, children }: Props) => {
  if (when) return <>{children}</>;
  return <></>;
};

export { Visible };
