import { refreshTheme } from 'features/theme/themeSlice';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';

const useToggleStylesheet = (isDark: boolean) => {
    const dispatch = useAppDispatch()

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);

        if(document.getElementById('user-style-default')) setIsLoaded(true)
    }, []);

    useEffect(() => {
        document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

        dispatch(refreshTheme());
    }, [dispatch, isDark]);

    return {isLoaded};
};

export default useToggleStylesheet;
