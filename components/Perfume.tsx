"use client";

type Perfume = {
  c1: string;
  c2: string;
  family: string;
  name: string;
  label: string;
  copy: string;
  notes: string[];
};

const PERFUMES: Perfume[] = [
  {
    c1: "#FFB987",
    c2: "#F0691F",
    family: "Amazónica",
    name: "Ekos Castanha",
    label: "Ekos",
    copy: "Notas calmas y amaderadas. Ideal para los días que piden reparo.",
    notes: ["castaña", "vainilla", "maderas"],
  },
  {
    c1: "#C9E27D",
    c2: "#6BA528",
    family: "Clásica fresca",
    name: "Kaiak Clásico",
    label: "Kaiak",
    copy: "Energía fresca, cítrica. El frescor del agua en piel.",
    notes: ["cítricos", "lavanda", "frescor acuático"],
  },
  {
    c1: "#FFE7D4",
    c2: "#FF8A3D",
    family: "Eau de Parfum",
    name: "Essencial Elixir",
    label: "Essencial",
    copy: "Carácter intenso y elegante. Para esos días en que querés brillar.",
    notes: ["rosa", "pimienta", "ámbar"],
  },
  {
    c1: "#EAF6CC",
    c2: "#8FC93A",
    family: "Floral oriental",
    name: "Una Sutil",
    label: "Una",
    copy: "Femenina, delicada, con un fondo cremoso que abraza.",
    notes: ["jazmín", "vainilla", "pétalos"],
  },
  {
    c1: "#FFB987",
    c2: "#F0691F",
    family: "Joven divertido",
    name: "Humor Matte",
    label: "Humor",
    copy: "Alegre y cálido. Una sonrisa hecha aroma.",
    notes: ["frutos rojos", "jengibre", "almizcle"],
  },
  {
    c1: "#C9E27D",
    c2: "#6BA528",
    family: "Misteriosa",
    name: "Luna Essence",
    label: "Luna",
    copy: "Notas profundas, envolventes — para las noches que querés recordar.",
    notes: ["iris", "pachuli", "maderas dulces"],
  },
];

