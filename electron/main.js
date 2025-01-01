import { app, BrowserWindow, ipcMain, protocol, shell, nativeTheme, Tray, Menu, globalShortcut } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = !app.isPackaged;

let mainWindow;
let mapWindow;
let tray;

function createWindow() {
  // Force le thème sombre
  nativeTheme.themeSource = 'dark';

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    icon: join(__dirname, '../public/icon.ico'),
    autoHideMenuBar: true,
    show: false,
    // Style de la fenêtre
    backgroundColor: '#1a1a1a',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#1a1a1a',
      symbolColor: '#ffffff',
      height: 30
    },
    frame: false,
    transparent: true,
    roundedCorners: true,
    thickFrame: false
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    const indexPath = join(__dirname, '..', 'dist', 'index.html');
    mainWindow.loadFile(indexPath);
  }

  // Afficher la fenêtre quand elle est prête
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.maximize();
  });

  // Empêcher la fermeture de l'application, la cacher à la place
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });
}

function createTray() {
  tray = new Tray(join(__dirname, '../public/icon.ico'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Afficher/Masquer',
      click: () => {
        if (mainWindow.isVisible()) {
          mainWindow.hide();
        } else {
          mainWindow.show();
          mainWindow.maximize();
        }
      }
    },
    {
      label: 'Quitter',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('GZW Tactical Map');
  tray.setContextMenu(contextMenu);

  // Double-clic sur l'icône pour afficher/masquer
  tray.on('double-click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.maximize();
    }
  });
}

function registerProtocols() {
  protocol.registerFileProtocol('asset', (request, callback) => {
    const url = request.url.replace('asset://', '');
    try {
      const path = resolveAssetPath(url);
      callback({ path });
    } catch (error) {
      console.error('Failed to resolve asset:', error);
      callback({ error: -2 /* net::FAILED */ });
    }
  });
}

function resolveAssetPath(url) {
  return join(__dirname, '..', 'dist', url);
}

function createMapWindow() {
  shell.openExternal('https://gzwtacmap.online/maps/lamang');
}

// Gestion des contrôles de fenêtre personnalisés
ipcMain.on('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.on('maximize-window', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on('close-window', () => {
  mainWindow.hide();
});

// Initialisation de l'application
app.whenReady().then(() => {
  registerProtocols();
  createWindow();
  createTray();

  // Raccourci clavier global pour afficher/masquer (Alt+Shift+G)
  globalShortcut.register('Alt+Shift+G', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.maximize();
    }
  });
});

ipcMain.on('open-map', () => {
  createMapWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Nettoyage avant de quitter
app.on('before-quit', () => {
  globalShortcut.unregisterAll();
});
