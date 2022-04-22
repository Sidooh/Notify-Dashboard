import { memo } from 'react';
import { CloseButton } from 'react-bootstrap';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';

type FalconCloseButtonType = {
    size: 'sm' | 'lg',
    noOutline?: boolean,
    variant?: 'white', // use 'white' for white variant
    onClick: () => void,
    className?: string
};

const FalconCloseButton = ({
                               size,
                               onClick,
                               noOutline,
                               variant,
                               className,
                               ...rest
                           }: FalconCloseButtonType) => {
    const {isDark} = useAppSelector(state => state.theme)

    return (
        <CloseButton
            variant={variant ? variant : isDark ? 'white' : undefined}
            className={classNames(className, {
                [`btn-${size}`]: size,
                'outline-none': noOutline
            })}
            onClick={onClick}
            {...rest}
        />
    );
};

export default memo(FalconCloseButton);
