import { BlockConstructable } from 'core/block/Block';
import { store } from 'core/store';
import { AppState } from 'core/store/types';
import isEqual from 'utils/mydash/isEqualAthor';

type TExtractStateFuns = (state: AppState) => { [key: string]: unknown };

function connectStore(mapStateToProps: TExtractStateFuns) {
  return <P>(Component: BlockConstructable<P>) => class extends Component {
    constructor(props: P) {
      const currentStore = store.getState();
      const state = mapStateToProps(currentStore);
      super({ ...props, ...state });
      store.on('changed', (prevState, nextState) => {
        const prevStateObj = mapStateToProps(prevState);
        const nextStateObj = mapStateToProps(nextState);
        if (!isEqual(prevStateObj, nextStateObj)) {
          this.setProps({ ...nextStateObj });
        }
      });
    }
  };
}

export default connectStore;
