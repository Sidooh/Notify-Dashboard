import React from 'react';
import {Link, useMatch, useResolvedPath} from 'react-router-dom';

const CustomNavLink = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true});

    return (
        <Link to={to} className={`nav-link ${match && 'active'}`}{...props}>
            {children}
        </Link>
    );
};

export default CustomNavLink;
