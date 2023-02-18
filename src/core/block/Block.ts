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

type TProxyObject = Record<string, unknown>;

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

  public refs: TRefs = {};

  public eventBus: EventBus<Events>;

  constructor(props?: P) {
    this.eventBus = new EventBus<Events>();
    this.props = this._makePropsProxy<P>(props || {} as P);
    this.registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  private registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private createNode() {
    this.node = this.createDocumentElement('div');
  }

  init() {
    this.createNode();
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

  componentDidUpdate(oldProps: P, newProps: P) {
    if (!isEqual(oldProps, newProps)) {
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
    const newElement = fragment.firstElementChild;
    if (newElement) {
      this.node!.replaceWith(newElement);
      this.node = newElement as HTMLElement;
      this._addEvents();
    }
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

  _makePropsProxy<T>(props: T) {
    return new Proxy(props as object, {
      get: (target: TProxyObject, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: TProxyObject, prop: string, value: unknown) => {
        const prevProps = cloneDeep(target);
        target[prop] = value;
        const nextProps = cloneDeep(target);
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, prevProps, nextProps);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as P;
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
    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }
      const stubChilds = stub.childNodes.length ? stub.childNodes : [];
      const content = component.getContent();
      stub.replaceWith(content);

      const layoutContent = content.querySelector('[data-layout="1"]');

      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    return fragment.content;
  }
}
export default Block;
