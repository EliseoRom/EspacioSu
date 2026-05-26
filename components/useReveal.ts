"use client";

import { useEffect } from "react";

/**
 * Splits text inside selected elements into <span class="word"> tokens
 * and animates them on scroll. Also handles simple fade-up targets and
 * the legacy `.reveal` class.
 */
export function useReveal() {
  useEffect(() => {
    /* ── legacy .reveal ── */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    /* ── word-by-word scroll reveal ── */
    function splitIntoWords(el: Element) {
      const node = el as HTMLElement;
      if (node.dataset.split) return;
      node.dataset.split = "1";
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let cur: Node | null;
      while ((cur = walker.nextNode())) textNodes.push(cur as Text);
      textNodes.forEach((tn) => {
        if (!tn.textContent || !tn.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        const tokens = tn.textContent.split(/(\s+)/);
        tokens.forEach((t) => {
          if (!t) return;
          if (/^\s+$/.test(t)) {
            frag.appendChild(document.createTextNode(" "));
          } else {
            const s = document.createElement("span");
            s.className = "word";
            s.textContent = t;
            frag.appendChild(s);
          }
        });
        tn.parentNode?.replaceChild(frag, tn);
      });
      node.classList.add("word-reveal");
      node.querySelectorAll<HTMLElement>(".word").forEach((w, i) => {
        w.style.transitionDelay = `${i * 35}ms`;
      });
    }

    const wordTargets = document.querySelectorAll(
      ".section-title, .pn-title, .pn-intro, .perfume-text p, .gracias-card h3, .gracias-card p, .manifest-card h2, .pillar h4, .pillar p, .hero-manifest, .footer-tag, .pf-info h4, .pf-info p"
    );
    wordTargets.forEach(splitIntoWords);

    const wordIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("go");
            wordIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    wordTargets.forEach((el) => wordIO.observe(el));

    /* ── generic fade-up ── */
    const fadeTargets = document.querySelectorAll(
      ".section-eyebrow, .pf-fam, .pf-notes, .pn-cta, .qr, .ribbon, .footer h5, .footer-list, .socials, .car-cap, .hero-ctas"
    );
    fadeTargets.forEach((el) => el.classList.add("fade-up"));
    const fadeIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("go");
            fadeIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    fadeTargets.forEach((el) => fadeIO.observe(el));

    return () => {
      io.disconnect();
      wordIO.disconnect();
      fadeIO.disconnect();
    };
  }, []);
}
