import { CoreRouter } from 'core/router/types';
import { BlockClass } from 'core/types';
import appRouter from 'core/router';

type WithRouterProps = {
  router: CoreRouter
};

function withRouter<P extends WithRouterProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router: appRouter });
    }
  } as BlockClass<Omit<P, 'router'>>;
}

export default withRouter;
