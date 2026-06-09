export default function Footer() {
  return (
    <>
      <footer id="contacto">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                Espacio <em>Su</em>
              </div>
              <p className="footer-tag">
                Consultora Natura en Paraná, Entre Ríos. Venta de cosméticos,
                perfumes Natura, productos naturales para el cuidado de la piel
                y regalos — con asesoramiento de Susana Balcar.
              </p>
              <p className="footer-location">
                Paraná · Entre Ríos · Argentina
              </p>
              <div className="socials">
                <a
                  href="https://wa.link/57qr5j"
                  className="social-btn wa"
                  aria-label="WhatsApp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0a12 12 0 0 0-10.4 18L0 24l6.2-1.6A12 12 0 0 0 24 12a11.9 11.9 0 0 0-3.5-8.5zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 21.8 12 9.8 9.8 0 0 1 12 21.8zm5.4-7.4c-.3-.2-1.7-.9-2-1s-.5-.2-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2c-.2-.4 0-.5.1-.7l.5-.5.3-.5a.6.6 0 0 0 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.3 3.3 0 0 0-1 2.5 5.8 5.8 0 0 0 1.2 3.1 13.2 13.2 0 0 0 5.1 4.5c.7.3 1.3.5 1.7.6a4 4 0 0 0 1.8.1 3 3 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/espacio_su"
                  className="social-btn"
                  aria-label="Instagram"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="18" cy="6" r="1" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="mailto:Susanitabalcar@gmail.com"
                  className="social-btn"
                  aria-label="Email"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 6 10-6" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h5>Visitá</h5>
              <ul className="footer-list">
                <li><a href="#filosofia">Filosofía</a></li>
                <li><a href="#productos">Galería</a></li>
                <li><a href="#perfumeria">Perfumería</a></li>
                <li><a href="#gracias">Post-venta</a></li>
              </ul>
            </div>

            <div>
              <h5>Contacto</h5>
              <ul className="footer-list">
                <li>
                  <a href="mailto:Susanitabalcar@gmail.com">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M2 7l10 6 10-6" />
                    </svg>
                    Susanitabalcar@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.link/57qr5j">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0a12 12 0 0 0-10.4 18L0 24l6.2-1.6A12 12 0 0 0 24 12a11.9 11.9 0 0 0-3.5-8.5z" />
                    </svg>
                    +54 343 507 1329
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/espacio_su">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                    @espacio_su
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Espacio Su · Susana Balcar</span>
            <span>Full Stack Developer Eliseo J Romero</span>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.link/57qr5j"
        className="wa-float"
        aria-label="WhatsApp directo"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0a12 12 0 0 0-10.4 18L0 24l6.2-1.6A12 12 0 0 0 24 12a11.9 11.9 0 0 0-3.5-8.5zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 21.8 12 9.8 9.8 0 0 1 12 21.8zm5.4-7.4c-.3-.2-1.7-.9-2-1s-.5-.2-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2c-.2-.4 0-.5.1-.7l.5-.5.3-.5a.6.6 0 0 0 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.3 3.3 0 0 0-1 2.5 5.8 5.8 0 0 0 1.2 3.1 13.2 13.2 0 0 0 5.1 4.5c.7.3 1.3.5 1.7.6a4 4 0 0 0 1.8.1 3 3 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4z" />
        </svg>
      </a>
    </>
  );
}
