import { Header } from "./components/Header";
import { Job } from "./components/Job";
import { Code, Briefcase, Rocket, Zap } from "lucide-react";
import { useTheme } from "./hooks/useTheme";
import { Vignette } from "./components/Vignette";
import { AnimatedYear } from "./components/AnimatedYear";
import { Pagination } from "./components/Pagination";
import pltrImage from "./assets/pltr.png";
import capitalOneImage from "./assets/capital-one-icon.png";
import snackpassImage from "./assets/snackpass.png";

export function App() {
  const { isDark, toggleTheme, colorTheme, setColorTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 noise">
      <Vignette colorTheme={colorTheme} intensity={0.4} isDark={isDark} />
      <Header
        isDark={isDark}
        onThemeToggle={toggleTheme}
        colorTheme={colorTheme}
        onColorChange={setColorTheme}
      />

      <main className="pt-24 sm:pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-text mb-4 text-balance">
            ayush patel
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto text-pretty">
            <AnimatedYear /> 🚀
            <br /> reach out at{" "}
            <a
              href="mailto:ayushnpatel@gmail.com"
              className="underline font-bold text-text hover:text-accent transition-colors"
            >
              ayushnpatel@gmail.com
            </a>
          </p>
        </div>

        {/* Jobs Section */}
        <div className="space-y-16 md:space-y-24">
          <Job
            image={pltrImage}
            title="fde @ palantir"
            date="may 2025 - present"
            description="platform forward deployed engineer, multi-tenancy and governance features working with AI startups for financial service companies"
            imageCount={3}
            showDivider={false}
          />
          <Job
            image={capitalOneImage}
            title="swe @ capital one"
            date="jun 2023 - may 2025"
            description="CRUD engineer, modernizing APIs java -> golang, 3000+ tps microservices modernizing account + transaction data systems + various extracurriculars"
            imageCount={3}
            showDivider={true}
          />
          <Job
            image={snackpassImage}
            title="intern @ snackpass"
            date="spring 2023 - summer 2023"
            description="worked on 4 stacks — kiosk apps, ios + android app, web app, backend. lasting features amongst all of them — including current promotion system"
            imageCount={3}
            showDivider={true}
          />
        </div>
      </main>
      <Pagination />
    </div>
  );
}
