import Block from 'core/block/Block';
import logo from '../../assets/tg.png';
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
        {{#if ${this.props.source}}}
        class="editable_avatar"
        src="${this.props.source || ''}"
        {{else}}
        class="nonEditable_avatar"
        src="${logo}"
        {{/if}}
        alt="avatar"
      />
    </div>
    `;
  }
}

export default Avatar;
