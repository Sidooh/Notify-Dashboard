import React, { createElement } from 'react';
import { Badge, Flex, RouteChildType } from '@nabcellent/sui-react';

export type NavbarVerticalMenuItemType = {
    route: RouteChildType
};

const NavbarVerticalMenuItem = ({ route }: NavbarVerticalMenuItemType) => {
    return (
        <Flex alignItems="center">
            {route.icon && (
                <span className="nav-link-icon">
                    {createElement(route.icon, { size: 15 })}
                </span>
            )}

            <span className="nav-link-text ps-1">{route.name}</span>

            {route.badge && <Badge pill bg={route.badge.type} className="ms-2">{route.badge.text}</Badge>}
        </Flex>
    );
};

export default React.memo(NavbarVerticalMenuItem);
