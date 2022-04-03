import React from 'react';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ProfileDropdown from 'components/navbar/top/ProfileDropdown';
import NotificationDropdown from 'components/navbar/top/NotificationDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Waffle from 'components/common/Waffle';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setTheme } from '../../../features/theme/themeSlice';
import { RootState } from '../../../app/store';

const TopNavRightSideNavItem = () => {
    const dispatch = useAppDispatch();

    const {isDark} = useAppSelector((state: RootState) => state.theme);

    return (
        <Nav navbar className="navbar-nav-icons ms-auto flex-row align-items-center" as="ul">
            <Nav.Item as={'li'}>
                <Nav.Link className="px-2 theme-control-toggle"
                          onClick={() => dispatch(setTheme({key: 'isDark', value: !isDark}))}>
                    <OverlayTrigger key="left" placement={'left'} overlay={
                        <Tooltip id="ThemeColor">
                            {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                        </Tooltip>
                    }>
                        <div className="theme-control-toggle-label">
                            <FontAwesomeIcon icon={isDark ? 'sun' : 'moon'} className="fs-0"/>
                        </div>
                    </OverlayTrigger>
                </Nav.Link>
            </Nav.Item>

            <NotificationDropdown/>
            <Waffle/>
            <ProfileDropdown/>
        </Nav>
    );
};

export default TopNavRightSideNavItem;
