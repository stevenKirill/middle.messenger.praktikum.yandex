import { BlockConstructable } from 'core/block/Block';
import { store } from 'core/store';
import { AppState } from 'core/store/types';
import isEqual from 'utils/mydash/isEqualAthor';

type TExtractStateFuns = (state: AppState) => { [key: string]: unknown };

function connectStore(mapStateToProps: TExtractStateFuns) {
  return <P>(Component: BlockConstructable<P>) => class extends Component {
    constructor(props: P) {
      const state = mapStateToProps(store.getState());
      super({ ...props, ...state });
      store.on('changed', (prevState, nextState) => {
        const prevStateObj = mapStateToProps(prevState);
        const nextStateObj = mapStateToProps(nextState);
        console.log(Component.componentName);
        console.log(prevStateObj, '=> prevStateObj');
        console.log(nextStateObj, '=> nextStateObj');
        if (!isEqual(prevStateObj, nextStateObj)) {
          console.log('holololo');
          this.setProps({ ...nextStateObj });
        }
      });
    }
  };
}

export default connectStore;
