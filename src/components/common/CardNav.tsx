import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";

export type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  /** Render a custom logo node (text, SVG, img, etc.) */
  logoNode?: React.ReactNode;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonLabel?: string;
  buttonHref?: string;
  secondButtonBgColor?: string;
  secondButtonTextColor?: string;
  secondButtonLabel?: string;
  secondButtonHref?: string;
  /** When provided, replaces the CTA button area entirely */
  rightNode?: React.ReactNode;
}

const CardNav: React.FC<CardNavProps> = ({
  logoNode,
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#F8EDEB",
  menuColor = "#3D2B1F",
  buttonBgColor = "#C07850",
  buttonTextColor = "#F8EDEB",
  buttonLabel = "Đăng Ký",
  buttonHref = "/register",
  secondButtonBgColor,
  secondButtonTextColor,
  secondButtonLabel,
  secondButtonHref,
  rightNode,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const wasVisibility = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        void contentEl.offsetHeight; // force reflow

        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisibility;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return 64 + contentHeight + 16;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 64, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, { height: calculateHeight, duration: 0.42, ease });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.38, ease, stagger: 0.07 },
      "-=0.15",
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[92%] max-w-[860px] z-[99] top-[1rem] md:top-[1.4rem] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} block h-[64px] p-0 rounded-2xl shadow-card relative overflow-hidden will-change-[height]`}
        style={{ backgroundColor: baseColor }}
      >
        {/* Subtle border overlay */}
        <div className="absolute inset-0 rounded-2xl border border-[#E8D5CF] pointer-events-none z-[3]" />

        {/* ── Top bar ── */}
        <div className="card-nav-top absolute inset-x-0 top-0 h-[64px] flex items-center justify-between px-4 z-[2]">
          {/* Hamburger — left on mobile, hidden on desktop because desktop uses card links */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group md:hidden h-full flex flex-col items-center justify-center cursor-pointer gap-[5px] order-2`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Đóng menu" : "Mở menu"}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
            style={{ color: menuColor }}
          >
            <div
              className={`w-[26px] h-[2px] bg-current rounded-full transition-[transform,opacity] duration-300 ease-in-out ${
                isHamburgerOpen ? "translate-y-[6px] rotate-45" : ""
              } group-hover:opacity-70`}
            />
            <div
              className={`w-[26px] h-[2px] bg-current rounded-full transition-[transform,opacity] duration-300 ease-in-out ${
                isHamburgerOpen ? "opacity-0" : ""
              } group-hover:opacity-70`}
            />
            <div
              className={`w-[26px] h-[2px] bg-current rounded-full transition-[transform,opacity] duration-300 ease-in-out ${
                isHamburgerOpen ? "-translate-y-[6px] -rotate-45" : ""
              } group-hover:opacity-70`}
            />
          </div>

          {/* Desktop hamburger (left) */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group hidden md:flex h-full flex-col items-center justify-center cursor-pointer gap-[5px]`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Đóng menu" : "Mở menu"}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
            style={{ color: menuColor }}
          >
            <div
              className={`w-[26px] h-[2px] bg-current rounded-full transition-[transform,opacity] duration-300 ease-in-out ${
                isHamburgerOpen ? "translate-y-[6px] rotate-45" : ""
              } group-hover:opacity-70`}
            />
            <div
              className={`w-[26px] h-[2px] bg-current rounded-full transition-[transform,opacity] duration-300 ease-in-out ${
                isHamburgerOpen ? "opacity-0" : ""
              } group-hover:opacity-70`}
            />
            <div
              className={`w-[26px] h-[2px] bg-current rounded-full transition-[transform,opacity] duration-300 ease-in-out ${
                isHamburgerOpen ? "-translate-y-[6px] -rotate-45" : ""
              } group-hover:opacity-70`}
            />
          </div>

          {/* Logo — centred */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 order-1">
            {logoNode}
          </div>

          {/* CTA buttons — right */}
          <div className="hidden md:flex items-center gap-2">
            {rightNode ? (
              rightNode
            ) : (
              <>
                {secondButtonLabel && secondButtonHref && (
                  <a
                    href={secondButtonHref}
                    className="inline-flex items-center rounded-xl px-5 h-[42px] text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:opacity-85"
                    style={{
                      backgroundColor: secondButtonBgColor ?? buttonBgColor,
                      color: secondButtonTextColor ?? buttonTextColor,
                    }}
                  >
                    {secondButtonLabel}
                  </a>
                )}
                <a
                  href={buttonHref}
                  className="inline-flex items-center rounded-xl px-5 h-[42px] text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:opacity-85"
                  style={{
                    backgroundColor: buttonBgColor,
                    color: buttonTextColor,
                  }}
                >
                  {buttonLabel}
                </a>
              </>
            )}
          </div>
        </div>

        {/* ── Expandable card panel ── */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[64px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-2`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              ref={setCardRef(idx)}
              className="nav-card select-none relative flex flex-col gap-2 p-[10px_14px] rounded-xl min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="font-light tracking-[-0.3px] text-[17px] md:text-[20px]">
                {item.label}
              </div>
              <div className="mt-auto flex flex-col gap-[3px]">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    className="inline-flex items-center gap-[5px] no-underline cursor-pointer transition-opacity duration-200 hover:opacity-65 text-[13px] md:text-[14px] font-medium tracking-wide"
                  >
                    <GoArrowUpRight className="shrink-0" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
