import Block from 'core/block/Block';
import logo from '../../assets/tg.png';
import './avatar.css';

class EmptyAvatar extends Block {
  static componentName = 'EmptyAvatar';

  protected render(): string {
    return `
    <div class="avatar_container">
      <img
        class="empty_avatar"
        src="${logo}"
        alt="avatar"
      />
    </div>
    `;
  }
}

export default EmptyAvatar;
