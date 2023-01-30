export interface EditPasswordPageProps {
  error: boolean;
  errorReason: string;
  loading: boolean;
  onClick: () => void;
  onBlur: (e: Event) => void;
}
