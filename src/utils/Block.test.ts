import { Block } from './Block';

describe('Block', () => {
  class ComponentMock extends Block {
    protected render(): DocumentFragment {
      return super.render();
    }
  }

  it('should fire init event on initialization', () => {
    new ComponentMock({});
  });
});
