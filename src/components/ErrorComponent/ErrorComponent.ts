import Block from 'core/block/Block';
import { ErrorComponentProps } from './types';

export class ErrorComponent extends Block<ErrorComponentProps> {
  static componentName = 'ErrorComponent';

  constructor({ error, className = '' }: ErrorComponentProps) {
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
