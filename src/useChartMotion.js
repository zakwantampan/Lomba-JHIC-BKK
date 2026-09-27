import { useEffect } from 'react';

// Replay chart entrances on a fresh visit to the chart, rather than on page load.
export function useChartMotion() {
  useEffect(() => {
    const charts = document.querySelectorAll('.donut-svg-stage, .barchart-stage-container');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        target.classList.toggle('chart-in-view', isIntersecting);
      });
    }, { threshold: 0.2 });
    charts.forEach((chart) => observer.observe(chart));
    return () => observer.disconnect();
  }, []);
}
