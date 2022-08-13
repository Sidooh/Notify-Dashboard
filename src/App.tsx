import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './layouts/Layout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle, fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

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
    return <ThemeProvider theme={theme}><Layout/></ThemeProvider>
}

export default App;
