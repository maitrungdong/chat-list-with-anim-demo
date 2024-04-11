import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.scss";
import App from './App';
import './animation/lib/animation-executor';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    /** Why we run it in strict mode -> we get wrong isJustAdded??? */
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
);