export default function Perfume() {
  return (
    <section className="perfume-section" id="perfumeria">
      <div className="container">
        <div className="perfume-grid">
          <div className="reveal" style={{ position: "relative" }}>
            <div className="lavender-container">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`lavender-sprig ls${i + 1}`}
                  viewBox="0 0 100 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d={i % 2 === 0 ? "M50 190 Q 48 110 50 30" : "M50 190 Q 52 110 50 30"}
                    stroke="#759A5A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d={i % 2 === 0 ? "M50 140 Q 30 130 20 120" : "M50 135 Q 25 130 18 122"}
                    stroke="#759A5A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d={i % 2 === 0 ? "M50 155 Q 70 145 80 135" : "M50 148 Q 72 140 78 132"}
                    stroke="#759A5A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path d="M50 120 C 35 118 35 105 50 108 C 65 105 65 118 50 120 Z" fill="#9F73AB" />
                  <circle cx="36" cy="112" r="5" fill="#875896" />
                  <circle cx="64" cy="112" r="5" fill="#875896" />
                  <circle cx="50" cy="110" r="6" fill="#754483" />
                  <path d="M50 95 C 37 93 37 82 50 85 C 63 85 63 93 50 95 Z" fill="#B184BD" />
                  <circle cx="39" cy="88" r="5.5" fill="#9F73AB" />
                  <circle cx="61" cy="88" r="5.5" fill="#9F73AB" />
                  <circle cx="50" cy="86" r="6.5" fill="#875896" />
                  <path d="M50 72 C 38 70 38 60 50 63 C 62 63 62 70 50 72 Z" fill="#C59AD1" />
                  <circle cx="41" cy="66" r="5" fill="#B184BD" />
                  <circle cx="59" cy="66" r="5" fill="#B184BD" />
                  <circle cx="50" cy="64" r="6" fill="#9F73AB" />
                  <circle cx="44" cy="48" r="4.5" fill="#C59AD1" />
                  <circle cx="56" cy="48" r="4.5" fill="#C59AD1" />
                  <circle cx="50" cy="46" r="5.5" fill="#B184BD" />
                  <circle cx="50" cy="32" r="4.5" fill="#C59AD1" />
                  <circle cx="50" cy="22" r="3" fill="#DDBEE5" />
                </svg>
              ))}
            </div>
            <div className="section-eyebrow">Experiencia sensorial</div>
            <h2 className="section-title">
              Perfumes que <em>cuentan</em> tu <span className="o">historia.</span>
            </h2>
            <div className="perfume-text">
              <p>
                <em>Perfumarse</em> es una manera de expresar tu personalidad,
                dejando una huella en los corazones y mentes de quienes te rodean.
              </p>
              <p>
                Detrás de cada aroma hay una vivencia. Me encanta ser parte de la
                tuya, y que confíes en este espacio mío para elegir lo que va en
                tu piel.
              </p>
              <p>
                Por nuevos momentos llenos de aromas — te espero en mi espacio.
              </p>
              <a
                href="https://wa.link/57qr5j"
                className="btn btn-primary"
                style={{ marginTop: 18 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0a12 12 0 0 0-10.4 18L0 24l6.2-1.6A12 12 0 0 0 24 12a11.9 11.9 0 0 0-3.5-8.5zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 21.8 12 9.8 9.8 0 0 1 12 21.8zm5.4-7.4c-.3-.2-1.7-.9-2-1s-.5-.2-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2c-.2-.4 0-.5.1-.7l.5-.5.3-.5a.6.6 0 0 0 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.3 3.3 0 0 0-1 2.5 5.8 5.8 0 0 0 1.2 3.1 13.2 13.2 0 0 0 5.1 4.5c.7.3 1.3.5 1.7.6a4 4 0 0 0 1.8.1 3 3 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4z" />
                </svg>
                Pedir por WhatsApp
              </a>
            </div>
          </div>

          <div className="scent-stage reveal">
            <div className="scent-cards">
              <div className="scent-card sc-1">
                <img src="/images/foto-13.jpeg" alt="Bruma corporal" />
                <div className="scent-pop">
                  <small>Bruma · Corporal</small>
                  <strong>
                    Patchouli &amp; cítricos — para empezar el día con frescura.
                  </strong>
                </div>
              </div>
              <div className="scent-card sc-2">
                <img src="/images/foto-12.jpeg" alt="Tododia" />
                <div className="scent-pop">
                  <small>Tododia · Flor de Lis</small>
                  <strong>Suave y delicada, con notas florales que abrazan.</strong>
                </div>
              </div>
              <div className="scent-card sc-3">
                <img src="/images/foto-15.jpeg" alt="Calma Mía" />
                <div className="scent-pop">
                  <small>Calma Mía · Aromaterapia</small>
                  <strong>
                    Repuestos aromatizantes hechos en Argentina, con calma.
                  </strong>
                </div>
              </div>
              <div className="scent-card sc-4">
                <img src="/images/foto-11.jpeg" alt="Línea tododia" />
                <div className="scent-pop">
                  <small>Línea completa</small>
                  <strong>
                    Crema, desodorante, body splash &amp; jabones — perfumación
                    pareja.
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Natura perfume showcase */}
        <div className="perfumes-natura reveal">
          <div className="pn-head">
            <div>
              <div className="section-eyebrow">Catálogo Natura</div>
              <h3 className="pn-title">
                Perfumes <em>Natura</em> en mi espacio.
              </h3>
            </div>
            <p className="pn-intro">
              Una selección de las líneas que llevo siempre. Cada frasco es una
              historia — contame qué te gusta y te ayudo a elegir.
            </p>
          </div>

          <div className="perfume-grid-list">
            {PERFUMES.map((p, i) => (
              <article
                key={i}
                className="pf-card"
                style={
                  {
                    ["--c1" as string]: p.c1,
                    ["--c2" as string]: p.c2,
                  } as React.CSSProperties
                }
              >
                <div className="pf-bottle">
                  <span className="pf-cap"></span>
                  <span className="pf-body">
                    <span className="pf-label">{p.label}</span>
                  </span>
                </div>
                <div className="pf-info">
                  <span className="pf-fam">{p.family}</span>
                  <h4>{p.name}</h4>
                  <p>{p.copy}</p>
                  <div className="pf-notes">
                    {p.notes.map((n, j) => (
                      <span key={j}>{n}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pn-cta">
            <a href="https://wa.link/57qr5j" className="btn btn-primary">
              Consultar disponibilidad <span>→</span>
            </a>
            <span className="pn-footnote">
              * Disponibilidad y precios actualizados al consultar.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
