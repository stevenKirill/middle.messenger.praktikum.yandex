import Block from 'core/Block';
import logo from '../../assets/loop.png';

export interface SearchInputProps {
}

class SearchInput extends Block {
  static name = 'SearchInput';

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

export default SearchInput;
