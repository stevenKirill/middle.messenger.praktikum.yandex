import Block from 'core/Block';

class BackLink extends Block {
  static name = 'BackLink';

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

export default BackLink;
