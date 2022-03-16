import React from 'react';
import {Box} from '@mui/material';
import CircularProgress, {circularProgressClasses} from '@mui/material/CircularProgress';

const PageLoader = () => {
    return (
        <Box sx={{flexGrow: 1}} className={'d-flex justify-content-center align-items-center h-100'}>
            <Box sx={{position: 'relative'}}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: (theme) =>
                            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    }}
                    size={70}
                    thickness={3}
                    value={100}
                />
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                    size={70}
                    thickness={3}
                />
            </Box>
        </Box>
    );
};

export default PageLoader;
