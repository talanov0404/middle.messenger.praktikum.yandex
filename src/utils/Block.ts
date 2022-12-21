import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';

interface IMakeChildren<P> {
  children: Record<string, Block>,
  props: P
}

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

type TBlockEvents<P> = {
  [EVENTS.INIT]: [];
  [EVENTS.FLOW_CDM]: [];
  [EVENTS.FLOW_CDU]: [P, P];
  [EVENTS.FLOW_RENDER]: [];
};

export interface IBlock {
  [id: string]: unknown;
}

type TEvents<E> = Record<string, (event: E) => void>;

type TProps<P extends IBlock = any> = {
  events?: TEvents<Event>;
} & P;

export default class Block<P extends IBlock = any> {
  public id: string = makeUUID();
  private _element: HTMLElement | null = null;
  protected props: TProps<P>;
  private eventBus: () => EventBus<TBlockEvents<TProps<P>>>;
  protected children: Record<string, Block | Block[]>;

  constructor(propsAndChildren: TProps<P> = {} as TProps<P>) {
    const eventBus = new EventBus<TBlockEvents<TProps<P>>>();
    const { props, children } = this._getPropsAndChildren(propsAndChildren);
    this.children = children;
    this.props = this.makePropsProxy(props);
    this.eventBus = () => eventBus;
    this.registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);
  }

  private _getPropsAndChildren(propsAndChildren: TProps<P>): IMakeChildren<TProps<P>> {
    const children: Record<string, Block> = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props: props as TProps<P> };
  }

  private makePropsProxy(props: TProps<P>) {
    const self = this;
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };
        // eslint-disable-next-line no-param-reassign
        target[prop as keyof TProps<P>] = value;
        self.eventBus().emit(EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private registerEvents(eventBus: EventBus<TBlockEvents<TProps<P>>>) {
    eventBus.on(EVENTS.INIT, this._init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected _init() {
    this.init();
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  protected init() {
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: TProps<P>, newProps: TProps<P>) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: TProps<P>, newProps: TProps<P>) {
    return oldProps !== newProps;
  }

  public setProps = (nextProps: TProps<P>) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  public get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();
    this._removeEvents();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: string) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: string) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  public getContent() {
    return this.element;
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const fragment = document.createElement('template');
    if (Array.isArray(contextAndStubs)) {
      fragment.innerHTML = template(contextAndStubs.join(''));
    } else {
      fragment.innerHTML = template(contextAndStubs);
    }

    const replaceStub = (component: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }
      component.getContent()?.append(...Array.from(stub.childNodes));
      stub.replaceWith(component.getContent() as HTMLElement);
    };

    Object.values(this.children).forEach((component) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return fragment.content;
  }

  public show() {
    if (this.element) {
      this.element.style.display = 'unset';
    }
  }

  public hide() {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }
}
