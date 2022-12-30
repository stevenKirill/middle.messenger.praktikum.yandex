import Block from 'core/Block';

import './avatar.css';

interface AvatarProps {
  editableAvatar: boolean;
}

class Avatar extends Block {
  static componentName = 'Avatar';

  constructor({ editableAvatar }: AvatarProps) {
    super({ editableAvatar });
  }

  protected render(): string {
    return `
    <div class="avatar_container">
      <img
        {{#if editableAvatar}}
        class="editable_avatar"
        {{else}}
        class="nonEditable_avatar"
        {{/if}}
        src="../../assets/tg.png"
        alt="avatar"
      />
    </div>
    `;
  }
}

export default Avatar;
