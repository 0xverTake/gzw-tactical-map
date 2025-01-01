import { motion } from 'framer-motion';
import { useState } from 'react';

const FrenchMod = () => {
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDownload = () => {
    // TODO: Implémenter le vrai lien de téléchargement
    const modFiles = 'Game_fr.ini';
    const blob = new Blob([modFiles], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GZW_FR_Mod.ini';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    setDownloadStarted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="metal-panel p-6 rounded-lg space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold rust-text">Mod Français pour GZW</h2>
        <p className="text-gray-400 mt-2">Traduisez Gray Zone Warfare en français</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="metal-panel p-4 rounded-lg">
          <h3 className="text-lg font-bold rust-text mb-4">Instructions d'installation</h3>
          <ol className="space-y-2 text-gray-300 list-decimal list-inside">
            <li>Téléchargez le fichier de traduction</li>
            <li>Accédez au dossier d'installation de GZW :
              <code className="block bg-black/30 p-2 mt-1 rounded text-sm">
                C:\Program Files (x86)\Steam\steamapps\common\Gray Zone Warfare\GZW\Content\Localization\Game\fr
              </code>
            </li>
            <li>Créez le dossier "fr" s'il n'existe pas</li>
            <li>Copiez le fichier Game_fr.ini dans ce dossier</li>
            <li>Redémarrez le jeu</li>
            <li>Dans les paramètres, sélectionnez "Français"</li>
          </ol>
        </div>

        <div className="space-y-4">
          <div className="metal-panel p-4 rounded-lg">
            <h3 className="text-lg font-bold rust-text mb-4">Fonctionnalités</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Interface traduite en français</li>
              <li>• Noms d'objets et descriptions</li>
              <li>• Messages système</li>
              <li>• Menus et options</li>
            </ul>
          </div>

          <div className="metal-panel p-4 rounded-lg">
            <h3 className="text-lg font-bold rust-text mb-4">Téléchargement</h3>
            <button
              onClick={handleDownload}
              className="w-full py-3 metal-panel hover:bg-white/5 rounded-lg transition-all duration-300 rust-text"
            >
              {downloadStarted ? 'Téléchargement commencé...' : 'Télécharger le mod FR'}
            </button>
            <p className="text-sm text-gray-400 mt-2">
              Version actuelle : 1.0.0
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="metal-panel p-4 rounded-lg">
          <h3 className="text-lg font-bold rust-text mb-2">Notes de mise à jour</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Première version du mod français</li>
            <li>• Traduction de l'interface de base</li>
            <li>• Support des termes spécifiques à GZW</li>
          </ul>
        </div>
        <div className="metal-panel p-4 rounded-lg">
          <h3 className="text-lg font-bold rust-text mb-2">Contribuer</h3>
          <p className="text-gray-300 text-sm">
            Vous avez trouvé une erreur ou souhaitez améliorer la traduction ?
            Contactez-nous sur Discord ou contribuez directement sur GitHub.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FrenchMod;
