import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <--- MUST BE IMPORTED HERE
import App from './App'; 

const container = document.getElementById('root');
const root = createRoot(container);

// 🚨 FINAL FIX: The application must be wrapped in BrowserRouter here 🚨
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);