import {ComponentProps, Suspense} from "react";
import {PageLoader} from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //
const Loadable = (Component: any) => (props: ComponentProps<any>) =>
    (
        <Suspense fallback={<PageLoader/>}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;