import Block from 'core/Block';

export interface ErrorComponentProps {
  error: string;
}

class ErrorComponent extends Block {
  static componentName: 'ErrorComponent';

  constructor({ error }: ErrorComponentProps) {
    super({ error });
  }

  protected render(): string {
    return `
    <div class="chat_page_right_empty">
      {{error}}
    </div>
  `;
  }
}

export default ErrorComponent;
