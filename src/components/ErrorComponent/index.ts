import Block from 'core/Block';
import './error.css';

export interface ErrorComponentProps {
  error: string;
  className: string;
}

class ErrorComponent extends Block {
  static componentName: 'ErrorComponent';

  constructor({ error, className }: ErrorComponentProps) {
    super({ error, className });
  }

  protected render(): string {
    return `
    <div class="error_message {{className}}">
      {{#if error}}
        {{error}}
      {{/if}}
    </div>
  `;
  }
}

export default ErrorComponent;
