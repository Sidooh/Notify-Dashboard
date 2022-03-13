import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="row g-0 justify-content-between fs--1 mt-4 mb-3">
                <div className="col-12 col-sm-auto text-center">
                    <p className="mb-0 text-600">
                        Notifications &nbsp;
                        <span className="d-none d-sm-inline-block">| </span>
                        <br className="d-sm-none"/> 2022 &copy;
                        <a href="https://themewagon.com/">Sidooh</a>
                    </p>
                </div>
                <div className="col-12 col-sm-auto text-center">
                    <p className="mb-0 text-600">v3.8.0</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
