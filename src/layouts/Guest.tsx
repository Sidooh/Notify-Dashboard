import React, {Suspense} from 'react';
import {Children} from '../utils/types';
import {PageLoader} from '../components/Loader';

const Guest = ({children}: Children) => {
    return (
        <>
            <main className="main" id="top">
                <div className="container" data-layout="container">

                    <Suspense fallback={<PageLoader/>}>
                        {children}
                    </Suspense>

                </div>
            </main>
            {/*<OffCanvasSettings/>*/}
        </>
    );
};

export default Guest;
