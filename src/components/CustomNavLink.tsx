import {ReactNode} from 'react';
import {Link, useMatch, useResolvedPath} from 'react-router-dom';

type CustomNavLinkType = {
    children: ReactNode,
    to: string
}

const CustomNavLink = ({children, to, ...props}: CustomNavLinkType) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true});

    return (
        <Link to={to} className={`nav-link ${match && 'active'}`}{...props}>
            {children}
        </Link>
    );
};

export default CustomNavLink;