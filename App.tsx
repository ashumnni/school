
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Academics } from './pages/Academics';
import { Admissions } from './pages/Admissions';
import { Portal } from './pages/Portal';
import { Results } from './pages/Results';
import { Library } from './pages/Library';
import { ChatBot } from './components/ChatBot';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'academics':
        return <Academics />;
      case 'library':
        return <Library />;
      case 'admissions':
        return <Admissions />;
      case 'results':
        return <Results />;
      case 'portal':
        return <Portal />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
      <ChatBot />
    </Layout>
  );
};

export default App;
