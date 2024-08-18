import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from './styles/GlobalStyle.jsx';
import { NoteProvider } from './api/NoteContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoteProvider>
      <GlobalStyle />
      <App />
    </NoteProvider>
  </React.StrictMode>
);
