import React from 'react';
import {IMAGES} from '../constants';
import {CONFIG} from '../config';

const Waffle = () => {
    return (
        <li className="nav-item dropdown">
            <span className="nav-link fa-icon-wait nine-dots p-1" id="navbarDropdownMenu" role="button"
                  data-hide-on-body-scroll="data-hide-on-body-scroll" data-bs-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="43" viewBox="0 0 16 16"
                     fill="none">
                    <circle cx="2" cy="2" r="2" fill="#6C6E71"/>
                    <circle cx="2" cy="8" r="2" fill="#6C6E71"/>
                    <circle cx="2" cy="14" r="2" fill="#6C6E71"/>
                    <circle cx="8" cy="8" r="2" fill="#6C6E71"/>
                    <circle cx="8" cy="14" r="2" fill="#6C6E71"/>
                    <circle cx="14" cy="8" r="2" fill="#6C6E71"/>
                    <circle cx="14" cy="14" r="2" fill="#6C6E71"/>
                    <circle cx="8" cy="2" r="2" fill="#6C6E71"/>
                    <circle cx="14" cy="2" r="2" fill="#6C6E71"/>
                </svg>
            </span>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-card dropdown-caret-bg"
                 aria-labelledby="navbarDropdownMenu">
                <div className="card shadow-none">
                    <div className="scrollbar-overlay nine-dots-dropdown">
                        <div className="card-body px-3">
                            <div className="row text-center gx-0 gy-0">
                                <div className="col-4">
                                    <a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none"
                                       href={CONFIG.sidooh.services.legacy.dashboard.url} target="_blank"
                                       rel="noreferrer">
                                        <div className="avatar avatar-2xl">
                                            <div className="avatar-name rounded-circle bg-soft-light text-primary">
                                                <span className="fs-2">L</span>
                                            </div>
                                        </div>
                                        <p className="mb-0 fw-medium text-800 text-truncate fs--2">Legacy</p>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none"
                                       href="app/events/event-detail.html" target="_blank">
                                        <div className="avatar avatar-2xl">
                                            <div className="avatar-name rounded-circle bg-soft-primary text-primary">
                                                <span className="fs-2">A</span>
                                            </div>
                                        </div>
                                        <p className="mb-0 fw-medium text-800 text-truncate fs--2">Accounts</p>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none"
                                       href="app/events/event-detail.html" target="_blank">
                                        <div className="avatar avatar-2xl">
                                            <div className="avatar-name rounded-circle bg-soft-dark text-primary">
                                                <span className="fs-2">S</span>
                                            </div>
                                        </div>
                                        <p className="mb-0 fw-medium text-800 text-truncate fs--2">Savings</p>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none"
                                       href="app/events/event-detail.html" target="_blank">
                                        <div className="avatar avatar-2xl">
                                            <div className="avatar-name rounded-circle bg-soft-info text-primary">
                                                <span className="fs-2">P</span>
                                            </div>
                                        </div>
                                        <p className="mb-0 fw-medium text-800 text-truncate fs--2">Products</p>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none"
                                       href="app/events/event-detail.html" target="_blank">
                                        <div className="avatar avatar-2xl">
                                            <div className="avatar-name rounded-circle bg-soft-danger text-primary">
                                                <span className="fs-2">P</span>
                                            </div>
                                        </div>
                                        <p className="mb-0 fw-medium text-800 text-truncate fs--2">Payments</p>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none"
                                       href="app/events/event-detail.html" target="_blank">
                                        <div className="avatar avatar-2xl">
                                            <div className="avatar-name rounded-circle bg-soft-secondary text-primary">
                                                <span className="fs-2">E</span>
                                            </div>
                                        </div>
                                        <p className="mb-0 fw-medium text-800 text-truncate fs--2">Enterprise</p>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none"
                                       href="app/events/event-detail.html" target="_blank">
                                        <div className="avatar avatar-2xl">
                                            <div className="avatar-name rounded-circle bg-soft-success text-primary">
                                                <span className="fs-2">U</span>
                                            </div>
                                        </div>
                                        <p className="mb-0 fw-medium text-800 text-truncate fs--2">USSD</p>
                                    </a>
                                </div>

                                <div className="col-12">
                                    <hr className="my-3 mx-n3 bg-200"/>
                                </div>

                                <div className="col-4">
                                    <a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none"
                                       href="pages/user/profile.html" target="_blank">
                                        <div className="avatar avatar-2xl">
                                            <img className="rounded-circle" src={IMAGES.team['2']} alt=""/>
                                        </div>
                                        <p className="mb-0 fw-medium text-800 text-truncate fs--2">Account</p>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none"
                                       href="#!" target="_blank">
                                        <img className="rounded" src={IMAGES.navIcons.trello} alt="" width="40"
                                             height="40"/>
                                        <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Kanban</p>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none"
                                       href="#!" target="_blank">
                                        <img className="rounded" src={IMAGES.navIcons.slack} alt="" width="40"
                                             height="40"/>
                                        <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Slack</p>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none"
                                       href="#!" target="_blank">
                                        <img className="rounded" src={IMAGES.navIcons.google} alt="" width="40"
                                             height="40"/>
                                        <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Google</p>
                                    </a>
                                </div>
                                <div className="col-4">
                                    <a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none"
                                       href="https://github.com/Sidooh" target="_blank" rel="noopener noreferrer">
                                        <img className="rounded" src={IMAGES.navIcons.github_light} alt="" width="40"
                                             height="40"/>
                                        <p className="mb-0 fw-medium text-800 text-truncate fs--2 pt-1">Github</p>
                                    </a>
                                </div>
                                <div className="col-12">
                                    <a className="btn btn-outline-primary btn-sm mt-4" href="#!">Show more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default Waffle;