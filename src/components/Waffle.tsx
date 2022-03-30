import React, { ReactNode } from 'react';
import { CONFIG } from '../config';

type WaffleItemType = {
    label: string
    icon: ReactNode,
    href?: string
    disabled?: boolean
}

const WaffleItem = ({label, icon, href, disabled = false}: WaffleItemType) => {
    return (
        <div className="col-4">
            <div
                className={ `d-block ${ disabled ? 'bg-100 ' : 'hover-bg-200 cursor-pointer rounded-3' } px-2 py-3 text-center text-decoration-none` }
                onClick={ () => disabled ? false : window.open(href) }>
                <div className="avatar avatar-2xl">
                    { icon }
                </div>
                <p className="mb-0 fw-medium text-800 text-truncate fs--2">{ label }</p>
            </div>
        </div>
    );
};

const Waffle = () => {
    const serviceItems: WaffleItemType[] = [
        {
            icon: <div className="avatar-name rounded-circle bg-soft-light text-primary">
                <span className="fs-2">L</span>
            </div>,
            label: 'Legacy',
            href: CONFIG.sidooh.services.legacy.dashboard.url
        },
        {
            icon: <div className="avatar-name rounded-circle bg-soft-primary text-primary">
                <span className="fs-2">A</span>
            </div>,
            label: 'Accounts',
            disabled: true
        },
        {
            icon: <div className="avatar-name rounded-circle bg-soft-primary text-primary">
                <span className="fs-2">N</span>
            </div>,
            label: 'Notify',
            disabled: true
        },
        {
            icon: <div className="avatar-name rounded-circle bg-soft-primary text-primary">
                <span className="fs-2">S</span>
            </div>,
            label: 'Savings',
            disabled: true
        },
        {
            icon: <div className="avatar-name rounded-circle bg-soft-primary text-primary">
                <span className="fs-2">P</span>
            </div>,
            label: 'Products',
            disabled: true
        },
        {
            icon: <div className="avatar-name rounded-circle bg-soft-primary text-primary">
                <span className="fs-2">P</span>
            </div>,
            label: 'Payments',
            disabled: true
        },
        {
            icon: <div className="avatar-name rounded-circle bg-soft-primary text-primary">
                <span className="fs-2">E</span>
            </div>,
            label: 'Enterprise',
            disabled: true
        },
        {
            icon: <div className="avatar-name rounded-circle bg-soft-primary text-primary">
                <span className="fs-2">U</span>
            </div>,
            label: 'USSD',
            disabled: true
        }
    ];

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
                                {
                                    serviceItems.map((item, i) => (
                                        <WaffleItem key={ i } label={ item.label } icon={ item.icon } href={ item.href }
                                                    disabled={ item.disabled }/>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default Waffle;