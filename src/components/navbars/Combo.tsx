import React, {useEffect} from 'react';

const Combo = () => {
    useEffect(() => {
        let navbarPosition = localStorage.getItem('navbarPosition');
        let navbarVertical = document.querySelector('.navbar-vertical') as HTMLElement;
        let navbarTopVertical = document.querySelector('.content .navbar-top') as HTMLElement;
        let navbarTop = document.querySelector('[data-layout] .navbar-top') as HTMLElement;
        let navbarTopCombo = document.querySelector('.content [data-navbar-top="combo"]') as HTMLElement;

        if (navbarPosition === 'top') {
            navbarTop.removeAttribute('style');
            navbarTopVertical.remove();
            navbarVertical.remove();
            navbarTopCombo.remove();
        } else if (navbarPosition === 'combo') {
            navbarVertical.removeAttribute('style');
            navbarTopCombo.removeAttribute('style');
            navbarTop.remove();
            navbarTopVertical.remove();
        } else {
            navbarVertical.removeAttribute('style');
            navbarTopVertical.removeAttribute('style');
            navbarTop.remove();
            navbarTopCombo.remove();
        }
    }, [])

    return (
        <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand-lg" style={{display: 'none'}}
             data-move-target="#navbarVerticalNav" data-navbar-top="combo">

        </nav>
    );
};

export default Combo;