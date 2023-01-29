import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from '../EventBus';
import { Nullable, Values } from '../types';
import isEqual from 'utils/mydash/isEqual';
import cloneDeep from 'utils/mydash/cloneDeep';

type Events = Values<typeof Block.EVENTS>;

type TRefs = { [key: string]: Block };

export type BlockConstructable<Props = any> = {
  componentName: string;
  new (props: Props): Block;
};

class Block<P extends object = {}> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;
  static componentName: string;

  public id = nanoid(6);
  public node: Nullable<HTMLElement> = null;
  public props: P;
  public children: { [id: string]: Block } = {};
  protected state: object = {};
  public refs: TRefs = {};

  eventBus: () => EventBus<Events>;

  public constructor(props?: P) {
    const eventBus = new EventBus<Events>();
    this.props = this._makePropsProxy(props || {} as P);
    this.eventBus = () => eventBus;
    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  private registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private createResources() {
    this.node = this.createDocumentElement('div');
  }

  init() {
    this.createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  componentDidMount(_props: P) {}

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(_oldProps: P, _newProps: P) {
    if (!isEqual(_oldProps, _newProps)) {
      return true
    }
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this.node;
  }

  _render() {
    const fragment = this._compile();

    // console.log(fragment, '=> fragment')

    this._removeEvents();
    const newElement = fragment.firstElementChild!;
    // console.log(this.node, '=> node');

    this.node!.replaceWith(newElement);

    this.node = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  _makePropsProxy(props: any): any {
    return new Proxy(props as unknown as object, {
      get: (target: Record<string, unknown>, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        const prevProps = cloneDeep(target);
        target[prop] = value;
        const nextProps = cloneDeep(target);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, prevProps, nextProps);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as P;
  }

   private createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this.node) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this.node!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    console.log(events, '=> event')

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this.node!.addEventListener(event, listener);
    });
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    /**
     * Рендерим шаблон
     */
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(
      { ...this.state,
        ...this.props,
        children: this.children,
        refs: this.refs
      }
    );

    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      /**
       * Заменяем заглушку на component._element
       */
      const content = component.getContent();
      stub.replaceWith(content);

      /**
       * Ищем элемент layout-а, куда вставлять детей
       */
      const layoutContent = content.querySelector('[data-layout="1"]');

      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }
}
export default Block;
