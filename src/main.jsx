import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider.jsx';
import { UserProvider } from './providers/UserProvider.jsx';
import { BeneficiarioProvider } from './providers/BeneficiarioProvider.jsx';
import 'animate.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <BeneficiarioProvider> 
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </BeneficiarioProvider> 
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
)
