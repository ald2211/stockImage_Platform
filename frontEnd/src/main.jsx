import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { ToastContainer } from "react-toastify";
import { ImageContextProvider } from './context/imageContext.jsx';
import { UserContextProvider } from './context/userContext.jsx';

createRoot(document.getElementById('root')).render(
    <UserContextProvider>
    <ImageContextProvider>
    <BrowserRouter>
    <ToastContainer />
    <App />
    </BrowserRouter>
    </ImageContextProvider>
    </UserContextProvider>
)
