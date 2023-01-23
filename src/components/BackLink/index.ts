import Block from 'core/block/Block';
import { CoreRouter } from 'core/router/types';
import withRouter from 'utils/HOCS/withRouter';

interface BackLinkProps {
  onClick: () => void;
  router: CoreRouter;
}

class BackLink extends Block<BackLinkProps> {
  static componentName = 'BackLink';

  constructor({ onClick }: BackLinkProps) {
    // @ts-ignore
    super({ events: { click: onClick } });
    this.setProps({
      ...this.props,
      onClick: () => this.handleGoBack(),
    });
  }

  handleGoBack() {
    // TODO back link
    console.log('hello');
    this.props.router.back();
  }

  protected render(): string {
    return `
    <div class="user_left">
      <a class="user_left_link" href="#">
        <i class="user_left_link_arrow"></i>
      </a>
    </div>
    `;
  }
}

// @ts-ignore FIX
export default withRouter(BackLink);
