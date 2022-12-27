import Block from 'core/Block';

export interface EmptyChatProps {
}

class EmptyChat extends Block {
  static componentName: 'EmptyChat';
  protected render(): string {
    return `
    <div class="chat_page_right_empty">
      <div class="chat_page_right_empty_message">
        Выберите чат чтобы отправить сообщение
      </div>
    </div>
  `
  }
}

export default EmptyChat;
