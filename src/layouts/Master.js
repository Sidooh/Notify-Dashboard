import React, {useEffect} from 'react';
import OffCanvasSettings from '../components/OffCanvasSettings';
import Footer from '../components/Footer';
import NavbarVerticalTop from '../components/navbar/NavbarVerticalTop';
import NavbarSearch from '../components/navbar/NavbarSearch';
import NavbarCombo from '../components/navbar/NavbarCombo';
import RequireAuth from '../components/RequireAuth';

const Master = ({children}) => {
    useEffect(() => {
        let isFluid = JSON.parse(localStorage.getItem('isFluid'));
        if (isFluid) {
            let container = document.querySelector('[data-layout]');
            container.classList.remove('container');
            container.classList.add('container-fluid');
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
