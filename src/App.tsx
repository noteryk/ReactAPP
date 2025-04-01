import React from 'react';
import './styles/index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './router';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="React Tailwind App" />
      <main className="flex-1 overflow-y-auto">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};

export default App;