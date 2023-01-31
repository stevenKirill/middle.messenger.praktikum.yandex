export type ChatItemProps = TPropsWithEvents<{
  id: number;
  title: string;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    },
    time: string;
    content: string;
  }
  unread_count: string;
  avatar: string | null;
  onClick?: () => void;
  activeClassName: string;
}>;
