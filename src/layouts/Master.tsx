import React, { ReactNode, Suspense, useEffect } from 'react';
import OffCanvasSettings from '../components/ThemeSettings';
import Footer from '../components/Footer';
import { SectionLoader } from '../components/Loader';
import { SectionError } from '../components/Error';
import { ErrorBoundary } from 'react-error-boundary';
import OverlayScrollbars from 'overlayscrollbars';

type MasterType = {
    children: ReactNode,
    error?: any
}

const Master = ({children, error}: MasterType) => {
    useEffect(() => {
        let isFluid = JSON.parse(String(localStorage.getItem('isFluid')));

        if (isFluid) {
            let container = document.querySelector('[data-layout]') as HTMLElement;
            container.classList.remove('container');
            container.classList.add('container-fluid');
        }

        const scrollbarInit = function scrollbarInit() {
            Array.prototype.forEach.call(document.querySelectorAll('.scrollbar-overlay'), function (el) {
                return OverlayScrollbars(el, {
                    scrollbars: {
                        autoHide: 'leave',
                        autoHideDelay: 200
                    }
                });
            });
        };

        scrollbarInit();
    }, [children]);

    return (
        <>
            <main className="main" id="top">
                <div className="container" data-layout="container">

                    <div className="content">

                        {
                            error
                                ? <SectionError error={error}/>
                                : <ErrorBoundary FallbackComponent={SectionError}
                                                 onReset={() => window.location.reload()}>
                                    <Suspense fallback={<SectionLoader/>}>
                                        {children}
                                    </Suspense>
                                </ErrorBoundary>
                        }

                        <Footer/>
                    </div>
                </div>
            </main>
            <OffCanvasSettings/>
        </>
    );
};

export default Master;