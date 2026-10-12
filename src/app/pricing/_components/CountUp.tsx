import React from "react";

interface CountUpProps {
  start: number;
  end: number;
  displayType: "number" | "k" | "x";
  suffix: string;
}

const CountUp: React.FC<CountUpProps> = ({ start, end, displayType, suffix }) => {
  const ref = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;

          const duration = 2200;
          const startTime = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = progress * (2 - progress); // easing out

            const current = Math.floor(start + (end - start) * eased);

            if (ref.current) {
              ref.current.textContent = formatNumber(current, displayType, suffix);
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [start, end, displayType, suffix]);

  return <span ref={ref}></span>;
};

export default CountUp;


export function formatNumber(
  value: number,
  type: "number" | "k" | "x",
  suffix: string
): string {
  if (type === "k") return `${Math.floor(value / 1000)}k${suffix}`;
  if (type === "x") return `${value}${suffix}`;
  return `${value}${suffix}`;
}
