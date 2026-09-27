import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import SplashLoader from './../src/components/SplashLoader.jsx'

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
} else if (import.meta.env.DEV) {
  console.info('Google Analytics is not configured. Set VITE_GA_MEASUREMENT_ID in .env to enable analytics.');
}

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5-second delay for the loader

    return () => clearTimeout(timer);
  }, []);

  return (
    // <StrictMode>
      <BrowserRouter>
        {isLoading ? <SplashLoader /> : <App />}
      </BrowserRouter>
    // </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Root />);