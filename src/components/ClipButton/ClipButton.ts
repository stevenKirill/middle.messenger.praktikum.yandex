import Block from 'core/block/Block';
import clip from '../../assets/clip.png';

interface ClipButtonProps {
  onOpenFile: () => void;
  onLoadFile: (e: Event) => void;
}

export class ClipButton extends Block {
  static componentName = 'ClipButton';

  constructor({ onOpenFile, onLoadFile }: ClipButtonProps) {
    super({
      events: {
        click: onOpenFile,
        input: onLoadFile,
      },
    });
  }

  protected render(): string {
    return `
      <div class="clip_input_wrapper">
        <input
          accept="image/*"
          class="clip_input"
          id="chatFiles"
          multiple
          type="file"
        />
        <label class="clip_icon" htmlFor="chatFiles">
          <img src=${clip} alt="clip" />
        </label>
      </div>
    `;
  }
}
