import { expect } from 'chai';
import sinon from 'sinon';
import { BaseLink as Link } from './index';

describe('Link', () => {
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      go: sinon.fake(),
    };
  });

  it('should render component', () => {
    new Link({ text: 'Go to', route: '/', router: routerMock });
  });

  it('should call Router.go on click', () => {
    const instance = new Link({
      text: 'Go to',
      route: '/abc',
      router: routerMock as any,
    });

    const element = instance.element!;
    element?.click();

    expect(routerMock.go.callCount).to.eq(1);
  });

  it('should call Router.go on click with path', () => {
    const route = '/abc';
    const instance = new Link({
      text: 'Go to',
      route,
      router: routerMock as any,
    });

    const { element } = instance;
    element?.click();

    expect(routerMock.go.firstArg).to.eq(route);
  });
});
