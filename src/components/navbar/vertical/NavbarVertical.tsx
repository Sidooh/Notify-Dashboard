import { Fragment, useEffect } from 'react';
import classNames from 'classnames';
import { Col, Nav, Navbar, Row } from 'react-bootstrap';
import { navbarBreakPoint, topNavbarBreakpoint } from 'config';
import Flex from 'components/common/Flex';
import Logo from 'components/common/Logo';
import NavbarVerticalMenu from './NavbarVerticalMenu';
import ToggleButton from './ToggleButton';
import routes from 'routes';
import { capitalize } from 'helpers/utils';
import NavbarTopDropDownMenus from 'components/navbar/top/NavbarTopDropDownMenus';
import { IMAGES } from '../../../constants';
import { useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';

const NavbarVertical = () => {
    const {
        navbarPosition,
        navbarStyle,
        isNavbarVerticalCollapsed,
        showBurgerMenu
    } = useAppSelector((state: RootState) => state.theme);

    const HTMLClassList = document.getElementsByTagName('html')[0].classList;

    useEffect(() => {
        if (isNavbarVerticalCollapsed) {
            HTMLClassList.add('navbar-vertical-collapsed');
        } else {
            HTMLClassList.remove('navbar-vertical-collapsed');
        }
        return () => {
            HTMLClassList.remove('navbar-vertical-collapsed-hover');
        };
    }, [isNavbarVerticalCollapsed, HTMLClassList]);

    //Control mouseEnter event
    let time: number | undefined = undefined;
    const handleMouseEnter = () => {
        if (isNavbarVerticalCollapsed) {
            time = window.setTimeout(() => {
                HTMLClassList.add('navbar-vertical-collapsed-hover');
            }, 100);
        }
    };

    const handleMouseLeave = () => {
        clearTimeout(time);
        HTMLClassList.remove('navbar-vertical-collapsed-hover');
    };

    const NavbarLabel = ({label}: { label: string }) => (
        <Nav.Item as="li">
            <Row className="mt-3 mb-2 navbar-vertical-label-wrapper">
                <Col xs="auto" className="navbar-vertical-label navbar-vertical-label">
                    {label}
                </Col>
                <Col className="ps-0">
                    <hr className="mb-0 navbar-vertical-divider"/>
                </Col>
            </Row>
        </Nav.Item>
    );

    return (
        <Navbar expand={navbarBreakPoint}
            className={classNames('navbar-vertical', {
                [`navbar-${navbarStyle}`]: navbarStyle !== 'transparent'
            })} variant="light">
            <Flex alignItems="center">
                <ToggleButton/>
                <Logo at="navbar-vertical" width={70}/>
            </Flex>
            <Navbar.Collapse in={showBurgerMenu} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                style={{
                    backgroundImage:
                        navbarStyle === 'vibrant'
                            ? `linear-gradient(-45deg, rgba(0, 160, 255, 0.86), #0048a2),url(${IMAGES.generic.bg_navbar})`
                            : 'none'
                }}
            >
                <div className="navbar-vertical-content scrollbar">
                    <Nav className="flex-column" as="ul">
                        {routes.map(route => (
                            <Fragment key={route.label}>
                                {!route.labelDisable && (
                                    <NavbarLabel label={capitalize(route.label)}/>
                                )}
                                <NavbarVerticalMenu routes={route.children}/>
                            </Fragment>
                        ))}
                    </Nav>

                    <>
                        {navbarPosition === 'combo' && (
                            <div className={`d-${topNavbarBreakpoint}-none`}>
                                <div className="navbar-vertical-divider">
                                    <hr className="navbar-vertical-hr my-2"/>
                                </div>
                                <Nav navbar>
                                    <NavbarTopDropDownMenus/>
                                </Nav>
                            </div>
                        )}
                    </>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarVertical;
