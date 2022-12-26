import Block from '../../core/Block';

interface BackLinkProps {
}

export class BackLink extends Block {
  constructor({}: BackLinkProps) {
    super({});
  }

  protected render(): string {
    return `
    <div class="user_left">
      <a class="user_left_link" href="../index.hbs">
        <i class="user_left_link_arrow"></i>
      </a>
    </div>
    `
  }
}
