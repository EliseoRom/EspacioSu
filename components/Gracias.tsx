export default function Gracias() {
  return (
    <section className="gracias-section" id="gracias">
      <div className="container">
        <div className="gracias-wrap">
          <div className="reveal">
            <div className="section-eyebrow">Post-venta</div>
            <h2 className="section-title">
              Una vez que <em>elegiste</em>, te <span className="o">acompaño</span>{" "}
              todo el camino.
            </h2>
            <p
              style={{
                color: "var(--ink-soft)",
                fontSize: 17,
                maxWidth: 520,
              }}
            >
              Cada compra llega con su tarjeta y su código — para que sepas, sin
              dudas, que de este lado hay una persona pendiente de que cada
              producto te guste.
            </p>
          </div>

          <div className="gracias-card reveal">
            <span className="ribbon">Mensaje con tu pedido</span>
            <h3>
              Gracias por <em>tu compra.</em>
            </h3>
            <p>
              Espero que disfrutes tu compra y sea de tu agrado. Cualquier cosa,
              estoy a un mensaje. — Susanita.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
