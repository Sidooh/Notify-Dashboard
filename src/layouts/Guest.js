import React, {useEffect} from 'react';
import OffCanvasSettings from '../components/OffCanvasSettings';

const Guest = ({children}) => {
    useEffect(() => {
        let isFluid = JSON.parse(localStorage.getItem('isFluid'));
        if (isFluid) {
            let container = document.querySelector('[data-layout]');
            container.classList.remove('container');
            container.classList.add('container-fluid');
        }
    }, [children])

    return (
        <>
            <main className="main" id="top">
                <div className="container" data-layout="container">
                    {children}
                </div>
            </main>
            <OffCanvasSettings/>
        </>
    );
};

export default Guest;
