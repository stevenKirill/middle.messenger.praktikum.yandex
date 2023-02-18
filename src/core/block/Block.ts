/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import { v4 as uuid } from 'uuid';
import Handlebars from 'handlebars';
import isEqual from '../../utils/mydash/isEqual';
import cloneDeep from '../../utils/mydash/cloneDeep';
import EventBus from '../EventBus';
import { Values } from '../types';

export interface BlockClass<Props = unknown> {
  new(props: Props): Block;
  name: string;
  componentName: string;
}

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

  public id = uuid();

  public node: Nullable<HTMLElement> = null;

  public props: P;

  public children: { [id: string]: Block } = {};

  protected state: object = {};

  public refs: TRefs = {};

  public eventBus: EventBus<Events>;

  constructor(props?: P) {
    this.eventBus = new EventBus<Events>();
    this.props = this._makePropsProxy(props || {} as P);
    this.registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT, this.props);
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
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      return true;
    }
    return false;
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
    this._removeEvents();
    const newElement = fragment.firstElementChild!;
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
          this.eventBus.emit(Block.EVENTS.FLOW_CDM);
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
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, prevProps, nextProps);
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
    const { events } = this.props as Record<string, () => void>;

    if (!events || !this.node) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this.node!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const { events } = this.props as Record<string, () => void>;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this.node!.addEventListener(event, listener);
    });
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(
      {
        ...this.props,
        children: this.children,
        refs: this.refs,
      },
    );

    /** Заменяем заглушки на компоненты */
    Object.entries(this.children).forEach(([id, component]) => {
      /** Ищем заглушку по id */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      /* Заменяем заглушку на component._element */
      const content = component.getContent();
      stub.replaceWith(content);

      /** Ищем элемент layout-а, куда вставлять детей */
      const layoutContent = content.querySelector('[data-layout="1"]');

      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    /** Возвращаем фрагмент */
    return fragment.content;
  }
}
export default Block;
