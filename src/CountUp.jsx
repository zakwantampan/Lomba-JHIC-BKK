import { useEffect, useRef, useState } from 'react';

export function CountUp({ value, duration = 2200 }) {
  const ref = useRef(null);
  const text = String(value);
  const target = Number(text.replace(/[^0-9]/g, ''));
  const suffix = text.match(/[^\d.,]+$/)?.[0] ?? '';
  const separator = text.includes('.') ? '.' : text.includes(',') ? ',' : '';
  const [count, setCount] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? target : 0,
  );

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    let started = false;
    let start;
    const tick = (time) => {
      start ??= time;
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    const finish = () => {
      if (!preference.matches) return;
      cancelAnimationFrame(frame);
      setCount(target);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      if (preference.matches) finish();
      else frame = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    observer.observe(ref.current);
    preference.addEventListener('change', finish);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener('change', finish);
    };
  }, [target, duration]);

  const formatted = separator ? String(count).replace(/\B(?=(\d{3})+(?!\d))/g, separator) : String(count);
  return (
    <span ref={ref} className="count-up" aria-label={text}>
      <span className="count-up-space" aria-hidden="true">{text}</span>
      <span className="count-up-value" aria-hidden="true">{formatted}{suffix}</span>
    </span>
  );
}
