export type LinkProps = TPropsWithEvents<{
  text: string;
  url: string;
  className: string;
  onClick?: () => void;
}>;
