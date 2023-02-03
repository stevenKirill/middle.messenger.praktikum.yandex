import Block from 'core/block/Block';

interface ClipButtonProps {
  onClick: () => void;
}

export class ClipButton extends Block {
  static componentName = 'ClipButton';

  constructor({ onClick }: ClipButtonProps) {
    super({ events: { click: onClick } });
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
      </label>
    </div>
    `;
  }
}
