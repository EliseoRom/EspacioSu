# Espacio Su · Sitio web

Sitio one-page de **Espacio Su** (Susanita Balcar) construido con **Next.js 14 (App Router)** y TypeScript.

## Cómo correrlo

```bash
# 1) Instalá dependencias
npm install

# 2) Modo desarrollo (http://localhost:3000)
npm run dev

# 3) Build para producción
npm run build
npm start
```

## Estructura

```
espacio-su/
├── app/
│   ├── layout.tsx        # Root layout + fuentes Google
│   ├── page.tsx          # Página principal (componente cliente)
│   └── globals.css       # Todos los estilos
├── components/
│   ├── Nav.tsx           # Nav fijo + menú hamburguesa mobile
│   ├── Hero.tsx          # Hero con typewriter
│   ├── Carousel.tsx      # Carrusel dinámico (autoplay + drag + dots)
│   ├── Perfume.tsx       # Sección perfumes (hover sensorial + showcase Natura)
│   ├── Manifest.tsx      # Tarjeta de filosofía
│   ├── Gracias.tsx       # Post-venta con QR
│   ├── Footer.tsx        # Footer + WhatsApp flotante
│   └── reveal.ts         # Hook de animaciones por scroll
├── public/
│   └── images/           # foto-01..16.jpeg
├── package.json
├── next.config.mjs
└── tsconfig.json
```

## Paleta

| Token         | Hex       | Uso                |
| ------------- | --------- | ------------------ |
| `--green`     | `#8FC93A` | Verde manzana base |
| `--green-deep`| `#6BA528` | Verde profundo     |
| `--orange`    | `#FF8A3D` | Anaranjado cálido  |
| `--orange-deep`| `#F0691F`| Naranja acento     |
| `--white`     | `#FFFBF2` | Crema base         |

## Contacto

- 📧 Susanitabalcar@gmail.com
- 📱 +54 343 507 1329 (WhatsApp)
- 📸 @espacio_su
