import Block from 'core/Block';
import './clipButton.css';

interface ClipButtonProps {
  onClick: () => void;
}
  // TODO имитация клика на инпут при клике на лейбл
class ClipButton extends Block {
  constructor({ onClick }: ClipButtonProps) {
    super({ events: { click: onClick }});
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
    `
  }
}

export default ClipButton;

