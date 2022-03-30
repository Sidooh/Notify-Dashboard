import React, {useEffect, useState} from 'react';
import {IMAGES} from '../../constants';
import {Link} from 'react-router-dom';
import CustomNavLink from '../CustomNavLink';
import {utils} from '../../utils/utils';

type NavMenuType = {
    menuTitle?: string,
    menuItems: {
        title: string,
        icon: JSX.Element,
        href?: string,
        listItems?: {
            title: string,
            href: string,
            active?: boolean,
        }[],
        showListItems?: boolean
    }[]
}

const NavMenu = ({menuTitle, menuItems}: NavMenuType) => {
    return (
        <li className="nav-item">
            {
                menuTitle && <div className="row navbar-vertical-label-wrapper mt-3 mb-2">
                    <div className="col-auto navbar-vertical-label">{menuTitle}</div>
                    <div className="col ps-0">
                        <hr className="mb-0 navbar-vertical-divider"/>
                    </div>
                </div>
            }

            {
                menuItems.map((item, i) => {
                    return item.listItems
                        ? <span key={i}>
                               <a className="nav-link dropdown-indicator" href={`#${item.title.trim()}`}
                                  role="button" data-bs-toggle="collapse" aria-expanded={Boolean(item.showListItems)}
                                  aria-controls="dashboard">

                                   <div className="d-flex align-items-center">
                                       <span className="nav-link-icon">{item.icon}</span>
                                       <span className="nav-link-text ps-1">{item.title}</span>
                                   </div>
                               </a>

                               <ul className={`nav collapse ${item.showListItems && 'show'}`} id={item.title.trim()}>
                                   {
                                       item.listItems.map((item, i) => {
                                           return (
                                               <li key={i} className="nav-item">
                                                   <CustomNavLink to={item.href} data-bs-toggle=""
                                                                  aria-expanded="false">
                                                       <div className="d-flex align-items-center"><span
                                                           className="nav-link-text ps-1">{item.title}</span></div>
                                                   </CustomNavLink>
                                               </li>
                                           );
                                       })
                                   }
                               </ul>
                           </span>
                        : <CustomNavLink key={i} to={String(item.href)} aria-expanded="false">
                            <div className="d-flex align-items-center">
                                <span className="nav-link-icon">{item.icon}</span>
                                <span className="nav-link-text ps-1">{item.title}</span>
                            </div>
                        </CustomNavLink>;
                })
            }
        </li>
    );
};

