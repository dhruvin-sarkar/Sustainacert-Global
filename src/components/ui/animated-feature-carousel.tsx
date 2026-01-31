"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Animation presets for different effects
const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { type: "spring", stiffness: 300, damping: 25 }
  }
} as const;

// Custom hook for auto-cycling through steps
function useNumberCycler(totalSteps: number, interval = 5000, enabled = true) {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const timerId = window.setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps);
    }, interval);

    return () => window.clearTimeout(timerId);
  }, [currentNumber, totalSteps, interval, enabled]);

  const setStep = useCallback(
    (stepIndex: number) => {
      setCurrentNumber(stepIndex % totalSteps);
    },
    [totalSteps],
  );

  return { currentNumber, setStep };
}

// Image component with lazy loading and error handling
type StepImageProps = {
  src: string;
  alt: string;
  className?: string;
  animationPreset?: keyof typeof ANIMATION_PRESETS;
  delay?: number;
  shouldReduceMotion?: boolean;
} & Omit<ComponentPropsWithoutRef<typeof motion.div>, "ref">;

function StepImage({
  src,
  alt,
  className,
  animationPreset = "fadeInScale",
  delay = 0,
  shouldReduceMotion,
  ...props
}: StepImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const placeholderImage = (alt: string) => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%236b7280'%3E${encodeURIComponent(alt)}%3C/text%3E%3C/svg%3E`;
  };

  const animation = ANIMATION_PRESETS[animationPreset];

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden select-none", className)}
      {...(shouldReduceMotion ? {} : animation)}
      transition={shouldReduceMotion ? undefined : { ...animation.transition, delay }}
      {...props}
    >
      {isInView && (
        <img
          src={hasError ? placeholderImage(alt) : src}
          alt={alt}
          className={cn(
            "absolute inset-0 w-full h-full max-w-none object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
      {!isLoaded && isInView && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </motion.div>
  );
}

// Types for the carousel
export interface ImageSet {
  step1img1: string;
  step1img2: string;
  step2img1: string;
  step2img2: string;
  step3img: string;
  step4img: string;
  alt: string;
}

export interface Step {
  id: string;
  name: string;
  title: string;
  description: string;
}

export interface CardProps {
  className?: string;
}

export interface FeatureCarouselProps extends CardProps {
  step1img1Class?: string;
  step1img2Class?: string;
  step2img1Class?: string;
  step2img2Class?: string;
  step3imgClass?: string;
  step4imgClass?: string;
  image: ImageSet;
  steps?: readonly Step[];
}

const defaultClasses = {
  step1img1: "w-1/2 h-64 rounded-tl-2xl object-cover",
  step1img2: "w-1/2 h-64 rounded-tr-2xl object-cover",
  step2img1: "w-1/2 h-48 rounded-bl-2xl object-cover",
  step2img2: "w-1/2 h-48 rounded-br-2xl object-cover",
  step3img: "w-full h-64 rounded-2xl object-cover",
  step4img: "w-full h-64 rounded-2xl object-cover",
};

export function FeatureCarousel({
  image,
  steps: customSteps,
  step1img1Class = defaultClasses.step1img1,
  step1img2Class = defaultClasses.step1img2,
  step2img1Class = defaultClasses.step2img1,
  step2img2Class = defaultClasses.step2img2,
  step3imgClass = defaultClasses.step3img,
  step4imgClass = defaultClasses.step4img,
  className,
  ...props
}: FeatureCarouselProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  // Default steps if none provided
  const defaultSteps: readonly Step[] = [
    {
      id: "1",
      name: "Step 1",
      title: "Seamless Integration",
      description: "Connect your tools and workflows effortlessly.",
    },
    {
      id: "2",
      name: "Step 2",
      title: "Powerful Analytics",
      description: "Gain deep insights with our advanced analytics.",
    },
    {
      id: "3",
      name: "Step 3",
      title: "Collaborative Workspace",
      description: "Work together in real-time.",
    },
    {
      id: "4",
      name: "Step 4",
      title: "Automated Workflows",
      description: "Put your tasks on autopilot.",
    },
  ];
  
  const steps = customSteps || defaultSteps;
  const { currentNumber: step, setStep } = useNumberCycler(steps.length, 5000, !shouldReduceMotion);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-4xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="p-8"
          {...(shouldReduceMotion ? {} : ANIMATION_PRESETS.fadeInScale)}
        >
          <div className="mb-6">
            <span className="text-emerald-600 dark:text-emerald-500 text-sm font-semibold uppercase tracking-wider">
              {steps[step].name}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {steps[step].title}
            </h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
            {steps[step].description}
          </p>

          {/* Step-specific image layouts */}
          <div className="relative h-64 md:h-80">
            {step === 0 && (
              <div className="flex h-full">
                <StepImage
                  src={image.step1img1}
                  alt={`${image.alt} - Step 1 Image 1`}
                  className={step1img1Class}
                  animationPreset="slideInLeft"
                  shouldReduceMotion={shouldReduceMotion}
                />
                <StepImage
                  src={image.step1img2}
                  alt={`${image.alt} - Step 1 Image 2`}
                  className={step1img2Class}
                  animationPreset="slideInRight"
                  delay={0.1}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </div>
            )}
            
            {step === 1 && (
              <div className="flex h-full">
                <StepImage
                  src={image.step2img1}
                  alt={`${image.alt} - Step 2 Image 1`}
                  className={step2img1Class}
                  animationPreset="fadeInScale"
                  shouldReduceMotion={shouldReduceMotion}
                />
                <StepImage
                  src={image.step2img2}
                  alt={`${image.alt} - Step 2 Image 2`}
                  className={step2img2Class}
                  animationPreset="fadeInScale"
                  delay={0.2}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </div>
            )}
            
            {step === 2 && (
              <StepImage
                src={image.step3img}
                alt={`${image.alt} - Step 3 Image`}
                className={step3imgClass}
                animationPreset="fadeInScale"
                shouldReduceMotion={shouldReduceMotion}
              />
            )}
            
            {step === 3 && (
              <StepImage
                src={image.step4img}
                alt={`${image.alt} - Step 4 Image`}
                className={step4imgClass}
                animationPreset="fadeInScale"
                shouldReduceMotion={shouldReduceMotion}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step Navigation */}
      <StepsNav current={step} onChange={setStep} steps={steps} />
    </div>
  );
}

// Step navigation component
function StepsNav({ 
  current, 
  onChange, 
  steps 
}: { 
  current: number; 
  onChange: (index: number) => void; 
  steps: readonly Step[];
}) {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-2">
      {steps.map((_, index) => (
        <button
          key={`step-${index}`}
          onClick={() => onChange(index)}
          className={cn(
            "w-8 h-8 rounded-full text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
            current === index
              ? "bg-emerald-600 text-white dark:bg-emerald-500"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          )}
          aria-label={`Go to step ${index + 1}`}
          aria-current={current === index ? "true" : undefined}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
