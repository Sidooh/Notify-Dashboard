import  { memo } from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { getFlatRoutes } from 'helpers/utils';
import NavbarNavLink from './NavbarNavLink';
import { RouteChildType } from 'routes';

type NavbarDropdownAppType = {
    items: RouteChildType[]
}

const NavbarDropdownApp = ({items}: NavbarDropdownAppType) => {
    const routes = getFlatRoutes(items);

    return (
        <Row>
            <Col md={5}>
                <Nav className="flex-column">
                    {routes.unTitled.map((route:any) => (
                        <NavbarNavLink key={route.name} route={route}/>
                    ))}
                    <NavbarNavLink label="Email" title="Email"/>
                    {routes.email.map((route:any) => (
                        <NavbarNavLink key={route.name} route={route}/>
                    ))}
                    <NavbarNavLink label="Events" title="Events"/>
                    {routes.events.map((route:any) => (
                        <NavbarNavLink key={route.name} route={route}/>
                    ))}
                    <NavbarNavLink label="Social" title="Social"/>
                    {routes.social.map((route:any) => (
                        <NavbarNavLink key={route.name} route={route}/>
                    ))}
                </Nav>
            </Col>
            <Col md={5}>
                <NavbarNavLink label="E Commerce" title="E Commerce"/>
                {routes.eCommerce.map((route:any) => (
                    <NavbarNavLink key={route.name} route={route}/>
                ))}
            </Col>
        </Row>
    );
};

export default memo(NavbarDropdownApp);
