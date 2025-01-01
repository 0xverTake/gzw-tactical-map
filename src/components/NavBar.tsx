import { motion } from 'framer-motion';

interface NavItemProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ title, isActive, onClick }: NavItemProps) => (
  <motion.button
    className={`px-4 py-3 rounded-lg transition-all duration-300 metal-panel w-full sm:w-auto text-center ${
      isActive ? 'rust-border rust-text metal-shine' : 'hover:bg-white/5'
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {title}
  </motion.button>
);

export type ActiveSection = 'ai-assistant' | 'tac-map' | 'french-mod';

interface NavBarProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

const NavBar = ({ activeSection, onSectionChange }: NavBarProps) => {
  return (
    <nav className="w-full metal-panel p-4 rounded-lg mb-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-center gap-4 nav-container">
        <NavItem
          title="AI Assistant"
          isActive={activeSection === 'ai-assistant'}
          onClick={() => onSectionChange('ai-assistant')}
        />
        <NavItem
          title="Interactive Tac Map"
          isActive={activeSection === 'tac-map'}
          onClick={() => onSectionChange('tac-map')}
        />
        <NavItem
          title="Mod Français"
          isActive={activeSection === 'french-mod'}
          onClick={() => onSectionChange('french-mod')}
        />
      </div>
    </nav>
  );
};

export default NavBar;
