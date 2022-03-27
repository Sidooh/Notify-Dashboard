import React, {useEffect} from 'react';

const NavbarCombo = () => {
    useEffect(() => {
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
    }, [])

    return (
        <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand-lg" style={{display: 'none'}}
             data-move-target="#navbarVerticalNav" data-navbar-top="combo">

        </nav>
    );
};

export default NavbarCombo;
