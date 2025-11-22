import { Header } from './components/Header';
import { Job } from './components/Job';
import { Code, Briefcase, Rocket, Zap } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import { Vignette } from './components/Vignette';
import { AnimatedYear } from './components/AnimatedYear';

export function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 noise">
      <Vignette intensity={0.2} />
      <Header isDark={isDark} onThemeToggle={toggleTheme} />

      <main className="pt-32 pb-16 px-6">
        {/* Title Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-text mb-4 text-balance">
            ayush patel
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto text-pretty">
            <AnimatedYear /> 🚀<br /> reach out at <a href="mailto:ayushnpatel@gmail.com" className="underline font-bold text-text">ayushnpatel@gmail.com</a>
          </p>
        </div>

        {/* Jobs Section */}
        <div className="space-y-12 md:space-y-22">
          <Job
            icon={Code}
            title="software engineer"
            description="building scalable systems and elegant interfaces"
            imageCount={3}
            invert={false}
          />
          <Job
            icon={Briefcase}
            title="product builder"
            description="shipping products that people actually want to use"
            imageCount={3}
            invert={true}
          />
          <Job
            icon={Rocket}
            title="startup enthusiast"
            description="launching ideas and iterating quickly"
            imageCount={3}
            invert={false}
          />
        </div>
      </main>
    </div>
  );
}