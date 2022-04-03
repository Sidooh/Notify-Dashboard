import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonVariant } from 'react-bootstrap/types';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type IconButtonType = {
    active?: boolean;
    variant?: ButtonVariant;
    size?: 'sm' | 'lg';
    icon: IconProp,
    children: ReactNode,
    iconAlign?: 'left' | 'right',
    iconClassName?: string,
    transform: string
    className?: string
    onClick?: any
};

const IconButton = ({
    icon,
    iconAlign = 'left',
    iconClassName,
    transform,
    children,
    ...rest
}: IconButtonType) => (
    <Button {...rest}>
        {iconAlign === 'right' && children}
        <FontAwesomeIcon icon={icon} className={classNames(iconClassName, {
            'me-1': children && iconAlign === 'left',
            'ms-1': children && iconAlign === 'right'
        })} transform={transform}/>
        {iconAlign === 'left' && children}
    </Button>
);

export default IconButton;
