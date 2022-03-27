import React from 'react';
import {IMAGES} from '../../constants';
import Waffle from '../Waffle';
import {Link} from 'react-router-dom';
import {useAuth} from '../AuthProvider';

const NavbarSearch = () => {
    const { onSignOut } = useAuth();

    return (
        <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand" style={{display: 'none'}}>
            <button className="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse"
                    aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation">
                <span className="navbar-toggle-icon"><span className="toggle-line"/></span>
            </button>
            <a className="navbar-brand me-1 me-sm-3" href="index.html">
                <div className="d-flex align-items-center">
                    <img className="me-2" src={IMAGES.logos.sidooh} alt="" width="40" style={{objectFit: 'cover'}}/>
                    <span className="font-sans-serif">sidooh</span></div>
            </a>
            <ul className="navbar-nav align-items-center d-none d-lg-block">
                <li className="nav-item">
                    <div className="search-box" data-list='{"valueNames":["title"]}'>
                        <form className="position-relative" data-bs-toggle="search" data-bs-display="static">
                            <input className="form-control search-input fuzzy-search" type="search"
                                   placeholder="Search..." aria-label="Search"/>
                            <span className="fas fa-search search-box-icon"/>
                        </form>
                        <div
                            className="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none"
                            data-bs-dismiss="search">
                            <div className="btn-close-falcon" aria-label="Close"/>
                        </div>
                        <div className="dropdown-menu border font-base start-0 mt-2 py-0 overflow-hidden w-100">
                            <div className="scrollbar list py-3" style={{maxHeight: '24rem'}}>
                                <h6 className="dropdown-header fw-medium text-uppercase px-card fs--2 pt-0 pb-2">
                                    Recently Browsed
                                </h6>
                                <a className="dropdown-item fs--1 px-card py-1 hover-primary"
                                   href="app/events/event-detail.html">
                                    <div className="d-flex align-items-center">
                                        <span className="fas fa-circle me-2 text-300 fs--2"/>
                                        <div className="fw-normal title">Pages
                                            <span className="fas fa-chevron-right mx-1 text-500 fs--2"
                                                  data-fa-transform="shrink-2"/>Events
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item fs--1 px-card py-1 hover-primary"
                                   href="app/e-commerce/customers.html">
                                    <div className="d-flex align-items-center">
                                        <span className="fas fa-circle me-2 text-300 fs--2"/>
                                        <div className="fw-normal title">E-commerce
                                            <span className="fas fa-chevron-right mx-1 text-500 fs--2"
                                                  data-fa-transform="shrink-2"/> Customers
                                        </div>
                                    </div>
                                </a>

                                <hr className="bg-200 dark__bg-900"/>
                                <h6 className="dropdown-header fw-medium text-uppercase px-card fs--2 pt-0 pb-2">
                                    Suggested Filter
                                </h6>
                                <a className="dropdown-item px-card py-1 fs-0"
                                   href="app/e-commerce/customers.html">
                                    <div className="d-flex align-items-center">
                                        <span
                                            className="badge fw-medium text-decoration-none me-2 badge-soft-warning">customers:</span>
                                        <div className="flex-1 fs--1 title">All customers list</div>
                                    </div>
                                </a>
                                <a className="dropdown-item px-card py-1 fs-0" href="app/events/event-detail.html">
                                    <div className="d-flex align-items-center">
                                        <span
                                            className="badge fw-medium text-decoration-none me-2 badge-soft-success">events:</span>
                                        <div className="flex-1 fs--1 title">Latest events in current month</div>
                                    </div>
                                </a>
                                <a className="dropdown-item px-card py-1 fs-0"
                                   href="app/e-commerce/product/product-grid.html">
                                    <div className="d-flex align-items-center">
                                        <span
                                            className="badge fw-medium text-decoration-none me-2 badge-soft-info">products:</span>
                                        <div className="flex-1 fs--1 title">Most popular products</div>
                                    </div>
                                </a>
                            </div>
                            <div className="text-center mt-n3">
                                <p className="fallback fw-bold fs-1 d-none">No Result Found.</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <ul className="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
                <li className="nav-item">
                    <div className="theme-control-toggle fa-icon-wait px-2">
                        <input className="form-check-input ms-0 theme-control-toggle-input" id="themeControlToggle"
                               type="checkbox" data-theme-control="theme" value="dark"/>
                        <label className="mb-0 theme-control-toggle-label theme-control-toggle-light"
                               htmlFor="themeControlToggle"
                               data-bs-toggle="tooltip" data-bs-placement="left" title="Switch to light theme">
                            <span className="fas fa-sun fs-0"/>
                        </label>
                        <label className="mb-0 theme-control-toggle-label theme-control-toggle-dark"
                               htmlFor="themeControlToggle"
                               data-bs-toggle="tooltip" data-bs-placement="left" title="Switch to dark theme">
                            <span className="fas fa-moon fs-0"/>
                        </label>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <span className="nav-link notification-indicator notification-indicator-primary px-0 fa-icon-wait"
                       id="navbarDropdownNotification" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false" data-hide-on-body-scroll="data-hide-on-body-scroll">
                        <span className="fas fa-bell" data-fa-transform="shrink-6" style={{fontSize: '33px'}}/>
                    </span>
                    <div
                        className="dropdown-menu dropdown-menu-end dropdown-menu-card dropdown-menu-notification dropdown-caret-bg"
                        aria-labelledby="navbarDropdownNotification">
                        <div className="card card-notification shadow-none">
                            <div className="card-header">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-auto">
                                        <h6 className="card-header-title mb-0">Notifications</h6>
                                    </div>
                                    <div className="col-auto ps-0 ps-sm-3">
                                        <span className="card-link fw-normal">Mark all as read</span>
                                    </div>
                                </div>
                            </div>
                            <div className="scrollbar-overlay" style={{maxHeight: '19rem'}}>
                                <div className="list-group list-group-flush fw-normal fs--1">
                                    <div className="list-group-title border-bottom">NEW</div>
                                    <div className="list-group-item">
                                        <a className="notification notification-flush notification-unread" href="#!">
                                            <div className="notification-avatar">
                                                <div className="avatar avatar-2xl me-3">
                                                    <img className="rounded-circle" src={IMAGES.team['1-thumb']}
                                                         alt=""/>
                                                </div>
                                            </div>
                                            <div className="notification-body">
                                                <p className="mb-1">
                                                    <strong>Emma Watson</strong>
                                                    replied to your comment : "Hello world 😍"
                                                </p>
                                                <span className="notification-time">
                                                    <span className="me-2" role="img" aria-label="Emoji">💬</span>
                                                    Just now
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="list-group-item">
                                        <a className="notification notification-flush notification-unread" href="#!">
                                            <div className="notification-avatar">
                                                <div className="avatar avatar-2xl me-3">
                                                    <div className="avatar-name rounded-circle"><span>AB</span></div>
                                                </div>
                                            </div>
                                            <div className="notification-body">
                                                <p className="mb-1">
                                                    <strong>Albert Brooks</strong> reacted to
                                                    <strong>Mia Khalifa's</strong> status
                                                </p>
                                                <span className="notification-time">
                                                    <span className="me-2 fab fa-gratipay text-danger"/>9hr
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="list-group-title border-bottom">EARLIER</div>
                                    <div className="list-group-item">
                                        <a className="notification notification-flush" href="#!">
                                            <div className="notification-avatar">
                                                <div className="avatar avatar-2xl me-3">
                                                    <img className="rounded-circle" src={IMAGES.icons.weather_sm}
                                                         alt=""/>
                                                </div>
                                            </div>
                                            <div className="notification-body">
                                                <p className="mb-1">
                                                    The forecast today shows a low of 20&#8451; in
                                                    California. See today's weather.</p>
                                                <span className="notification-time">
                                                    <span className="me-2" role="img"
                                                          aria-label="Emoji">🌤️</span>1d</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="list-group-item">
                                        <a className="border-bottom-0 notification-unread  notification notification-flush"
                                           href="#!">
                                            <div className="notification-avatar">
                                                <div className="avatar avatar-xl me-3">
                                                    <img className="rounded-circle" src={IMAGES.logos.oxford} alt=""/>
                                                </div>
                                            </div>
                                            <div className="notification-body">
                                                <p className="mb-1">
                                                    <strong>University of Oxford</strong>
                                                    created an event : "Causal Inference Hilary 2019"
                                                </p>
                                                <span className="notification-time">
                                                    <span className="me-2" role="img" aria-label="Emoji">✌️</span>1w
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="list-group-item">
                                        <a className="border-bottom-0 notification notification-flush" href="#!">
                                            <div className="notification-avatar">
                                                <div className="avatar avatar-xl me-3">
                                                    <img className="rounded-circle"
                                                         src={IMAGES.team['10']} alt=""/>
                                                </div>
                                            </div>
                                            <div className="notification-body">
                                                <p className="mb-1">
                                                    <strong>James Cameron</strong> invited to join the
                                                    group: United Nations International Children's Fund
                                                </p>
                                                <span className="notification-time">
                                                    <span className="me-2" role="img" aria-label="Emoji">🙋‍</span>2d
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-center border-top">
                                <a className="card-link d-block" href="app/social/notifications.html">View all</a>
                            </div>
                        </div>
                    </div>
                </li>

                <Waffle/>

                <li className="nav-item dropdown">
                    <span className="nav-link pe-0 ps-2" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        <div className="avatar avatar-xl">
                            <img className="rounded-circle" src={IMAGES.team['2-thumb']} alt=""/>
                        </div>
                    </span>
                    <div className="dropdown-menu dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
                        <div className="bg-white dark__bg-1000 rounded-2 py-2">
                            <a className="dropdown-item fw-bold text-warning" href="#!">
                                <span className="fas fa-crown me-1"/><span>SIDOOH</span></a>
                            <div className="dropdown-divider"/>
                            <a className="dropdown-item" href="#!">Set status</a>
                            <a className="dropdown-item" href="pages/user/profile.html">Profile &amp; account</a>
                            <a className="dropdown-item" href="#!">Feedback</a>
                            <div className="dropdown-divider"/>
                            <Link className="dropdown-item" to="/settings">Settings</Link>
                            <button className="dropdown-item" onClick={onSignOut}>Logout</button>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarSearch;
