import { Block } from './Block';
import { BlockConstructable } from './Router';

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';
  root.append(block.getContent()!);
  return root;
}

export default class Route {
  private block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly BlockClass: BlockConstructable,
    private readonly query: string,
  ) {
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public leave() {
    this.block = null;
  }

  public match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  public render() {
    if (!this.block) {
      this.block = new this.BlockClass({});
      render(this.query, this.block);
    }
  }
}
