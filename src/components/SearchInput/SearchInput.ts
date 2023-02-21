import Block from 'core/block/Block';
import { store } from 'core/store';
import { filterChats } from 'services/chat/actions';
import logo from '../../assets/loop.png';
import { SearchInputProps } from './types';

export class SearchInput extends Block<SearchInputProps> {
  static componentName = 'SearchInput';

  constructor(props: SearchInputProps) {
    super(props);
    this.setProps({
      ...props,
      events: { input: (e: Event) => this.handleInput(e) },
    });
  }

  handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    store.dispatch(filterChats, value);
  }

  protected render(): string {
    return `
    <label class="chat_page_left_profile_input" htmlFor="search_input">
      <input name="search_input" aria-label="search" value=""  placeholder="Поиск"/>
      <img
        id="magnifier"
        class="magnifier"
        src="${logo}"
        alt="magnifier"
      />
      </label>
    `;
  }
}
