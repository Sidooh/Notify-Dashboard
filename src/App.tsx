import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ErrorFallback } from './components/Error';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from './layouts/Layout';
import { useAppSelector } from './app/hooks';
import useToggleStyle from './hooks/useToggleStyle';
import { getColor } from 'utils/helpers';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle, fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far, faQuestionCircle)

const theme = createTheme({
    typography: {
        fontFamily: `${['"Varela Round"', 'cursive',].join(',')}!important`,
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    boxShadow: 'var(--falcon-box-shadow-inset)!important',
                    padding: 'padding: .3125rem 1rem;!important'
                }
            }
        }
    }
});

function App() {
    const {isDark} = useAppSelector(state => state.theme)

    const {isLoaded} = useToggleStyle(isDark);

    if (!isLoaded) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: isDark ? getColor('dark') : getColor('light')
                }}
            />
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
                <Layout/>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
