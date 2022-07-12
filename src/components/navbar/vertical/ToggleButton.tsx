import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setTheme } from '../../../features/theme/themeSlice';

const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
        Toggle Navigation
    </Tooltip>
);

const ToggleButton = () => {
    const dispatch = useAppDispatch();
    const {isNavbarVerticalCollapsed, isFluid} = useAppSelector((state) => state.theme);

    const handleClick = () => {
        document
            .getElementsByTagName('html')[0]
            .classList.toggle('navbar-vertical-collapsed');
        dispatch(setTheme({key: 'isNavbarVerticalCollapsed', value: !isNavbarVerticalCollapsed}));
    };

    return (
        <OverlayTrigger placement={isFluid ? 'right' : 'left'}
                        overlay={renderTooltip}>
            <div className="toggle-icon-wrapper">
                <Button
                    variant="link"
                    className="navbar-toggler-humburger-icon navbar-vertical-toggle"
                    id="toggleNavigationTooltip"
                    onClick={handleClick}
                >
                <span className="navbar-toggle-icon"><span className="toggle-line"/></span>
                </Button>
            </div>
        </OverlayTrigger>
    );
};

export default ToggleButton;
