/**
 * Diseño RapOt — nuevo modelo de ciudad.
 * Una propuesta urbana para conectar bienestar, territorio y futuro compartido.
 */
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  ChevronRight,
  CircleDotDashed,
  CheckCircle2,
  Download,
  Factory,
  Leaf,
  Menu,
  Route,
  Sparkles,
  Trees,
  X,
} from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

const mediaUrl = (filename: string) => `${import.meta.env.BASE_URL}media/${filename}`;
const heroImage = mediaUrl("hero-industrial.svg");
const heritageImage = mediaUrl("heritage-industrial.svg");
const corridorImage = mediaUrl("corridor-green.svg");
const brandMark = mediaUrl("rapot-symbol.svg");
const referenceMapUrl = "https://experience.arcgis.com/experience/1278bd076fc74e78be56f7ac592f75f8";
const infographicUrl = `${import.meta.env.BASE_URL}media/rapot-indicadores.svg`;

const faqItems = [
  ["¿Qué es RapOt?", "RapOt es un nuevo modelo de ciudad que integra vivienda, trabajo, cuidado, paisaje, movilidad y cultura para hacer más cercana, conectada y habitable la vida cotidiana."],
  ["¿Qué problema busca transformar?", "La distancia entre las personas y las oportunidades urbanas. RapOt propone conectar barrios, servicios, espacios públicos y actividades para reducir desigualdades y fortalecer la vida comunitaria."],
  ["¿Cómo se aplica en el territorio?", "Se aplica reconociendo lo que ya existe y articulando acciones concretas: paisaje de bienestar, memoria productiva, movilidad conectada y espacios para la vida compartida."],
  ["¿Cómo pueden participar los ciudadanos?", "Pueden compartir prioridades, recorridos, necesidades y propuestas. La opinión ciudadana ayuda a convertir el modelo en decisiones urbanas más útiles y legítimas."],
];

const indicators = [
  ["28 ha", "Territorio conectado", "Un ámbito urbano para integrar oportunidades y bienestar"],
  ["3.4 km", "Ciudad caminable", "Distancias cotidianas más cortas y accesibles"],
  ["17", "Activos urbanos", "Memorias, comunidades y espacios para activar"],
  ["8 min", "Acceso cercano", "Servicios y oportunidades al alcance de la vida diaria"],
];

