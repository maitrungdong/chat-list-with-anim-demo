import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles";
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    /** Why we run it in strict mode -> we get wrong isJustAdded??? */
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
);
