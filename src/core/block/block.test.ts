import { expect } from 'chai';
import Block from './Block';

let block: Block;

describe('Roter tests', () => {
  beforeEach(() => {
    block = new Block({});
    block.init();
  });

  it('First test case', () => {
    const props = { title: 'My component' };
    block.setProps(props);
    expect(block.props).to.deep.equal(props);
  });
});