const NavbarVerticalTop = () => {
    const [navbarVerticalToggle, setNavbarVerticalToggle] = useState<HTMLButtonElement | null>(null!);

    const handleNavbarVerticalCollapsed = (navbarVerticalToggle: HTMLButtonElement) => {
        let Selector = {
            HTML: 'html',
            NAVBAR_VERTICAL_TOGGLE: '.navbar-vertical-toggle',
            NAVBAR_VERTICAL_COLLAPSE: '.navbar-vertical .navbar-collapse',
            ECHART_RESPONSIVE: '[data-echart-responsive]'
        };
        let Events = {
            CLICK: 'click',
            MOUSE_OVER: 'mouseover',
            MOUSE_LEAVE: 'mouseleave',
            NAVBAR_VERTICAL_TOGGLE: 'navbar.vertical.toggle'
        };
        let ClassNames = {
            NAVBAR_VERTICAL_COLLAPSED: 'navbar-vertical-collapsed',
            NAVBAR_VERTICAL_COLLAPSED_HOVER: 'navbar-vertical-collapsed-hover'
        };

        let html = document.querySelector(Selector.HTML) as HTMLElement;
        let navbarVerticalCollapse = document.querySelector(Selector.NAVBAR_VERTICAL_COLLAPSE);

        navbarVerticalToggle.addEventListener(Events.CLICK, function (e) {
            navbarVerticalToggle.blur();
            html.classList.toggle(ClassNames.NAVBAR_VERTICAL_COLLAPSED); // Set collapse state on localStorage

            let isNavbarVerticalCollapsed = utils.getItemFromStore('isNavbarVerticalCollapsed');
            utils.setItemToStore('isNavbarVerticalCollapsed', !isNavbarVerticalCollapsed);
            let event = new CustomEvent(Events.NAVBAR_VERTICAL_TOGGLE);
            e.currentTarget!.dispatchEvent(event);
        });

        if (navbarVerticalCollapse) {
            navbarVerticalCollapse.addEventListener(Events.MOUSE_OVER, function () {
                if (utils.hasClass(html, ClassNames.NAVBAR_VERTICAL_COLLAPSED)) {
                    html.classList.add(ClassNames.NAVBAR_VERTICAL_COLLAPSED_HOVER);
                }
            });
            navbarVerticalCollapse.addEventListener(Events.MOUSE_LEAVE, function () {
                if (utils.hasClass(html, ClassNames.NAVBAR_VERTICAL_COLLAPSED_HOVER)) {
                    html.classList.remove(ClassNames.NAVBAR_VERTICAL_COLLAPSED_HOVER);
                }
            });
        }
    };

    useEffect(() => {
        let navbarStyle = localStorage.getItem("navbarStyle");
        if (navbarStyle && navbarStyle !== 'transparent') {
            document.querySelector('.navbar-vertical')!.classList.add(`navbar-${navbarStyle}`);
        }

        if (navbarVerticalToggle) handleNavbarVerticalCollapsed(navbarVerticalToggle);
    }, [navbarVerticalToggle]);

    return (
        <>
            <nav className="navbar navbar-light navbar-vertical navbar-expand-xl" style={{display: 'none'}}>
                <div className="d-flex align-items-center">
                    <div className="toggle-icon-wrapper">
                        <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle"
                                ref={e => setNavbarVerticalToggle(e)}
                                data-bs-toggle="tooltip" data-bs-placement="left" title="Toggle Navigation">
                            <span className="navbar-toggle-icon"><span className="toggle-line"/></span>
                        </button>
                    </div>
                    <Link className="navbar-brand" to="/">
                        <div className="d-flex align-items-center py-3">
                            <img className="me-2" src={IMAGES.logos.sidooh} alt="" width="100"/>
                        </div>
                    </Link>
                </div>

                <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
                    <div className="navbar-vertical-content scrollbar">
                        <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav">
                            <NavMenu menuItems={[
                                {
                                    title: 'Dashboards',
                                    icon: <span className="fas fa-chart-pie"/>,
                                    listItems: [
                                        {title: 'Default', href: '/dashboard'},
                                        // {title: 'Analytics', href: '/dashboard/analytics'},
                                    ],
                                    showListItems: true
                                },
                            ]}/>

                            <NavMenu menuTitle={'Notifications'} menuItems={[
                                {
                                    title: 'Send',
                                    icon: <span className="fas fa-paper-plane"/>,
                                    href: '/notifications/create',
                                },
                                {
                                    title: 'SMS',
                                    icon: <span className="fas fa-comments"/>,
                                    listItems: [
                                        {title: 'All messages', href: '/notifications/sms'},
                                    ],
                                    showListItems: true
                                },
                                {
                                    title: 'Email',
                                    icon: <span className="fas fa-envelope-open"/>,
                                    listItems: [
                                        {title: 'Default', href: '/dashboard/default'},
                                        {title: 'Analytics', href: '/dashboard/analytics'},
                                        {title: 'CRM', href: '/dashboard/crm'},
                                    ]
                                },
                                {
                                    title: 'Slack',
                                    icon: <span className="fab fa-slack"/>,
                                    listItems: [
                                        {title: 'Default', href: '/dashboard/default'},
                                        {title: 'Analytics', href: '/dashboard/analytics'},
                                        {title: 'CRM', href: '/dashboard/crm'},
                                    ]
                                },
                            ]}/>

                            <NavMenu menuTitle={'App'} menuItems={[
                                {
                                    title: 'Settings',
                                    icon: <span className="fas fa-wrench"/>,
                                    href: '/settings',
                                },
                            ]}/>
                        </ul>
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand-xl" style={{display: 'none'}}>
            </nav>
        </>
    );
};

export default NavbarVerticalTop;