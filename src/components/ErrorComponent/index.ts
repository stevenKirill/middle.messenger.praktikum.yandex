import Block from 'core/Block';
import './error.css';

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
    <div class="error_message">
      {{error}}
    </div>
  `;
  }
}

export default ErrorComponent;
