import React, {useEffect} from 'react';
import OffCanvasSettings from '../components/OffCanvasSettings';
import Footer from '../components/Footer';
import NavbarVerticalTop from '../components/navbar/NavbarVerticalTop';
import NavbarSearch from '../components/navbar/NavbarSearch';
import NavbarCombo from '../components/navbar/NavbarCombo';

const Master = ({children}) => {
    useEffect(() => {
        let isFluid = JSON.parse(localStorage.getItem('isFluid'));
        if (isFluid) {
            let container = document.querySelector('[data-layout]');
            container.classList.remove('container');
            container.classList.add('container-fluid');
        }

        let navbarPosition = localStorage.getItem('navbarPosition');
        let navbarVertical = document.querySelector('.navbar-vertical');
        let navbarTopVertical = document.querySelector('.content .navbar-top');
        let navbarTop = document.querySelector('[data-layout] .navbar-top');
        let navbarTopCombo = document.querySelector('.content [data-navbar-top="combo"]');

        if (navbarPosition === 'top') {
            navbarTop.removeAttribute('style');
            navbarTopVertical.remove(navbarTopVertical);
            navbarVertical.remove(navbarVertical);
            navbarTopCombo.remove(navbarTopCombo);
        } else if (navbarPosition === 'combo') {
            navbarVertical.removeAttribute('style');
            navbarTopCombo.removeAttribute('style');
            navbarTop.remove(navbarTop);
            navbarTopVertical.remove(navbarTopVertical);
        } else {
            navbarVertical.removeAttribute('style');
            navbarTopVertical.removeAttribute('style');
            navbarTop.remove(navbarTop);
            navbarTopCombo.remove(navbarTopCombo);
        }
    }, [children]);

    return (
        <>
            <main className="main" id="top">
                <div className="container" data-layout="container">
                    <NavbarVerticalTop/>

                    <div className="content">
                        <NavbarSearch/>
                        <NavbarCombo/>

                        {children}

                        <Footer/>
                    </div>
                </div>
            </main>
            <OffCanvasSettings/>
        </>
    );
};

export default Master;
