import Block from 'core/block/Block';
import { appHTTP } from 'utils/http';
import './avatar.css';

interface AvatarProps {
  source?: string;
}

class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';

  constructor({ source }: AvatarProps) {
    super({ source });
  }

  protected render(): string {
    return `
    <div class="avatar_container">
      <img
        class="editable_avatar"
        src="${appHTTP.baseUrl}/resources/${this.props.source || ''}"
        alt="avatar"
      />
    </div>
    `;
  }
}

export default Avatar;
