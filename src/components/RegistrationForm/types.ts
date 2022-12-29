export type TError = {
  email: string;
  login: string;
  name: string;
  surName: string;
  phone: string;
  password: string;
  passwordAgain: string;
};

export interface RegistrationProps {
  error?: TError | null;
  onClick?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}
