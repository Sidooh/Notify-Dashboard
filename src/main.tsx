import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import '@nabcellent/sui-react/dist/style.min.css';
import './assets/css/style.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}><App/></Provider>
        </BrowserRouter>
    </React.StrictMode>
);