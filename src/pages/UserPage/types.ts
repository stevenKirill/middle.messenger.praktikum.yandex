import { CoreRouter } from 'core/router/types';

export interface UserPageProps {
  editableAvatar: boolean;
  router: CoreRouter;
  onEditDataPage?: (e: Event) => void;
  onEditPasswordPage?: (e: Event) => void;
  onChat?: (e: Event) => void;
  onLogout?: (e: Event) => void;
  firstName: string;
  secondName: string;
  email: string;
  login: string;
  phone: string;
  displayName: string;
  avatar: string;
}
