export type InputProps = TPropsWithEvents<{
  name: string;
  type: string;
  placeholder: string;
  value?: string;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}>;
