"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} id="nav">
        <a href="#home" className="brand">
          <span className="brand-mark"></span>
          Espacio Su
        </a>
        <ul className="nav-links">
          <li><a href="#filosofia">Filosofía</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#perfumeria">Perfumería</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="https://wa.link/57qr5j" className="nav-cta">
          Hablemos →
        </a>
        <button
          className={`hamburger ${open ? "open" : ""}`}
          aria-label="Menú"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <a href="#filosofia" onClick={close}>Filosofía</a>
        <a href="#productos" onClick={close}>Productos</a>
        <a href="#perfumeria" onClick={close}>Perfumería</a>
        <a href="#gracias" onClick={close}>Comunidad</a>
        <a href="#contacto" onClick={close}>Contacto</a>
        <div className="mm-foot">
          Despierta tus sentidos llenos de aromas
        </div>
      </div>
    </>
  );
}
