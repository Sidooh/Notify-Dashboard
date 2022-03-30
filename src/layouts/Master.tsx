import React, { ReactNode, Suspense, useEffect } from 'react';
import OffCanvasSettings from '../components/ThemeSettings';
import Footer from '../components/Footer';
import NavbarVerticalTop from '../components/navbars/VerticalTop';
import NavbarSearch from '../components/navbars/Search';
import NavbarCombo from '../components/navbars/Combo';
import { SectionLoader } from '../components/Loader';
import { SectionError } from '../components/Error';
import { ErrorBoundary } from 'react-error-boundary';
import OverlayScrollbars from 'overlayscrollbars';
import { Tooltip } from 'bootstrap';

type MasterType = {
    children: ReactNode,
    error?: any
}

const Master = ({children, error}: MasterType) => {
    const initTheme = () => {
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

        const tooltipInit = function tooltipInit() {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));

            tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl, {trigger: 'hover'}));
        };

        scrollbarInit();
        tooltipInit();
    };

    useEffect(() => {
        let isFluid = JSON.parse(String(localStorage.getItem('isFluid')));

        if (isFluid) {
            let container = document.querySelector('[data-layout]') as HTMLElement;
            container.classList.remove('container');
            container.classList.add('container-fluid');
        }

        initTheme();
    }, [children]);

    return (
        <>
            <main className="main" id="top">
                <div className="container" data-layout="container">
                    <NavbarVerticalTop/>

                    <div className="content">
                        <NavbarSearch/>
                        <NavbarCombo/>

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