"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Slide {
    id: number;
    title: string;
    highlight: string;
    description: string;
    image: string;
    buttonText: string;
    buttonHref: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "Your health deserves",
        highlight: "better care.",
        description:
            "Connect with trusted doctors, find the right specialist, and book your appointment from one simple healthcare platform.",
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        buttonText: "Find a Doctor",
        buttonHref: "/doctors",
    },
    {
        id: 2,
        title: "Expert doctors,",
        highlight: "when you need them.",
        description:
            "Explore verified doctors by specialization and choose a healthcare professional that fits your needs.",
        image:
            "https://images.unsplash.com/photo-1715634430473-c5891ff16103?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        buttonText: "Explore Doctors",
        buttonHref: "/doctors",
    },
    {
        id: 3,
        title: "Healthcare made",
        highlight: "simple & accessible.",
        description:
            "Book appointments, manage your consultations, and keep your healthcare journey organized in one place.",
        image:
            "https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        buttonText: "Get Started",
        buttonHref: "/register",
    },
];

const AUTO_SLIDE_DELAY = 5000;

export function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const totalSlides = slides.length;

    const goToSlide = useCallback(
        (index: number) => {
            if (isAnimating || index === currentSlide) return;

            setIsAnimating(true);
            setCurrentSlide(index);

            window.setTimeout(() => {
                setIsAnimating(false);
            }, 700);
        },
        [currentSlide, isAnimating],
    );

    const nextSlide = useCallback(() => {
        if (isAnimating) return;

        const next = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;

        goToSlide(next);
    }, [currentSlide, goToSlide, isAnimating, totalSlides]);

    const previousSlide = useCallback(() => {
        if (isAnimating) return;

        const previous =
            currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;

        goToSlide(previous);
    }, [currentSlide, goToSlide, isAnimating, totalSlides]);

    /* ---------------------------------------------------------------------- */
    /* Auto slide                                                            */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
        const timer = window.setInterval(() => {
            if (!isAnimating) {
                setCurrentSlide((previous) =>
                    previous === totalSlides - 1 ? 0 : previous + 1,
                );
            }
        }, AUTO_SLIDE_DELAY);

        return () => window.clearInterval(timer);
    }, [isAnimating, totalSlides]);

    /* ---------------------------------------------------------------------- */
    /* Keyboard navigation                                                   */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                previousSlide();
            }

            if (event.key === "ArrowRight") {
                nextSlide();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [nextSlide, previousSlide]);

    /* ---------------------------------------------------------------------- */
    /* Touch / Swipe                                                         */
    /* ---------------------------------------------------------------------- */

    const handleTouchStart = (event: React.TouchEvent) => {
        touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchMove = (event: React.TouchEvent) => {
        touchEndX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;

        const distance = touchStartX.current - touchEndX.current;
        const minimumSwipeDistance = 50;

        if (Math.abs(distance) >= minimumSwipeDistance) {
            if (distance > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <section
            className="relative h-[100svh] min-h-155 w-full overflow-hidden bg-black select-none"
            aria-label="Healthcare services"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* ------------------------------------------------------------------ */}
            {/* Slides                                                            */}
            {/* ------------------------------------------------------------------ */}

            <div className="relative h-full">
                {slides.map((slide, index) => {
                    const active = index === currentSlide;

                    return (
                        <article
                            key={slide.id}
                            className={cn(
                                "absolute inset-0 overflow-hidden transition-opacity duration-700 ease-out",
                                active
                                    ? "opacity-100"
                                    : "pointer-events-none opacity-0",
                            )}
                            aria-hidden={!active}
                        >
                            {/* Background image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.image}
                                    alt=""
                                    fill
                                    priority={index === 0}
                                    sizes="100vw"
                                    className={cn(
                                        "object-cover transition-transform duration-5000 ease-out",
                                        active && "scale-105",
                                    )}
                                />

                                {/* Dark image overlay */}
                                <div className="absolute inset-0 bg-black/35" />

                                {/* Bottom gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-black/20" />
                            </div>

                            {/* ------------------------------------------------------------ */}
                            {/* Angled SVG overlay                                            */}
                            {/* ------------------------------------------------------------ */}

                            <svg
                                className={cn(
                                    "absolute inset-y-0 left-0 hidden h-full w-[65%] transition-opacity duration-700 lg:block",
                                    active ? "opacity-100" : "opacity-0",
                                )}
                                viewBox="0 0 720 800"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M0,0 H190 L610,800 H0 Z"
                                    className="fill-black/75"
                                />
                            </svg>

                            {/* Mobile dark panel */}
                            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-black/85 via-black/50 to-transparent lg:hidden" />

                            {/* ------------------------------------------------------------ */}
                            {/* Content                                                       */}
                            {/* ------------------------------------------------------------ */}

                            <div className="relative z-10 container mx-auto flex h-full items-end px-5 pb-28 sm:px-8 lg:items-center lg:px-10 lg:pb-0">
                                <div
                                    className={cn(
                                        "max-w-3xl text-white transition-all duration-700 ease-out lg:max-w-xl xl:max-w-3xl",
                                        active
                                            ? "translate-y-0 opacity-100 delay-150"
                                            : "translate-y-8 opacity-0",
                                    )}
                                >
                                    {/* Small label */}
                                    <div className="mb-5 flex items-center gap-2">
                                        <span className="h-px w-8 bg-primary" />

                                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                                            MediCare Health
                                        </span>
                                    </div>

                                    {/* Heading */}
                                    <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                                        {slide.title}
                                        <span className="block text-primary">
                                            {slide.highlight}
                                        </span>
                                    </h1>

                                    {/* Description */}
                                    <p className="mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7 lg:text-lg">
                                        {slide.description}
                                    </p>

                                    {/* CTA */}
                                    <div className="mt-7">
                                        <Button
                                            size="lg"
                                            className=""
                                            asChild
                                        >
                                            <Link href={slide.buttonHref}>
                                                {slide.buttonText}
                                                <ArrowRight className="ml-2 size-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* Previous / Next                                                    */}
            {/* ------------------------------------------------------------------ */}

            <button
                type="button"
                onClick={previousSlide}
                disabled={isAnimating}
                aria-label="Previous slide"
                className={cn(
                    "group absolute left-4 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black md:flex",
                    isAnimating && "cursor-not-allowed opacity-50",
                )}
            >
                <ChevronLeft className="size-5 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <button
                type="button"
                onClick={nextSlide}
                disabled={isAnimating}
                aria-label="Next slide"
                className={cn(
                    "group absolute right-4 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black md:flex",
                    isAnimating && "cursor-not-allowed opacity-50",
                )}
            >
                <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* ------------------------------------------------------------------ */}
            {/* Pagination                                                         */}
            {/* ------------------------------------------------------------------ */}

            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        type="button"
                        onClick={() => goToSlide(index)}
                        disabled={isAnimating}
                        aria-label={`Go to slide ${index + 1} `}
                        aria-current={index === currentSlide ? "true" : undefined}
                        className="group flex h-6 items-center"
                    >
                        <span
                            className={cn(
                                "block h-1 rounded-full transition-all duration-500",
                                index === currentSlide
                                    ? "w-10 bg-white"
                                    : "w-5 bg-white/40 group-hover:bg-white/70",
                            )}
                        />
                    </button>
                ))}
            </div>

            {/* Slide counter */}
            <div className="absolute bottom-8 right-6 z-20 hidden items-center gap-2 text-xs font-medium text-white/70 sm:flex">
                <span className="text-sm text-white">
                    {String(currentSlide + 1).padStart(2, "0")}
                </span>

                <span className="h-px w-6 bg-white/30" />

                <span>{String(totalSlides).padStart(2, "0")}</span>
            </div>
        </section>
    );
} 