const mapLayers = [
  { id: "polygon", label: "Polígono", code: "L-01", description: "Delimitación territorial para aplicar el modelo RapOt en ZIBo.", color: "amber" },
  { id: "mobility", label: "Movilidad", code: "L-02", description: "Conexiones que acercan personas, servicios y oportunidades.", color: "blue" },
  { id: "public", label: "Espacio público", code: "L-03", description: "Espacios públicos que cuidan, conectan y hacen ciudad.", color: "green" },
  { id: "activity", label: "Actividad", code: "L-04", description: "Actividades y memorias que sostienen un futuro compartido.", color: "charcoal" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapTimedOut, setMapTimedOut] = useState(false);
  const [activeLayerId, setActiveLayerId] = useState("polygon");
  const [isLayerTransitioning, setIsLayerTransitioning] = useState(false);
  const [heroLayersOpen, setHeroLayersOpen] = useState(false);
  const [arrivingSection, setArrivingSection] = useState<string | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const activeMapLayer = mapLayers.find(layer => layer.id === activeLayerId) ?? mapLayers[0];

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    revealItems.forEach(item => observer.observe(item));

    const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
    const deepPath = window.location.pathname
      .replace(basePath, "")
      .replace(/^\/+|\/+$/g, "");
    if (["proyecto", "capas", "mapa", "actualidad", "preguntas", "participa"].includes(deepPath)) {
      window.requestAnimationFrame(() => {
        document.getElementById(deepPath)?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }

    const mapTimeout = window.setTimeout(() => setMapTimedOut(true), 12000);
    return () => {
      observer.disconnect();
      window.clearTimeout(mapTimeout);
    };
  }, []);

  const goTo = (id: string) => {
    scrollToSection(id);
    setArrivingSection(id);
    setMobileOpen(false);
    window.setTimeout(() => setArrivingSection(current => current === id ? null : current), 680);
  };

  const handleFeedbackSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = Object.fromEntries(formData.entries());
    window.localStorage.setItem("rapot-feedback-draft", JSON.stringify({ ...response, savedAt: new Date().toISOString() }));
    setFeedbackSent(true);
    event.currentTarget.reset();
  };

  const selectMapLayer = (layerId: string) => {
    if (layerId === activeLayerId) return;
    setActiveLayerId(layerId);
    setIsLayerTransitioning(true);
    window.setTimeout(() => setIsLayerTransitioning(false), 420);
  };

  return (
    <div className="rapot-shell min-h-screen overflow-x-hidden bg-[#f7f5ee] text-[#1f2623]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#1d2422]/95 text-white backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button onClick={() => goTo("inicio")} className="brand-lockup group flex items-center gap-3 text-left" title="Volver al inicio">
            <img src={brandMark} alt="" className="brand-mark h-11 w-11 object-contain" />
            <span className="font-mono text-lg font-bold tracking-[0.26em]">RapOt</span>
          </button>
          <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.16em] md:flex" aria-label="Navegación principal">
            <button onClick={() => goTo("proyecto")} className="nav-link">Proyecto</button>
            <button onClick={() => goTo("capas")} className="nav-link">Capas</button>
            <button onClick={() => goTo("mapa")} className="nav-link">Mapa</button>
            <button onClick={() => goTo("actualidad")} className="nav-link">Actualidad</button>
            <button onClick={() => goTo("preguntas")} className="nav-link">FAQ</button>
            <button onClick={() => goTo("participa")} className="nav-link">Participa</button>
          </nav>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="menu-button grid h-10 w-10 place-items-center border border-white/25 md:hidden" aria-label="Abrir navegación">
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav border-t border-white/10 bg-[#1d2422] px-5 py-5 md:hidden" aria-label="Navegación móvil">
            {[['Proyecto', 'proyecto'], ['Capas', 'capas'], ['Mapa', 'mapa'], ['Actualidad', 'actualidad'], ['FAQ', 'preguntas'], ['Participa', 'participa']].map(([label, id], index) => (
              <button key={id} onClick={() => goTo(id)} className="mobile-nav-link block w-full border-b border-white/10 py-4 text-left font-mono text-xs uppercase tracking-[0.15em]" style={{ animationDelay: `${index * 55}ms` }}>
                {label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" className="hero-section relative isolate flex min-h-[780px] items-end overflow-hidden bg-[#1c2420] pt-20 text-white">
          <img src={heroImage} alt="Placeholder: imagen industrial original pendiente" className="placeholder-media hero-image absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,27,25,.92)_0%,rgba(20,27,25,.62)_35%,rgba(20,27,25,.18)_70%,rgba(20,27,25,.2)_100%)]" />
          <div className={`hero-layer-overlay absolute inset-0 ${heroLayersOpen ? "is-visible" : ""}`} aria-hidden={!heroLayersOpen}>
            <span className="hero-scanline" />
            <span className="hero-node hero-node-one"><i /><b>01 / Trabajo</b></span>
            <span className="hero-node hero-node-two"><i /><b>02 / Cuidado</b></span>
            <span className="hero-node hero-node-three"><i /><b>03 / Paisaje</b></span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#1c2420] to-transparent" />
          <div className="hero-coordinate absolute left-[6%] top-[18%] h-28 w-px bg-[#f2b84b]" />
          <div className="absolute right-[5%] top-[24%] hidden rotate-90 font-mono text-[10px] uppercase tracking-[.3em] text-white/60 lg:block">04°38' N · 74°05' O</div>
          <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-24">
            <p className="hero-kicker mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#f2b84b]"><CircleDotDashed size={15} /> RapOt / Nuevo modelo de ciudad</p>
            <div className="max-w-4xl">
              <h1 className="hero-title max-w-3xl text-balance text-[clamp(3.25rem,8vw,7.5rem)] font-extrabold leading-[.86] tracking-[-.075em]">Un nuevo modelo de ciudad para vivir, conectar y transformar.</h1>
              <p className="hero-copy mt-8 max-w-lg text-base leading-7 text-white/80 sm:text-lg">RapOt propone una ciudad más cercana, conectada y activa: un modelo que integra vivienda, trabajo, cuidado, paisaje y cultura para transformar la vida cotidiana.</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <button onClick={() => goTo("mapa")} className="primary-cta inline-flex items-center gap-3 border border-[#f2b84b] bg-[#f2b84b] px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-[.12em] text-[#1d2422]">
                  Ver mapa de referencia <ArrowDownRight size={16} />
                </button>
                <button type="button" onClick={() => setHeroLayersOpen(open => !open)} aria-expanded={heroLayersOpen} className="hero-layers-toggle inline-flex items-center gap-2 border border-white/35 px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-[.12em] text-white/85">
                  {heroLayersOpen ? "Ocultar capas" : "Explorar capas"} <Sparkles size={14} />
                </button>
              </div>
            </div>
            <div className="hero-index mt-20 grid max-w-3xl grid-cols-3 border-t border-white/25 pt-5 font-mono text-[10px] uppercase tracking-[.12em] text-white/70 sm:gap-8">
              <span>01 / Ciudad cercana</span><span>02 / Red conectada</span><span>03 / Futuro compartido</span>
            </div>
          </div>
        </section>

        <section id="proyecto" className={`section-frame border-b border-[#1f2623]/15 bg-[#f7f5ee] py-20 sm:py-28 ${arrivingSection === "proyecto" ? "is-section-arriving" : ""}`}>
          <div data-reveal className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[.66fr_1.34fr] lg:gap-24 lg:px-12">
            <div><p className="eyebrow">01 / El modelo</p><div className="mt-7 flex items-center gap-3"><span className="h-px w-12 bg-[#f2b84b]" /><span className="font-mono text-[11px] uppercase tracking-[.18em] text-[#59605b]">Modelo de ciudad</span></div></div>
            <div><h2 className="text-balance text-4xl font-extrabold leading-[.98] tracking-[-.055em] sm:text-6xl">Una ciudad cercana que conecta trabajo, cuidado y paisaje.</h2><div className="mt-10 grid gap-6 text-[15px] leading-7 text-[#58605a] sm:grid-cols-2"><p>RapOt articula barrios, actividades, espacios públicos y memorias productivas en una red urbana a escala humana. El modelo convierte las conexiones cotidianas en oportunidades de bienestar, encuentro y transformación.</p><p>La propuesta parte de lo que ya sostiene la vida de todos los días: edificios, oficios, rutas, árboles y comunidades. Sobre esa base, RapOt impulsa una ciudad más equitativa, sostenible y habitable.</p></div><button onClick={() => goTo("capas")} className="text-link mt-10 inline-flex items-center gap-2 border-b border-[#1f2623] pb-2 font-mono text-[11px] font-bold uppercase tracking-[.16em]">Conocer el modelo <ArrowUpRight size={15} /></button></div>
          </div>
        </section>

        <section className="section-frame bg-[#273631] py-16 text-[#f7f5ee] sm:py-20">
          <div data-reveal className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="mb-11 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow !text-[#f2b84b]">02 / Principios del modelo</p><h2 className="mt-4 text-3xl font-bold tracking-[-.04em] sm:text-4xl">Datos para construir una ciudad mejor.</h2></div><p className="max-w-xs font-mono text-[10px] uppercase leading-5 tracking-[.13em] text-white/55">Indicadores que orientan las decisiones del nuevo modelo de ciudad</p></div><div className="grid divide-y divide-white/15 border-y border-white/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{indicators.map(([value, label, detail], index) => <article data-reveal key={label} className="data-cell p-6 sm:p-7" style={{ transitionDelay: `${index * 65}ms` }}><p className="font-mono text-4xl font-bold tracking-[-.07em] text-[#f2b84b]">{value}</p><h3 className="mt-7 text-sm font-bold uppercase tracking-[.12em]">{label}</h3><p className="mt-3 max-w-44 text-sm leading-5 text-white/60">{detail}</p></article>)}</div></div>
        </section>

        <section id="capas" className={`section-frame bg-[#eee9dc] py-20 sm:py-28 ${arrivingSection === "capas" ? "is-section-arriving" : ""}`}>
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div data-reveal className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-24"><div><p className="eyebrow">03 / Componentes del modelo</p><h2 className="mt-5 text-4xl font-extrabold leading-[.93] tracking-[-.06em] sm:text-6xl">Una ciudad que funciona para todos.</h2></div><p className="max-w-xl self-end text-base leading-7 text-[#59605b]">RapOt integra componentes complementarios para que la ciudad funcione mejor: paisaje, memoria, movilidad y vida de barrio. Cada decisión fortalece las demás.</p></div>
            <div className="mt-14 grid gap-5 lg:grid-cols-12">
              <article data-reveal className="layer-card layer-green relative overflow-hidden bg-[#c3d2c0] p-7 lg:col-span-7 lg:min-h-[450px] lg:p-10"><div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_16%,rgba(247,245,238,.65),transparent_32%)]" /><div className="layer-scale">L-01 / 250 m</div><div className="relative flex h-full flex-col justify-between"><Trees size={36} strokeWidth={1.5} /><div><p className="font-mono text-[11px] font-bold uppercase tracking-[.16em] text-[#305440]">01 / Paisaje y bienestar</p><h3 className="mt-4 max-w-md text-4xl font-extrabold leading-[.92] tracking-[-.05em] sm:text-5xl">Una ciudad cercana empieza con un paisaje que cuida la vida cotidiana.</h3><p className="mt-5 max-w-sm text-[15px] leading-6 text-[#35563e]">Parques, árboles, drenajes vivos y espacios de encuentro hacen posible una ciudad más saludable y resiliente.</p></div></div></article>
              <article data-reveal className="layer-card layer-amber overflow-hidden bg-[#1e2825] text-[#f7f5ee] lg:col-span-5"><img src={heritageImage} alt="Placeholder: imagen de patrimonio industrial pendiente" className="placeholder-media card-image h-56 w-full object-cover mix-blend-screen opacity-75 lg:h-64" /><div className="relative p-7 lg:p-9"><div className="layer-scale !text-[#f2b84b]">NODO / 02</div><Factory size={29} strokeWidth={1.5} className="text-[#f2b84b]" /><p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[.16em] text-[#f2b84b]">02 / Memoria y oportunidad</p><h3 className="mt-4 text-3xl font-bold leading-[.98] tracking-[-.05em]">La memoria productiva se convierte en oportunidad para el futuro.</h3><p className="mt-4 text-sm leading-6 text-white/65">RapOt recupera el patrimonio industrial como infraestructura cultural, económica y comunitaria.</p></div></article>
              <article data-reveal className="layer-card layer-blue relative overflow-hidden bg-[#a6bdc0] p-7 lg:col-span-5 lg:min-h-[385px] lg:p-9"><div className="layer-scale">RUTA / 03</div><Route size={31} strokeWidth={1.5} className="relative z-10" /><div className="route-orbit absolute -right-8 bottom-0 h-64 w-64 rounded-full border-[34px] border-[#e6d26b]/70" /><div className="relative z-10 mt-28"><p className="font-mono text-[11px] font-bold uppercase tracking-[.16em] text-[#174d58]">03 / Movilidad y conexión</p><h3 className="mt-4 text-3xl font-bold leading-[.98] tracking-[-.05em]">Moverse mejor también es vivir mejor la ciudad.</h3><p className="mt-4 max-w-sm text-sm leading-6 text-[#285761]">La caminata, la bicicleta y el transporte conectado unen oportunidades y reducen las distancias cotidianas.</p></div></article>
              <article data-reveal className="layer-card layer-community group relative min-h-[385px] overflow-hidden lg:col-span-7"><img src={corridorImage} alt="Placeholder: imagen de corredor verde pendiente" className="placeholder-media card-image absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#14211d]/85 via-[#14211d]/12 to-transparent" /><div className="layer-scale !text-white/70">TRAMA / 04</div><div className="relative flex h-full flex-col justify-end p-7 text-white lg:p-10"><Building2 size={30} strokeWidth={1.5} className="mb-auto text-[#f2b84b]" /><p className="font-mono text-[11px] font-bold uppercase tracking-[.16em] text-[#f2b84b]">04 / Vida compartida</p><h3 className="mt-4 max-w-md text-3xl font-bold leading-[.98] tracking-[-.05em] sm:text-4xl">Más servicios cercanos, más bienestar y más ciudad en común.</h3></div></article>
            </div>
          </div>
        </section>

        <section id="mapa" className={`section-frame bg-[#f7f5ee] pt-20 sm:pt-28 ${arrivingSection === "mapa" ? "is-section-arriving" : ""}`}>
          <div data-reveal className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-14 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-24 lg:px-12"><div><p className="eyebrow">04 / Implementación territorial</p><h2 className="mt-5 text-4xl font-extrabold leading-[.93] tracking-[-.06em] sm:text-6xl">RapOt en el territorio.</h2></div><div className="self-end"><p className="max-w-lg text-base leading-7 text-[#59605b]">Este visor muestra una referencia territorial para aplicar el modelo RapOt en la Actuación Estratégica ZIBo. Su centroide verificado es <strong>4.622506° N, 74.095930° O</strong>, entre las calles 6 y 26, y entre la avenida NQS y la carrera 50.</p><a href={referenceMapUrl} target="_blank" rel="noreferrer" className="text-link mt-7 inline-flex items-center gap-2 border-b border-[#1f2623] pb-2 font-mono text-[11px] font-bold uppercase tracking-[.16em]">Abrir visor oficial ZIBo <ArrowUpRight size={15} /></a></div></div>
          <div data-reveal className="map-reference-shell relative border-y border-[#1f2623]/20 bg-white">
            <div className="map-rail flex flex-wrap items-center justify-between gap-4 border-b border-[#1f2623]/20 bg-[#e9e4d8] px-5 py-3 font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#59605b] sm:px-8"><span className="flex items-center gap-2"><i className="map-node" /> ZIBo / Polígono oficial</span><span>Centroide 4.622506° N · 74.095930° O</span><span className="hidden sm:block">Ref. ARC-1278</span></div>
            <div className="map-layer-switcher absolute left-5 top-[53px] z-20 max-w-[calc(100%-2.5rem)] border border-[#1f2623]/20 bg-[#f7f5ee]/95 p-2 shadow-[0_12px_26px_rgba(31,38,35,.14)] backdrop-blur-sm sm:left-7 sm:top-[57px]" role="group" aria-label="Componentes del modelo RapOt">
              <div className="flex items-center gap-2 px-2 pb-2 pt-1 font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#59605b]"><Sparkles size={12} className="text-[#b78417]" /> Componentes de RapOt</div>
              <div className="flex flex-wrap gap-1">{mapLayers.map(layer => <button key={layer.id} type="button" onClick={() => selectMapLayer(layer.id)} aria-pressed={activeLayerId === layer.id} className={`map-layer-button ${activeLayerId === layer.id ? `is-active is-${layer.color}` : ""}`}><span>{layer.code}</span>{layer.label}</button>)}</div>
            </div>
            <div className={`map-loader absolute inset-0 z-10 grid place-items-center bg-[#f7f5ee] ${mapLoaded || mapTimedOut ? "is-loaded" : ""}`} aria-live="polite"><div className="text-center"><span className="loading-bars mx-auto mb-5 flex gap-1.5"><i /><i /><i /></span><p className="font-mono text-[10px] uppercase tracking-[.17em] text-[#59605b]">Cargando el visor oficial ZIBo</p></div></div>
            <iframe title="Mapa interactivo de la experiencia de referencia" src={referenceMapUrl} onLoad={() => { setMapLoaded(true); setMapTimedOut(false); }} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="block h-[90vh] min-h-[620px] w-full border-0 outline-none" allowFullScreen />
            {mapTimedOut && !mapLoaded && <div className="map-timeout-card absolute inset-x-5 top-24 z-10 max-w-md border border-[#0a4d88]/30 bg-[#f8fbff]/95 p-5 shadow-[0_14px_32px_rgba(7,27,49,.14)] backdrop-blur-sm sm:left-8"><p className="font-mono text-[9px] font-bold uppercase tracking-[.15em] text-[#0a4d88]">Carga externa demorada</p><p className="mt-3 text-sm leading-6 text-[#4c6378]">La experiencia ArcGIS no terminó de inicializarse aquí. Puedes abrirla directamente para conservar todas sus herramientas.</p><a href={referenceMapUrl} target="_blank" rel="noreferrer" className="text-link mt-4 inline-flex items-center gap-2 border-b border-[#0a4d88] pb-2 font-mono text-[10px] font-bold uppercase tracking-[.14em]">Abrir experiencia oficial <ArrowUpRight size={14} /></a></div>}
            <div className={`map-layer-wash layer-${activeMapLayer.color} ${isLayerTransitioning ? "is-active" : ""}`} aria-hidden="true" />
            <div className={`map-focus-card pointer-events-none absolute bottom-5 left-5 z-10 hidden border border-[#1f2623]/25 bg-[#f7f5ee]/90 px-4 py-3 font-mono text-[9px] uppercase leading-5 tracking-[.13em] text-[#273631] backdrop-blur-sm sm:block ${isLayerTransitioning ? "is-transitioning" : ""}`}><span className="block text-[#9a721a]">{activeMapLayer.code} / {activeMapLayer.label}</span><span className="mt-1 block max-w-[230px] normal-case tracking-normal text-[#59605b]">{activeMapLayer.description}</span></div>
            <div className="pointer-events-none absolute bottom-5 right-5 z-10 bg-[#1d2422] px-3 py-2 font-mono text-[9px] uppercase tracking-[.13em] text-white/80">WGS84 / ZIBo Bogotá</div>
          </div>
        </section>

        <section id="actualidad" className={`section-frame relative overflow-hidden bg-[#e9e4d8] py-20 sm:py-24 ${arrivingSection === "actualidad" ? "is-section-arriving" : ""}`}><div className="absolute inset-y-0 left-0 w-3 bg-[#f2b84b] sm:w-6" /><div className="absolute right-[9%] top-0 hidden h-full w-px bg-[#1f2623]/15 lg:block" /><div className="notice-node absolute right-[9%] top-16 hidden h-3 w-3 translate-x-[5px] rounded-full bg-[#f2b84b] lg:block" /><div data-reveal className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="mb-8 flex items-center gap-3 border-b border-[#1f2623]/25 pb-3 font-mono text-[10px] font-bold uppercase tracking-[.16em]"><span className="pulse-dot inline-block h-2 w-2 rounded-full bg-[#f2b84b]" /> RapOt / construcción colectiva en curso</div><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24"><div><p className="eyebrow">05 / Construcción colectiva</p><h2 className="mt-5 text-4xl font-extrabold leading-[.93] tracking-[-.06em] sm:text-6xl">El modelo se construye con la comunidad.</h2></div><div className="space-y-0 border-t border-[#1f2623]/35"><article className="notice-row group grid gap-4 border-b border-[#1f2623]/35 py-6 sm:grid-cols-[100px_1fr_auto] sm:items-center"><p className="font-mono text-[11px] font-bold uppercase tracking-[.14em] text-[#9a721a]">02.08.26</p><div><p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#644b15]">Recorrido</p><h3 className="mt-1 text-xl font-bold tracking-[-.04em]">Recorrer el territorio para decidir mejor</h3></div><button aria-label="Ver recorrido" className="notice-button hidden h-9 w-9 place-items-center border border-[#1f2623]/50 sm:grid"><ChevronRight size={18} /></button></article><article className="notice-row group grid gap-4 border-b border-[#1f2623]/35 py-6 sm:grid-cols-[100px_1fr_auto] sm:items-center"><p className="font-mono text-[11px] font-bold uppercase tracking-[.14em] text-[#9a721a]">18.07.26</p><div><p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#644b15]">Taller abierto</p><h3 className="mt-1 text-xl font-bold tracking-[-.04em]">Diseñar juntos una red urbana cercana</h3></div><button aria-label="Ver taller" className="notice-button hidden h-9 w-9 place-items-center border border-[#1f2623]/50 sm:grid"><ChevronRight size={18} /></button></article></div></div></div>        </section>

        <section id="preguntas" className={`section-frame bg-[#f8fbff] py-20 sm:py-28 ${arrivingSection === "preguntas" ? "is-section-arriving" : ""}`}>
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div data-reveal className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
              <div><p className="eyebrow">06 / Preguntas frecuentes</p><h2 className="mt-5 text-4xl font-extrabold leading-[.93] tracking-[-.06em] sm:text-6xl">Entender RapOt es el primer paso para construirlo.</h2></div>
              <div className="space-y-3">{faqItems.map(([question, answer]) => <details key={question} className="faq-item group border-y border-[#0a4d88]/20"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold text-[#102337] [&::-webkit-details-marker]:hidden"><span>{question}</span><span className="faq-plus text-2xl font-normal text-[#2679c6] transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-6 text-[15px] leading-7 text-[#4c6378]">{answer}</p></details>)}</div>
            </div>
          </div>
        </section>

        <section id="participa" className={`section-frame bg-[#0c3358] py-20 text-white sm:py-28 ${arrivingSection === "participa" ? "is-section-arriving" : ""}`}>
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div data-reveal className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
              <div><p className="eyebrow !text-[#8ec7ef]">07 / Participa</p><h2 className="mt-5 text-4xl font-extrabold leading-[.93] tracking-[-.06em] sm:text-6xl">El nuevo modelo de ciudad también se diseña contigo.</h2><p className="mt-7 max-w-md text-base leading-7 text-[#c3ddec]">Cuéntanos qué necesita tu barrio para ser más cercano, conectado y habitable. Tu respuesta se guarda en este dispositivo como borrador; para recibir respuestas de varios ciudadanos conectaremos después un servicio de formularios.</p><a href={infographicUrl} download="rapot-indicadores-urbanos.svg" className="mt-8 inline-flex items-center gap-3 border border-[#8ec7ef] px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-[.12em] text-[#f4fbff] transition-colors hover:bg-[#2679c6]"><Download size={16} /> Descargar indicadores</a></div>
              <form onSubmit={handleFeedbackSubmit} className="rounded-none border border-[#8ec7ef]/35 bg-[#071b31]/45 p-6 sm:p-8" aria-label="Formulario de opinión sobre RapOt">
                <div className="grid gap-6"><div><label htmlFor="citizen-name" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#8ec7ef]">Nombre o colectivo</label><input id="citizen-name" name="name" required className="w-full border border-[#8ec7ef]/40 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#8ec7ef]" placeholder="Cómo quieres identificarte" /></div><div><label htmlFor="citizen-priority" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#8ec7ef]">¿Qué debería priorizar RapOt?</label><select id="citizen-priority" name="priority" required defaultValue="" className="w-full border border-[#8ec7ef]/40 bg-[#071b31] px-4 py-3 text-sm text-white outline-none focus:border-[#8ec7ef]"><option value="" disabled>Selecciona una prioridad</option><option>Más espacios verdes</option><option>Movilidad y seguridad vial</option><option>Vivienda y servicios cercanos</option><option>Activación de patrimonio y empleo</option><option>Participación comunitaria</option></select></div><div><label htmlFor="citizen-proposal" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#8ec7ef]">Tu propuesta</label><textarea id="citizen-proposal" name="proposal" required rows={5} className="w-full resize-y border border-[#8ec7ef]/40 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#8ec7ef]" placeholder="Describe una idea, necesidad o recorrido del territorio" /></div><button type="submit" className="inline-flex w-fit items-center gap-3 bg-[#58a8e5] px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-[.12em] text-[#071b31] transition-colors hover:bg-[#8ec7ef]"><CheckCircle2 size={16} /> Guardar opinión</button>{feedbackSent && <p role="status" className="font-mono text-xs leading-5 text-[#bfe1fa]">Tu opinión quedó guardada como borrador en este dispositivo.</p>}</div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer bg-[#1d2422] py-10 text-white"><div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-12"><div className="flex items-center gap-3"><img src={brandMark} alt="" className="brand-mark h-12 w-12 object-contain" /><div><p className="font-mono text-lg font-bold tracking-[.22em]">RapOt</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[.14em] text-white/70">Nuevo modelo de ciudad / propuesta inicial</p></div></div><p className="max-w-sm font-mono text-[9px] uppercase leading-5 tracking-[.12em] text-white/70">RapOt es una propuesta para transformar los vínculos entre territorio, comunidad y ciudad.</p></div></footer>
    </div>
  );
}
