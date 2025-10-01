// src/App.js
import React from 'react';
import { AuthProvider } from './components/auth/AuthProvider';
import AppRouter from './components/routing/AppRouter';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;