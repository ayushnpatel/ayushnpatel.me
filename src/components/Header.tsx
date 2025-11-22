import { SpinningGalaxy } from './SpinningGalaxy';
import { ThemeButton } from './ThemeButton';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export function Header({ isDark, onThemeToggle }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-8 md:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Spinning Galaxy */}
        <div className="flex-shrink-0">
          <SpinningGalaxy />
        </div>

        {/* Center: Empty (title will be in main content) */}
        <div className="flex-1" />

        {/* Right: Theme Button */}
        <div className="flex-shrink-0">
          <ThemeButton isDark={isDark} onToggle={onThemeToggle} />
        </div>
      </div>
    </header>
  );
}
