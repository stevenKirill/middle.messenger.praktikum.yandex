export type FileInputProps = TPropsWithEvents<{
  onOpen?: () => void;
  onInput?: () => void;
  source: string;
}>;
