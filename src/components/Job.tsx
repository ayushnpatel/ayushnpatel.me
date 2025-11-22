import type { LucideIcon } from 'lucide-react';

interface JobProps {
  icon: LucideIcon;
  title: string;
  description: string;
  imageCount?: number;
  invert?: boolean;
}

export function Job({ icon: Icon, title, description, imageCount = 3, invert = false }: JobProps) {
  const clampedImageCount = Math.min(Math.max(imageCount, 1), 4);
  const imageSize = 80;
  const totalImagesHeight = imageSize;

  const iconCircle = (
    <div
      className="shrink-0 rounded-full border-3 border-border-strong
                 bg-surface-accent
                 flex items-center justify-center
                 shadow-md hover:shadow-lg
                 transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px]"
      style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
    >
      <Icon className="text-accent" size={32} strokeWidth={2.5} />
    </div>
  );

  const textContent = (
    <div className={`flex flex-col justify-center ${invert ? 'items-end text-right' : 'items-start text-left'}`}>
      <h3 className="text-2xl md:text-3xl font-bold text-text leading-tight text-pretty">
        {title}
      </h3>
      <p className="text-sm md:text-base text-text-muted text-pretty">
        {description}
      </p>
    </div>
  );

  const iconAndText = (
    <div className={`flex items-center gap-3 ${invert ? 'flex-row-reverse' : 'flex-row'}`} style={{ height: `${totalImagesHeight}px` }}>
      {iconCircle}
      {textContent}
    </div>
  );

  const images = (
    <div className="flex gap-3">
      {Array.from({ length: clampedImageCount }).map((_, i) => (
        <div
          key={i}
          className="border-2 border-border-strong
                     bg-secondary-subtle
                     flex items-center justify-center
                     shadow-sm hover:shadow-md
                     transition-all duration-200
                     hover:translate-x-[-1px] hover:translate-y-[-1px]"
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
            borderRadius: '2px',
          }}
        >
          <span className="text-xs font-mono text-text-subtle">
            16×16
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-1/2 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-6">
        {invert ? (
          <>
            {images}
            {iconAndText}
          </>
        ) : (
          <>
            {iconAndText}
            {images}
          </>
        )}
      </div>
    </div>
  );
}
