import Block from 'core/block/Block';
import appRouter from 'core/router';
import { BackLinkProps } from './types';

export class BackLink extends Block<BackLinkProps> {
  static componentName = 'BackLink';

  constructor(props: BackLinkProps) {
    super({
      ...props,
      events: { click: (e: Event) => this.handleGoBack(e) },
    });
  }

  handleGoBack(e: Event) {
    e.preventDefault();
    appRouter.back();
  }

  protected render(): string {
    return `
    <div class="user_left">
      <a class="user_left_link">
        <i class="user_left_link_arrow"></i>
      </a>
    </div>
    `;
  }
}
