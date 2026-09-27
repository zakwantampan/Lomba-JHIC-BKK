import { useLayoutEffect, useRef } from 'react';

export function DesktopNavigation({ links, activeId }) {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    let disposed = false;
    const place = (link) => {
      if (!link || !nav.offsetWidth) return;
      nav.style.setProperty('--nav-line-x', `${link.offsetLeft}px`);
      nav.style.setProperty('--nav-line-width', `${link.offsetWidth}px`);
    };
    const restore = () => place(nav.querySelector('.nav-link-item.active'));
    const preview = (event) => place(event.target.closest('.nav-link-item'));
    const blur = (event) => { if (!nav.contains(event.relatedTarget)) restore(); };
    restore();
    const resize = new ResizeObserver(restore);
    resize.observe(nav);
    nav.addEventListener('pointerover', preview);
    nav.addEventListener('pointerleave', restore);
    nav.addEventListener('focusin', preview);
    nav.addEventListener('focusout', blur);
    document.fonts.ready.then(() => { if (!disposed) restore(); });
    return () => {
      disposed = true;
      resize.disconnect();
      nav.removeEventListener('pointerover', preview);
      nav.removeEventListener('pointerleave', restore);
      nav.removeEventListener('focusin', preview);
      nav.removeEventListener('focusout', blur);
    };
  }, [activeId]);

  return (
    <nav ref={navRef} className="nav-menu-desktop" aria-label="Navigasi utama">
      {links.map((link) => (
        <a key={link.id} href={`#${link.id}`}
          className={`nav-link-item ${activeId === link.id ? 'active' : ''}`}
          aria-current={activeId === link.id ? 'location' : undefined}>
          {link.label}
        </a>
      ))}
      <span className="nav-sliding-line" aria-hidden="true" />
    </nav>
  );
}

