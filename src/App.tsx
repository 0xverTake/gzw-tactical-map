import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Forum from './components/Forum';
import ChatBot from './components/ChatBot';
import TacMap from './components/TacMap';
import { BackgroundVideo } from './components/BackgroundVideo';

function App() {
  const [activeSection, setActiveSection] = useState('map');
  const [language, setLanguage] = useState('fr');

  return (
    <>
      <motion.div
        initial="initial"
        animate="visible"
        exit="exit"
      >
        <div className="app">
          {/* Barre de titre personnalisée */}
          <div className="title-bar">
            <div className="title">GZW Tactical Map</div>
            <div className="window-controls">
              <button className="window-control minimize" onClick={() => window.electron.ipcRenderer.send('minimize-window')}>
                <svg width="12" height="2" viewBox="0 0 12 2">
                  <rect width="12" height="2" fill="currentColor" />
                </svg>
              </button>
              <button className="window-control maximize" onClick={() => window.electron.ipcRenderer.send('maximize-window')}>
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <rect width="10" height="10" x="1" y="1" stroke="currentColor" fill="none" strokeWidth="1" />
                </svg>
              </button>
              <button className="window-control close" onClick={() => window.electron.ipcRenderer.send('close-window')}>
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M1,1 L11,11 M1,11 L11,1" stroke="currentColor" strokeWidth="1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Vidéo d'arrière-plan */}
          <BackgroundVideo
            localVideoUrl="./videos/tactical-background.mp4"
            youtubeId="vHd8fSP-gik"
            fallbackImageUrl="./images/background-poster.svg"
          />

          {/* En-tête */}
          <header className="app-header">
            <div className="header-content">
              <div className="logo-container">
                <img src="./images/logo.svg" alt="GZW Logo" />
                <h1>Gray Zone Warfare</h1>
              </div>
            </div>
          </header>

          {/* Navigation */}
          <nav className="main-nav">
            <div className="nav-content">
              <div className="nav-links">
                <button
                  className={`nav-link ${activeSection === 'map' ? 'active' : ''}`}
                  onClick={() => setActiveSection('map')}
                >
                  Carte Interactive
                </button>
                <button
                  className={`nav-link ${activeSection === 'chat' ? 'active' : ''}`}
                  onClick={() => setActiveSection('chat')}
                >
                  Assistant IA
                  <span className="assistant-name">Claude</span>
                </button>
                <button
                  className={`nav-link ${activeSection === 'forum' ? 'active' : ''}`}
                  onClick={() => setActiveSection('forum')}
                >
                  Forum
                </button>
                <button
                  className={`nav-link ${activeSection === 'french' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection('french');
                    setLanguage(language === 'fr' ? 'en' : 'fr');
                  }}
                >
                  {language === 'fr' ? '🇫🇷' : '🇬🇧'}
                </button>
              </div>
            </div>
          </nav>

          {/* Contenu principal */}
          <main className="main-content">
            <AnimatePresence mode="wait">
              {activeSection === 'map' && (
                <motion.div
                  key="map"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="section-container"
                >
                  <TacMap />
                </motion.div>
              )}

              {activeSection === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="section-container"
                >
                  <ChatBot />
                </motion.div>
              )}

              {activeSection === 'forum' && (
                <motion.div
                  key="forum"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="section-container"
                >
                  <Forum />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </motion.div>
    </>
  );
}

export default App;
