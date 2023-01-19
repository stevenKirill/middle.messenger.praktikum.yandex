import Block from 'core/block/Block';
import './error.css';

export interface ErrorComponentProps {
  error: string;
  className: string;
}

class ErrorComponent extends Block {
  static componentName = 'ErrorComponent';

  constructor({ error, className }: ErrorComponentProps) {
    super({ error, className });
  }

  protected render(): string {
    return `
    <h4 class="error_message {{className}}">
      {{#if error}}
        {{error}}
      {{/if}}
    </h4>
  `;
  }
}

export default ErrorComponent;
