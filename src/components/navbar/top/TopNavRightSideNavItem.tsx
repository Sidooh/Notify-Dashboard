import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ProfileDropdown from 'components/navbar/top/ProfileDropdown';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setTheme } from 'features/theme/themeSlice';
import { RootState } from 'app/store';
import { Waffle } from '@nabcellent/sui-react';
import { CONFIG } from 'config';
import { FaMoon, FaSun } from "react-icons/fa6";

const TopNavRightSideNavItem = () => {
    const dispatch = useAppDispatch();

    const { isDark } = useAppSelector((state: RootState) => state.theme);

    const ThemeIcon = isDark ? FaSun : FaMoon

    return (
        <Nav navbar className="navbar-nav-icons ms-auto flex-row align-items-center" as="ul">
            <Nav.Item as={'li'}>
                <Nav.Link className="px-2 theme-control-toggle"
                          onClick={() => dispatch(setTheme({ key: 'isDark', value: !isDark }))}>
                    <OverlayTrigger key="left" placement={'left'} overlay={
                        <Tooltip id="ThemeColor">
                            {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                        </Tooltip>
                    }>
                        <div className="theme-control-toggle-label">
                            <ThemeIcon className="fs-0"/>
                        </div>
                    </OverlayTrigger>
                </Nav.Link>
            </Nav.Item>

            <Waffle links={[
                {
                    avatarText: 'A',
                    title: 'Accounts',
                    link: CONFIG.sidooh.services.accounts.dashboard.url,
                    contentClass: 'bg-soft-primary text-primary',
                    enabled: true
                },
                {
                    avatarText: 'E',
                    title: 'Enterprise',
                    link: `/events/event-detail`,
                    contentClass: 'bg-soft-primary text-primary',
                    enabled: false
                },
                {
                    avatarText: 'p',
                    title: 'Payments',
                    link: CONFIG.sidooh.services.payments.dashboard.url,
                    contentClass: 'bg-soft-primary text-primary',
                    enabled: true
                },
                {
                    avatarText: 'P',
                    title: 'Products',
                    link: CONFIG.sidooh.services.products.dashboard.url,
                    contentClass: 'bg-soft-primary text-primary',
                    enabled: true
                },
                {
                    avatarText: 'S',
                    title: 'Savings',
                    link: CONFIG.sidooh.services.savings.dashboard.url,
                    contentClass: 'bg-soft-primary text-primary',
                    enabled: true
                },
                {
                    avatarText: 'U',
                    title: 'USSD',
                    link: CONFIG.sidooh.services.ussd.dashboard.url,
                    contentClass: 'bg-soft-primary text-primary',
                    enabled: true
                },
                /*{
                    avatar: account,
                    title: 'Account',
                    link: `/user/profile`
                },*/
            ]}/>
            <ProfileDropdown/>
        </Nav>
    );
};

export default TopNavRightSideNavItem;
