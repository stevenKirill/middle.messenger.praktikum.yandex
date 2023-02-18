import { expect } from 'chai';
import Block from './Block';

let testComponent: Block;
const props = {
  chatNames: ['first', 'second'],
  name: 'hello',
  id: 12,
};

describe('Block class tests', () => {
  beforeEach(() => {
    class TestComponent extends Block<{}> {
      static componentName = 'TestComponent';

      render() {
        return '<div>Hello world</div>';
      }
    }
    testComponent = new TestComponent(props);
  });

  it('Should render HTML correctly', () => {
    expect(testComponent.getContent().outerHTML).to.equal('<div>Hello world</div>');
  });

  it('Should check initial props are correct', () => {
    expect(testComponent.props).to.deep.equal(props);
  });

  it('Should update props', () => {
    const newProps = {
      chatNames: ['first', 'second'],
      name: 'hello',
      id: 12,
      userEmail: 'kirill@russia.ru',
    };
    testComponent.setProps({ userEmail: 'kirill@russia.ru' });
    expect(testComponent.props).to.deep.equal(newProps);
  });
});
