import React, {useEffect} from 'react';
import {IMAGES} from '../../constants';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import CustomNavLink from '../CustomNavLink';

const NavMenu = ({menuTitle, menuItems}) => {
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
                                                   <CustomNavLink to={item.href} data-bs-toggle="" aria-expanded="false">
                                                       <div className="d-flex align-items-center"><span
                                                           className="nav-link-text ps-1">{item.title}</span></div>
                                                   </CustomNavLink>
                                               </li>
                                           );
                                       })
                                   }
                               </ul>
                           </span>
                           : <CustomNavLink key={i} to={item.href} role="button" aria-expanded="false">
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

NavMenu.propTypes = {
    menuTitle: PropTypes.string,
    menuItems: PropTypes.arrayOf(PropTypes.exact({
        title: PropTypes.string.isRequired,
        icon: PropTypes.object.isRequired,
        href: PropTypes.string,
        listItems: PropTypes.arrayOf(PropTypes.exact({
            title: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
            active: PropTypes.bool,
        })),
        showListItems: PropTypes.bool
    })),
};

const NavbarVerticalTop = () => {
    useEffect(() => {
        let navbarStyle = localStorage.getItem("navbarStyle");
        if (navbarStyle && navbarStyle !== 'transparent') {
            document.querySelector('.navbar-vertical').classList.add(`navbar-${navbarStyle}`);
        }
    });

    return (
        <>
            <nav className="navbar navbar-light navbar-vertical navbar-expand-xl" style={{display: 'none'}}>
                <div className="d-flex align-items-center">
                    <div className="toggle-icon-wrapper">
                        <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle"
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
                            <NavMenu showListItems menuItems={[
                                {
                                    title: 'Dashboards',
                                    icon: <span className="fas fa-chart-pie"/>,
                                    listItems: [
                                        {title: 'Default', href: '/dashboard/default'},
                                        {title: 'Analytics', href: '/dashboard/analytics'},
                                    ],
                                    showListItems: true
                                },
                            ]}/>

                            <NavMenu menuTitle={'Notifications'} menuItems={[
                                {
                                    title: 'SMS',
                                    icon: <span className="fas fa-comments"/>,
                                    listItems: [
                                        {title: 'All messages', href: '/sms'},
                                        {title: 'Analytics', href: '/dashboard/analytics'},
                                        {title: 'CRM', href: '/dashboard/crm'},
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
