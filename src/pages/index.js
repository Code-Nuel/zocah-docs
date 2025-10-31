import React, { useRef, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * ThemeToggleButton implements a client-only toggle to avoid useColorMode hook issues.
 * It sets data-theme="dark" or "light" on <html> and persists to localStorage.
 */
function ThemeToggleButton() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('zocah_theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      setTheme(saved);
      return;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', initial);
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('zocah_theme', next);
    setTheme(next);
  };

  if (theme === null) return null;
  return (
    <button className={styles.themeToggle} onClick={toggle} aria-label="Toggle theme">
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}

export default function Home() {
  const hero = useBaseUrl('/img/zocah-hero.png');
  const searchRef = useRef(null);

  const onHeroSearch = (e) => {
    if (e.key && e.key !== 'Enter') return;
    const q = searchRef.current && searchRef.current.value && searchRef.current.value.trim();
    if (!q) return;

    // Try kernel search input injected by lunr plugin; if not found, fallback to Google site search
    const selectors = [
      'input[type="search"]',
      'input[placeholder*="Search"]',
      'input[class*="search"]',
      'input'
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el !== searchRef.current) {
        el.focus();
        el.value = q;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        return;
      }
    }

    const site = window.location.hostname || 'zocah.github.io';
    const url = `https://www.google.com/search?q=site:${site}%20${encodeURIComponent(q)}`;
    window.open(url, '_blank');
  };

  return (
    <Layout title="Zocah" description="Build projects without local installs — Zocah docs & blog">
      <main className={styles.container}>
        <header className={styles.hero}>
          <img src={hero} alt=" hero" className={styles.heroImage} />
          <div className={styles.heroText}>
            <h1 className={styles.title}>Zocah</h1>
            <p className={styles.subtitle}>
              Build projects without local installs. Automate dependency generation and managed DevOps.
            </p>

            <div className={styles.searchRow}>
              <input
                ref={searchRef}
                className={styles.heroSearch}
                placeholder="Search docs and blog — press Enter"
                onKeyDown={onHeroSearch}
                aria-label="Search Zocah docs and blog"
              />
              <button
                className={styles.searchBtn}
                onClick={() => {
                  const ev = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
                  searchRef.current.dispatchEvent(ev);
                }}
                aria-label="Search"
              >
                🔍
              </button>

              <ThemeToggleButton />
            </div>

            <div className={styles.ctaRow}>
              <a className={styles.primaryBtn} href={useBaseUrl('/docs/api')}>Get started</a>
              <a className={styles.secondaryBtn} href={useBaseUrl('/blog')}>Read the blog</a>
            </div>
          </div>
        </header>

        <section className={styles.features}>
          <div className={styles.feature}>
            <h3>Zero local setup</h3>
            <p>Spin a sandbox without installing runtimes or package managers.</p>
          </div>
          <div className={styles.feature}>
            <h3>Automated manifests</h3>
            <p>Zocah generates and maintains dependency manifests for your project.</p>
          </div>
          <div className={styles.feature}>
            <h3>Managed DevOps</h3>
            <p>Build, deploy and observe with a programmable API and SDKs.</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
