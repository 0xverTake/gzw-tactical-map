import React from 'react';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send(channel: string, ...args: any[]): void;
      };
    };
  }
}

const TacMap: React.FC = () => {
  const openMapInNewWindow = () => {
    // Si on est dans Electron
    if (window.electron) {
      window.electron.ipcRenderer.send('open-map');
    } else {
      // Fallback pour le navigateur web
      const width = Math.min(1200, window.innerWidth * 0.9);
      const height = Math.min(800, window.innerHeight * 0.9);
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      window.open(
        'https://gzwtacmap.online/maps/lamang',
        'GZW Tactical Map',
        `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no`
      );
    }
  };

  return (
    <div className="tacmap-container">
      <div className="map-redirect">
        <h2>Carte Interactive</h2>
        <p>Accédez à la carte tactique de Gray Zone Warfare</p>
        <button 
          onClick={openMapInNewWindow}
          className="map-button"
        >
          Ouvrir la carte (Always on Top)
        </button>
      </div>
    </div>
  );
};

export default TacMap;