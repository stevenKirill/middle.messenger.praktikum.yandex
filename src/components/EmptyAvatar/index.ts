import Block from 'core/block/Block';
import logo from '../../assets/tg.png';
import { EmptyAvatarProps } from './types';
import './avatar.css';

class EmptyAvatar extends Block {
  static componentName = 'EmptyAvatar';

  constructor({ width, height }: EmptyAvatarProps) {
    super({ width, height });
  }

  protected render(): string {
    return `
    <div class="avatar_container">
      <img
        width={{ width }}
        height={{ height }}
        class="empty_avatar"
        src="${logo}"
        alt="avatar"
      />
    </div>
    `;
  }
}

export default EmptyAvatar;
