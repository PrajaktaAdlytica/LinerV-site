import { useEffect, useMemo, useRef, useState } from "react";

const products = [
  {
    slug: "board",
    name: "LinerV Board",
    eyebrow: "Live operating picture",
    summary:
      "A shared board for line issues, downtime, quality signals, throughput, and owners.",
    stat: "12%",
    statLabel: "less unplanned target loss",
    flow: ["Shift", "Quality", "Throughput"],
    headline: "Run every line from one live operating board.",
    detail:
      "LinerV Board gives shift leads and plant managers one shared view of line status, stop reasons, quality holds, throughput gaps, and the next action owner.",
    features: [
      "Live shift timeline with downtime, quality, and throughput events",
      "Issue ownership with escalation paths for leads and managers",
      "Line-level signal merge across notes, dashboards, and logs",
      "Segment-aware views for food, automotive, machinery, and more",
    ],
    useCases: ["Morning production review", "Tier meetings", "Line escalation", "Daily loss review"],
    screenshotTitle: "Live board",
    screenshotMetric: "74%",
    screenshotLabel: "current OEE",
  },
  {
    slug: "shift",
    name: "LinerV Shift",
    eyebrow: "Structured handoff",
    summary:
      "Shift notes become searchable, accountable handoffs instead of lost context.",
    stat: "3 shifts",
    statLabel: "one shared operating picture",
    flow: ["Notes", "Risks", "Next action"],
    headline: "Turn messy shift notes into reliable handoffs.",
    detail:
      "LinerV Shift captures what changed, what is blocked, and what must happen next so each crew starts with context instead of guesswork.",
    features: [
      "Structured handoff templates by line, cell, product, or segment",
      "Risk flags for quality holds, late materials, maintenance, and staffing",
      "Searchable notes linked to downtime and throughput events",
      "Shift summary views for supervisors and plant managers",
    ],
    useCases: ["Shift turnover", "Supervisor review", "Action follow-up", "Audit-ready context"],
    screenshotTitle: "Shift handoff",
    screenshotMetric: "3",
    screenshotLabel: "crews aligned",
  },
  {
    slug: "bottleneck",
    name: "LinerV Bottleneck",
    eyebrow: "Constraint detection",
    summary:
      "Find the station, material, tool, or handoff slowing tomorrow before it cascades.",
    stat: "8 min",
    statLabel: "from signal to routed action",
    flow: ["Signal", "Constraint", "Owner"],
    headline: "Find the bottleneck before it owns the shift.",
    detail:
      "LinerV Bottleneck compares throughput, stop patterns, quality issues, and shift context to surface the constraint that deserves attention first.",
    features: [
      "Constraint queue ranked by production impact and urgency",
      "Amber risk nodes for emerging bottlenecks before they become downtime",
      "Route-to-owner workflow for maintenance, quality, production, or planning",
      "Pattern memory across lines, products, shifts, and segments",
    ],
    useCases: ["Bottleneck review", "Maintenance prioritization", "Capacity recovery", "Throughput planning"],
    screenshotTitle: "Constraint queue",
    screenshotMetric: "8m",
    screenshotLabel: "signal to owner",
  },
];

const segments = [
  ["Food", "Batch changes, cleaning windows, and line-side quality checks.", "/assets/segments/food.jpg"],
  ["Automotive", "Cycle-time drift, supplier misses, and station-level escalations.", "/assets/segments/automotive.jpg"],
  ["Metal products", "Tooling constraints, rework loops, and utilization gaps.", "/assets/segments/metal-products.jpg"],
  ["Rubber / plastics", "Material changeovers, scrap spikes, and mold issues.", "/assets/segments/rubber-plastics.jpg"],
  ["Electrical equipment", "Assembly defects, test failures, and missing components.", "/assets/segments/electrical-equipment.jpg"],
  ["Chemicals", "Process deviations, safety notes, and batch documentation.", "/assets/segments/chemicals.jpg"],
  ["Furniture", "Work-cell handoffs, custom orders, and throughput variance.", "/assets/segments/furniture.jpg"],
  ["Machinery", "Long-cycle builds, inspection blockers, and late part discovery.", "/assets/segments/machinery.jpg"],
];

const blockers = [
  ["Shift notes", "What changed on the line", "Stays in handoff notes", "Linked to the exact line, shift, issue, and owner."],
  ["Downtime", "Why the stop happened", "Gets categorized after damage is done", "Turns each stop into a live reason code and action."],
  ["Quality", "What is blocked or at risk", "Lives outside line performance", "Connects holds, defects, and throughput impact."],
  ["Throughput", "Where capacity is leaking", "Shows up too late", "Ranks the constraint before it becomes the shift story."],
];

const customerLogos = [
  ["Bosch", "https://cdn.simpleicons.org/bosch/08231C"],
  ["Siemens", "https://cdn.simpleicons.org/siemens/08231C"],
  ["ABB", "https://cdn.simpleicons.org/abb/08231C"],
  ["Toyota", "https://cdn.simpleicons.org/toyota/08231C"],
  ["Schneider Electric", "https://cdn.simpleicons.org/schneiderelectric/08231C"],
  ["General Electric", "https://cdn.simpleicons.org/generalelectric/08231C"],
  ["Honda", "https://cdn.simpleicons.org/honda/08231C"],
  ["Caterpillar", "https://cdn.simpleicons.org/caterpillar/08231C"],
];

const integrations = ["MES", "ERP", "CMMS", "OEE", "OPC UA", "Teams", "CSV/API", "SCADA"];

const integrationRows = [
  ["MES / ERP", "Orders, recipes, production plan", "Which shift issue is blocking the plan now"],
  ["OEE / SCADA", "Stops, speed loss, machine state", "Why it happened and who owns recovery"],
  ["CMMS / Teams", "Maintenance work and conversations", "One action thread tied to the line timeline"],
];

const workflowSteps = [
  ["Connect signals", "Pull notes, stop events, quality holds, and output data into one live line timeline."],
  ["Structure handoffs", "Turn shift knowledge into reusable context with owners, risk flags, and next actions."],
  ["Detect bottlenecks", "Compare signals across systems to rank the line, station, or material constraint."],
  ["Route action", "Send the right issue to production, quality, maintenance, or planning before the next review."],
];

const testimonials = [
  [
    "LinerV made our morning review feel current instead of historical. We can see the stop, the note, and the owner in one place.",
    "Marta Kowalska",
    "Plant Operations Lead, Poznan",
  ],
  [
    "The handover flow is the first tool our shift leads actually wanted open during turnover.",
    "Jakub Nowak",
    "Production Supervisor, Wroclaw",
  ],
  [
    "Bottleneck reviews became much less political once every signal was tied back to the same timeline.",
    "Elena Varga",
    "Continuous Improvement Manager",
  ],
];

const pricingPlans = [
  ["Line Cell", "For one focused line team", "Demo-led", ["1-3 lines", "Shift handover", "Live board", "Email support"]],
  ["Plant", "For multi-line factories", "Custom", ["Unlimited shifts", "Bottleneck queue", "MES/CMMS connectors", "Plant review workspace"]],
  ["Enterprise", "For groups and EU networks", "Custom", ["Multi-site rollup", "Security review", "Data residency planning", "Success workshops"]],
];

const navMenus = [
  {
    label: "Platform",
    items: [
      ["LinerV Board", "board", "Live operating board"],
      ["LinerV Shift", "shift", "Structured handovers"],
      ["LinerV Bottleneck", "bottleneck", "Constraint detection"],
    ],
  },
  {
    label: "Solutions",
    items: [
      ["Plant managers", "segments", "Earlier loss visibility"],
      ["Shift leads", "segments", "Cleaner turnover"],
      ["Process engineers", "dashboard", "Root-cause context"],
    ],
  },
  {
    label: "Resources",
    items: [
      ["Customer proof", "proof", "Manufacturing credibility"],
      ["Pricing", "pricing", "Demo-led packaging"],
      ["About LinerV", "about", "EU factory focus"],
    ],
  },
  {
    label: "Library",
    items: [
      ["Dashboard", "dashboard", "Live plant command view"],
      ["Operator trust", "proof", "Manufacturing proof points"],
      ["Start demo", "demo", "Map one line first"],
    ],
  },
];

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash.replace("#", "") || "top");

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash.replace("#", "") || "top");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return hash;
}

function useLiquidGlass() {
  useEffect(() => {
    let cancelled = false;
    const instances = [];

    const applyGlass = () => {
      if (cancelled || !window.liquidGlass) return;
      document.querySelectorAll("[data-glass]").forEach((node) => {
        if (node.dataset.glassReady) return;
        node.dataset.glassReady = "true";
        instances.push(
          window.liquidGlass(node, {
            scale: Number(node.dataset.glassScale || -76),
            chroma: 4,
            blur: 3,
            saturate: 1.35,
            fallbackBlur: 18,
          }),
        );
      });
    };

    let observer;

    if (window.liquidGlass) {
      applyGlass();
    } else {
      const script = document.createElement("script");
      script.src = "/vendor/liquid-glass.js";
      script.async = true;
      script.onload = applyGlass;
      document.head.appendChild(script);
    }

    observer = new MutationObserver(() => window.requestAnimationFrame(applyGlass));
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      observer?.disconnect();
      instances.forEach((instance) => instance.destroy?.());
    };
  }, []);
}

function useGsapScrollMotion() {
  useEffect(() => {
    let cleanup = () => {};

    async function boot() {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      try {
        const gsapModule = await import(
          /* @vite-ignore */ "https://cdn.jsdelivr.net/npm/gsap@3.13.0/index.js"
        );
        const scrollModule = await import(
          /* @vite-ignore */ "https://cdn.jsdelivr.net/npm/gsap@3.13.0/ScrollTrigger.js"
        );
        const gsap = gsapModule.gsap || gsapModule.default || gsapModule;
        const ScrollTrigger = scrollModule.ScrollTrigger || scrollModule.default;
        gsap.registerPlugin(ScrollTrigger);

        const reveals = gsap.utils.toArray("[data-reveal]");
        reveals.forEach((node) => {
          gsap.fromTo(
            node,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.72,
              ease: "power3.out",
              scrollTrigger: { trigger: node, start: "top 84%" },
            },
          );
        });

        gsap.to("[data-parallax='hero-visual']", {
          yPercent: -7,
          rotate: 0.5,
          ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
        });

        cleanup = () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
          gsap.killTweensOf("*");
        };
      } catch {
        const observer = new IntersectionObserver(
          (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
          { threshold: 0.18 },
        );
        document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
        cleanup = () => observer.disconnect();
      }
    }

    boot();
    return () => cleanup();
  }, []);
}

function FactoryScene() {
  const mountRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let renderer;
    let animationId;
    let disposed = false;

    async function boot() {
      try {
        const THREE = await import(
          /* @vite-ignore */ "https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.module.js"
        );

        if (!mountRef.current || disposed) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#f8faf6");

        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(5.8, 5.2, 7.8);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        mountRef.current.appendChild(renderer.domElement);

        const resize = () => {
          if (!mountRef.current || !renderer) return;
          const { clientWidth, clientHeight } = mountRef.current;
          renderer.setSize(clientWidth, clientHeight, false);
          camera.aspect = clientWidth / Math.max(clientHeight, 1);
          camera.updateProjectionMatrix();
        };
        resize();
        window.addEventListener("resize", resize);

        const group = new THREE.Group();
        scene.add(group);

        const ambient = new THREE.HemisphereLight("#ffffff", "#dce6df", 2.8);
        scene.add(ambient);

        const key = new THREE.DirectionalLight("#ffffff", 2.2);
        key.position.set(6, 8, 5);
        key.castShadow = true;
        scene.add(key);

        const baseMaterial = new THREE.MeshStandardMaterial({
          color: "#ffffff",
          roughness: 0.72,
          metalness: 0.04,
        });
        const darkMaterial = new THREE.MeshStandardMaterial({
          color: "#0a3328",
          roughness: 0.62,
        });
        const signalMaterial = new THREE.MeshStandardMaterial({
          color: "#c8f06a",
          emissive: "#6f9f1d",
          emissiveIntensity: 0.22,
        });
        const amberMaterial = new THREE.MeshStandardMaterial({
          color: "#ffb547",
          emissive: "#ff9f1c",
          emissiveIntensity: 0.3,
        });
        const alertMaterial = new THREE.MeshStandardMaterial({
          color: "#ffffff",
          roughness: 0.48,
        });

        const floor = new THREE.Mesh(
          new THREE.BoxGeometry(7.6, 0.18, 4.8),
          new THREE.MeshStandardMaterial({ color: "#eef4ef", roughness: 0.88 }),
        );
        floor.position.y = -0.14;
        floor.receiveShadow = true;
        group.add(floor);

        const stationPositions = [
          [-2.7, 0.16, -1.2],
          [-0.65, 0.16, 1.05],
          [1.55, 0.16, -1.0],
          [2.7, 0.16, 1.08],
        ];

        stationPositions.forEach(([x, y, z], index) => {
          const station = new THREE.Group();
          station.position.set(x, y, z);

          const body = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.55, 0.82), baseMaterial);
          body.castShadow = true;
          station.add(body);

          const display = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.08, 0.1), signalMaterial);
          display.position.set(0.08, 0.18, -0.43);
          station.add(display);

          const cap = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.09, 0.68), darkMaterial);
          cap.position.y = 0.32;
          station.add(cap);

          if (index === 2) {
            const warning = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 24), amberMaterial);
            warning.position.set(0.43, 0.58, 0.35);
            station.add(warning);
          }

          group.add(station);
        });

        const routePoints = [
          new THREE.Vector3(-3.2, 0.18, -1.2),
          new THREE.Vector3(-1.6, 0.18, -0.3),
          new THREE.Vector3(-0.2, 0.18, 0.24),
          new THREE.Vector3(0.65, 0.18, 0.05),
          new THREE.Vector3(2.2, 0.18, -0.9),
          new THREE.Vector3(3.1, 0.18, 1.05),
        ];
        const curve = new THREE.CatmullRomCurve3(routePoints);
        const route = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 96, 0.035, 10, false),
          signalMaterial,
        );
        group.add(route);

        const pulses = [0, 0.28, 0.56].map((offset) => {
          const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.115, 24, 24), signalMaterial);
          pulse.userData.offset = offset;
          group.add(pulse);
          return pulse;
        });

        const bottleneck = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), amberMaterial);
        bottleneck.position.set(0.65, 0.46, 0.05);
        bottleneck.castShadow = true;
        group.add(bottleneck);

        const alertPositions = [
          [-2.9, 1.02, -1.85, "#c8f06a"],
          [0.2, 1.26, 1.45, "#ffb547"],
          [2.8, 1.06, 0.34, "#e85757"],
        ];

        alertPositions.forEach(([x, y, z, color]) => {
          const card = new THREE.Group();
          card.position.set(x, y, z);
          const pane = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.42, 0.055), alertMaterial);
          pane.castShadow = true;
          card.add(pane);
          const dot = new THREE.Mesh(
            new THREE.SphereGeometry(0.06, 16, 16),
            new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.15 }),
          );
          dot.position.set(-0.38, 0.03, -0.045);
          card.add(dot);
          group.add(card);
        });

        group.rotation.y = -0.3;

        const start = performance.now();
        const animate = () => {
          const time = (performance.now() - start) / 1000;
          group.rotation.y = -0.3 + Math.sin(time * 0.45) * 0.05;
          bottleneck.scale.setScalar(1 + Math.sin(time * 3.2) * 0.1);

          pulses.forEach((pulse) => {
            const t = (time * 0.14 + pulse.userData.offset) % 1;
            pulse.position.copy(curve.getPointAt(t));
            pulse.position.y += 0.16;
          });

          renderer.render(scene, camera);
          animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
          window.removeEventListener("resize", resize);
        };
      } catch {
        setFallback(true);
      }
    }

    const cleanupPromise = boot();

    return () => {
      disposed = true;
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
      cleanupPromise.then((cleanup) => cleanup?.());
    };
  }, []);

  return (
    <div className="factory-scene" ref={mountRef} aria-label="Animated factory signal route">
      <div className={`scene-fallback ${fallback ? "is-visible" : ""}`}>
        <div className="floor-card">
          <span className="mini-station station-a" />
          <span className="mini-station station-b" />
          <span className="mini-station station-c" />
          <span className="route-line" />
          <span className="bottleneck-node" />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const jump = (id) => {
    setOpen(false);
    const node = document.getElementById(id);
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.hash = id;
  };

  return (
    <header className={`site-nav ${scrolled ? "is-compact" : ""}`} data-glass data-glass-scale="-54">
      <a className="brand-link" href="#top" aria-label="LinerV home" onClick={() => setOpen(false)}>
        <img src="/brand/linerv-mark.svg" alt="" />
        <span>LinerV</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary">
        {navMenus.map((menu) => (
          <div className="nav-group" key={menu.label}>
            <button type="button">{menu.label}</button>
            <div className="nav-dropdown" data-glass>
              {menu.items.map(([label, id, description]) => (
                <button key={label} type="button" onClick={() => jump(id)}>
                  <strong>{label}</strong>
                  <span>{description}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        <button onClick={() => jump("pricing")}>Pricing</button>
      </nav>
      <button className="nav-menu" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        Menu
      </button>
      <div className="nav-actions">
        <button className="nav-signin" onClick={() => jump("signin")}>Sign in</button>
        <button className="nav-cta" onClick={() => jump("demo")}>Book a demo</button>
      </div>
      {open && (
        <div className="mobile-nav" data-glass>
          {["platform", "segments", "pricing", "proof", "signin", "demo"].map((id) => (
            <button key={id} onClick={() => jump(id)}>
              {id === "proof" ? "Resources" : id[0].toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function SignalTimeline({ activeProduct }) {
  const flow = products[activeProduct].flow;

  return (
    <div className="signal-timeline" aria-label={`${products[activeProduct].name} signal flow`}>
      {flow.map((item, index) => (
        <div className="timeline-step" key={item}>
          <span className={index === 1 ? "step-node is-active" : "step-node"} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function DashboardPreview() {
  const lineRows = [
    ["Line 04", "Material wait", "612/hr", "548/hr", "18m", "M. Kowalska", "amber"],
    ["Line 02", "Quality hold", "480/hr", "421/hr", "11m", "J. Nowak", "red"],
    ["Line 07", "Running", "720/hr", "706/hr", "96%", "A. Zielinski", "green"],
    ["Line 01", "Tool change", "390/hr", "366/hr", "7m", "E. Varga", "amber"],
  ];
  const events = ["06:12 filler stop", "06:28 quality hold", "06:41 shift note", "07:05 owner routed"];

  return (
    <div className="dashboard-preview real-dashboard" data-glass>
      <div className="dash-topbar">
        <span />
        <span />
        <span />
        <strong>LinerV plant command</strong>
      </div>
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          {["Plant 01", "Lines", "Shifts", "Quality", "Actions"].map((item, index) => (
            <span className={index === 1 ? "is-active" : ""} key={item}>{item}</span>
          ))}
        </aside>
        <div className="dashboard-workspace">
          <div className="dashboard-toolbar">
            <div>
              <small>Current bottleneck</small>
              <strong>Packaging cell 3</strong>
            </div>
            <div className="toolbar-filters">
              <span>Shift B</span>
              <span>Last 4h</span>
              <span>Warsaw plant</span>
            </div>
          </div>
          <div className="metric-row">
            {[
              ["OEE", "74%", "target 82%"],
              ["Open actions", "18", "7 critical"],
              ["Throughput gap", "-9.4%", "vs plan"],
            ].map(([label, value, note]) => (
              <div className="dash-card" key={label}>
                <small>{label}</small>
                <strong>{value}</strong>
                <em>{note}</em>
              </div>
            ))}
          </div>
          <div className="dashboard-main-grid">
            <div className="line-table">
              <div className="line-table-head">
                <span>Line</span>
                <span>State</span>
                <span>Target</span>
                <span>Actual</span>
                <span>Loss</span>
                <span>Owner</span>
              </div>
              {lineRows.map(([line, state, target, actual, loss, owner, tone]) => (
                <div className="line-table-row" key={line}>
                  <strong>{line}</strong>
                  <span><i className={`status-dot ${tone}`} />{state}</span>
                  <span>{target}</span>
                  <span>{actual}</span>
                  <em>{loss}</em>
                  <span>{owner}</span>
                </div>
              ))}
            </div>
            <div className="event-panel">
              <small>Shift event timeline</small>
              {events.map((event, index) => (
                <div className="event-row" key={event}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{event}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustedBy() {
  return (
    <section className="proof-strip" id="proof" data-reveal>
      <div className="container">
        <div className="proof-heading">
          <p>Designed for manufacturing teams already running serious systems</p>
          <span>MES, ERP, OEE, CMMS, and frontline shift reality in one layer.</span>
        </div>
        <div className="logo-marquee" aria-label="Representative manufacturing companies">
          <div className="marquee-track">
            {customerLogos.map(([name, logo]) => (
              <a className="logo-mark" href="#proof" aria-label={name} key={name}>
                <img src={logo} alt="" loading="lazy" />
                <span>{name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection() {
  return (
    <section className="integrations-section" data-reveal>
      <div className="container integrations-grid">
        <div>
          <p className="eyebrow">Integration friendly</p>
          <h2>LinerV does not replace your factory systems. It explains what they mean together.</h2>
          <p>
            MES, ERP, OEE, CMMS, SCADA, and Teams already hold pieces of the line story.
            LinerV adds the missing layer: the reason, owner, and next action that connect those pieces.
          </p>
        </div>
        <div className="integration-visual" data-glass>
          <div className="integration-cloud" aria-label="Systems LinerV connects to">
            {integrations.map((item) => (
              <span key={item} tabIndex={0}>{item}</span>
            ))}
          </div>
          <div className="integration-table" aria-label="How LinerV connects existing systems">
            <div className="integration-table-head">
              <span>System</span>
              <span>Already knows</span>
              <span>LinerV adds</span>
            </div>
            {integrationRows.map(([system, knows, adds]) => (
              <div className="integration-row" key={system}>
                <strong>{system}</strong>
                <span>{knows}</span>
                <span>{adds}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="testimonials-section" data-reveal>
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Operator trust</p>
          <h2>Built for the meetings where every minute and every explanation matters.</h2>
        </div>
        <div
          className="testimonial-grid"
          onMouseOver={(event) => event.currentTarget.classList.add("is-paused")}
          onMouseLeave={(event) => event.currentTarget.classList.remove("is-paused")}
        >
          <div className="testimonial-track">
            {testimonials.map(([quote, name, role]) => (
              <figure className="testimonial-card" data-glass key={name} tabIndex={0}>
                <blockquote>{quote}</blockquote>
                <figcaption>
                  <strong>{name}</strong>
                  <span>{role}</span>
                </figcaption>
              </figure>
            ))}
            {testimonials.map(([quote, name, role]) => (
              <figure className="testimonial-card" data-glass aria-hidden="true" key={`${name}-clone`}>
                <blockquote>{quote}</blockquote>
                <figcaption>
                  <strong>{name}</strong>
                  <span>{role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="pricing-section" id="pricing" data-reveal>
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Pricing</p>
          <h2>Start with one operating picture, then scale by plant.</h2>
        </div>
        <div className="pricing-grid">
          {pricingPlans.map(([name, intro, price, features], index) => (
            <article className={`pricing-card ${index === 1 ? "is-featured" : ""}`} data-glass key={name}>
              <small>{intro}</small>
              <strong>{name}</strong>
              <span>{price}</span>
              <ul>
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className={index === 1 ? "primary-btn" : "secondary-btn"} href="#demo">
                Talk to sales
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section" id="about" data-reveal>
      <div className="container about-grid">
        <div>
          <p className="eyebrow">EU-native operations intelligence</p>
          <h2>LinerV exists for factories where the line story is still split across people and systems.</h2>
        </div>
        <div className="about-copy">
          <p>
            Poland and the wider EU have deep manufacturing strength, but day-to-day
            execution still depends on context hidden in notes, spreadsheets,
            standups, and machine dashboards. LinerV turns that fragmented reality
            into a calm operating picture for teams that need to act earlier.
          </p>
          <div className="contact-card" data-glass>
            <strong>LinerV Labs sp. z o.o.</strong>
            <span>Warsaw, Poland</span>
            <a href="mailto:hello@linerv.io">hello@linerv.io</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-success" data-glass role="status">
        <img src="/brand/linerv-mark.svg" alt="" />
        <strong>Demo request queued.</strong>
        <p>We will map your line signals, shifts, and bottleneck categories before the walkthrough.</p>
        <button onClick={() => setSubmitted(false)}>Edit details</button>
      </div>
    );
  }

  return (
    <form className="demo-form" onSubmit={onSubmit}>
      <label>
        Work email
        <input type="email" name="email" placeholder="you@company.com" required />
      </label>
      <label>
        Company
        <input name="company" placeholder="Plant or group name" required />
      </label>
      <label>
        Manufacturing segment
        <select name="segment" defaultValue="Food">
          {segments.map(([segment]) => (
            <option key={segment}>{segment}</option>
          ))}
        </select>
      </label>
      <label>
        Plant count
        <input name="plants" placeholder="1, 3, 12..." />
      </label>
      <label className="full">
        What should LinerV connect first?
        <textarea name="message" placeholder="Shift notes, downtime reasons, quality holds..." />
      </label>
      <button className="primary-btn full" type="submit">Request a demo</button>
    </form>
  );
}

function SignInPage() {
  return (
    <main id="top">
      <Nav />
      <section className="auth-section">
        <div className="container auth-grid">
          <div>
            <p className="eyebrow">LinerV workspace</p>
            <h1>Return to the operating picture for your plant.</h1>
            <p className="hero-lede">
              Sign in to review open actions, handover notes, line signals, and
              bottleneck queues from your last shift.
            </p>
            <div className="auth-proof" data-glass>
              <strong>Security posture</strong>
              <span>EU-ready data handling, role-based workspaces, and plant-level access controls.</span>
            </div>
          </div>
          <form className="auth-card" data-glass>
            <img src="/brand/linerv-mark.svg" alt="" />
            <strong>Sign in to LinerV</strong>
            <label>
              Work email
              <input type="email" placeholder="you@company.com" />
            </label>
            <label>
              Password
              <input type="password" placeholder="••••••••" />
            </label>
            <button className="primary-btn" type="button">Continue</button>
            <a href="#demo">Need a workspace? Book a demo</a>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function DemoPage() {
  return (
    <main id="top">
      <Nav />
      <section className="demo-page-section">
        <div className="container demo-page-grid">
          <div>
            <p className="eyebrow">Request a LinerV demo</p>
            <h1>Find out what LinerV can connect for your factory.</h1>
            <p className="hero-lede">
              Meet one-on-one with a LinerV operator-experience specialist and map
              your shift notes, downtime codes, quality holds, and bottleneck review.
            </p>
            <div className="demo-benefits">
              {["Map one real line", "Review handover quality", "Identify the first bottleneck signal"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <DemoForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Footer() {
  const footerGroups = [
    ["Product", [["Overview", "top"], ["Board", "board"], ["Shift", "shift"], ["Bottleneck", "bottleneck"]]],
    ["Solutions", [["Food", "segments"], ["Automotive", "segments"], ["Machinery", "segments"], ["Chemicals", "segments"]]],
    ["Resources", [["Proof", "proof"], ["Pricing", "pricing"], ["Demo", "demo"], ["Sign in", "signin"]]],
    ["Company", [["About", "about"], ["Contact", "about"], ["Security", "proof"], ["Demo", "demo"]]],
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="footer-logo-link" href="#top" aria-label="LinerV home">
            <img src="/brand/linerv-logo-dark.svg" alt="LinerV" />
          </a>
          <p>One operating picture for every line, every shift, every constraint.</p>
          <div className="social-row" aria-label="Social links">
            {["in", "x", "yt", "gh"].map((item) => (
              <a href="#top" key={item}>{item}</a>
            ))}
          </div>
        </div>
        {footerGroups.map(([group, links]) => (
          <div className="footer-list" key={group}>
            <strong>{group}</strong>
            {links.map(([label, hash]) => (
              <a href={`#${hash}`} key={label}>{label}</a>
            ))}
          </div>
        ))}
        <div className="footer-contact">
          <strong>Contact</strong>
          <span>LinerV Labs sp. z o.o.</span>
          <span>Warsaw, Poland</span>
          <a href="mailto:hello@linerv.io">hello@linerv.io</a>
        </div>
      </div>
    </footer>
  );
}

function ProductMockup({ product }) {
  return (
    <div className="product-mockup" data-glass aria-label={`${product.name} interface preview`}>
      <div className="mockup-bar">
        <span />
        <span />
        <span />
        <strong>{product.screenshotTitle}</strong>
      </div>
      <div className="mockup-body">
        <div className="mockup-summary">
          <small>{product.eyebrow}</small>
          <strong>{product.screenshotMetric}</strong>
          <span>{product.screenshotLabel}</span>
        </div>
        <div className="mockup-flow">
          {product.flow.map((item, index) => (
            <div className="mockup-flow-step" key={item}>
              <span className={index === 1 ? "is-hot" : ""} />
              <strong>{item}</strong>
            </div>
          ))}
        </div>
        <div className="mockup-queue">
          {product.useCases.map((item, index) => (
            <div className="mockup-queue-row" key={item}>
              <span className={index % 2 === 0 ? "green" : "amber"} />
              <strong>{item}</strong>
              <em>{index === 0 ? "Now" : `${index + 3}m`}</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductPage({ product }) {
  const productIndex = products.findIndex((item) => item.slug === product.slug);
  const related = products.filter((item) => item.slug !== product.slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product.slug]);

  return (
    <main id="top">
      <Nav />

      <section className="product-hero-section">
        <div className="container product-hero-grid">
          <div data-reveal>
            <a className="back-link" href="#top">Back to homepage</a>
            <p className="eyebrow">{product.eyebrow}</p>
            <h1>{product.headline}</h1>
            <p className="hero-lede">{product.detail}</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#demo">Book a demo</a>
              <a className="secondary-btn" href={`#${related[0].slug}`}>Compare products</a>
            </div>
            <div className="hero-stats">
              <div>
                <strong>{product.stat}</strong>
                <span>{product.statLabel}</span>
              </div>
              <div>
                <strong>{product.flow.length}</strong>
                <span>connected signal stages</span>
              </div>
            </div>
          </div>
          <div data-reveal>
            <ProductMockup product={product} />
          </div>
        </div>
      </section>

      <section className="product-detail-section" data-reveal>
        <div className="container product-detail-grid">
          <div className="section-heading product-heading">
            <p className="eyebrow">What it gives factory teams</p>
            <h2>{product.name} turns scattered context into a clear operating rhythm.</h2>
          </div>
          <div className="feature-grid">
            {product.features.map((feature, index) => (
              <article className="feature-card" data-glass key={feature}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{feature}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="product-dark-section" data-reveal>
        <div className="container product-dark-grid">
          <div>
            <p className="eyebrow">Operating flow</p>
            <h2>From disconnected signal to routed action.</h2>
            <p>
              The Flow Merge system keeps the human reality of the factory intact:
              notes, stops, quality holds, and throughput gaps become one sequence
              that a shift lead can actually work from.
            </p>
          </div>
          <div className="product-flow-panel" data-glass>
            <SignalTimeline activeProduct={Math.max(productIndex, 0)} />
            <div className="flow-merge-rows">
              {product.flow.map((item, index) => (
                <div key={item}>
                  <span className={index === 1 ? "amber" : ""} />
                  <strong>{item}</strong>
                  <em>{index === 2 ? "Routed" : "Captured"}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="segments-section" data-reveal>
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Use cases</p>
            <h2>Built for the recurring moments where line truth gets lost.</h2>
          </div>
          <div className="use-case-grid">
            {product.useCases.map((useCase) => (
              <article className="use-case-card" data-glass key={useCase}>
                <img src="/brand/linerv-mark.svg" alt="" />
                <strong>{useCase}</strong>
                <p>{product.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="platform-section" data-reveal>
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Related products</p>
            <h2>Connect the rest of the operating picture.</h2>
          </div>
          <div className="related-grid">
            {related.map((item) => (
              <a className="related-card" data-glass href={`#${item.slug}`} key={item.slug}>
                <small>{item.eyebrow}</small>
                <strong>{item.name}</strong>
                <p>{item.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="demo-section" id="demo">
        <div className="container demo-card">
          <div>
            <p className="eyebrow">See {product.name} in action</p>
            <h2>Map your first operating picture around one real line.</h2>
            <p>
              Bring one shift handoff, one downtime category list, and one bottleneck
              example. We will show how LinerV connects them.
            </p>
          </div>
          <DemoForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function HomePage() {
  const [activeProduct, setActiveProduct] = useState(1);
  const active = products[activeProduct];
  const productCards = useMemo(
    () =>
      products.map((product, index) => (
        <button
          className={`product-card ${activeProduct === index ? "is-active" : ""}`}
          key={product.name}
          onClick={() => setActiveProduct(index)}
          data-glass
        >
          <img src="/brand/linerv-mark.svg" alt="" />
          <small>{product.eyebrow}</small>
          <strong>{product.name}</strong>
          <p>{product.summary}</p>
          <SignalTimeline activeProduct={index} />
        </button>
      )),
    [activeProduct],
  );

  return (
    <main id="top">
      <Nav />

      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Connected factory operations</p>
            <h1>Every line signal, routed into action.</h1>
            <p className="hero-lede">
              LinerV connects shift notes, downtime, quality, and throughput so factory
              teams spot bottlenecks before they become tomorrow&apos;s fire drill.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#demo">Book a demo</a>
              <a className="secondary-btn" href="#platform">Explore platform</a>
            </div>
            <div className="hero-stats" aria-label="Product proof points">
              <div>
                <strong>{active.stat}</strong>
                <span>{active.statLabel}</span>
              </div>
              <div>
                <strong>8 segments</strong>
                <span>large manufacturing coverage</span>
              </div>
            </div>
          </div>
          <div className="hero-visual" data-parallax="hero-visual">
            <img
              className="hero-render"
              src="/assets/lineza-factory-signal-scene.png"
              alt="3D modular factory line with signal routes and bottleneck node"
            />
            <FactoryScene />
            <div className="floating-note note-one" data-glass>Bottleneck risk</div>
            <div className="floating-note note-two" data-glass>Shift handoff ready</div>
          </div>
        </div>
      </section>

      <TrustedBy />

      <section className="problem-section" data-reveal>
        <div className="container">
          <div className="section-heading problem-heading">
            <div>
              <p className="eyebrow">The late discovery problem</p>
              <h2>Factory teams see the problem after the shift, because the story is split.</h2>
            </div>
            <p>
              Every team has data. The hard part is connecting the note, stop, quality hold,
              and output gap early enough for someone to act.
            </p>
          </div>
          <div className="problem-explainer">
            <div className="fragment-map" data-glass aria-label="Fragmented factory signals become one LinerV operating picture">
              <div className="fragment-column">
                {blockers.map(([title, signal, silo], index) => (
                  <div className="fragment-node" key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{title}</strong>
                    <small>{signal}</small>
                    <em>{silo}</em>
                  </div>
                ))}
              </div>
              <div className="merge-rail" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="lineza-picture">
                <small>LinerV operating picture</small>
                <strong>Issue, reason, impact, owner, next action</strong>
                <p>One live timeline for the shift meeting and the next escalation.</p>
              </div>
            </div>
            <div className="blocker-grid">
              {blockers.map(([title, , , action]) => (
                <article className="blocker-card" data-glass key={title} tabIndex={0}>
                  <span />
                  <strong>{title}</strong>
                  <p>{action}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="platform-section" id="platform" data-reveal>
        <div className="container">
          <div className="section-heading platform-heading">
            <div>
              <p className="eyebrow">LinerV platform</p>
              <h2>Three products that turn factory signals into action.</h2>
            </div>
            <p>
              Board shows the live line picture. Shift captures handoffs. Bottleneck
              ranks the constraint and routes ownership. Together, they create the system of action.
            </p>
          </div>
          <div className="product-grid">{productCards}</div>
          <div className="active-product-panel" data-glass>
            <div>
              <p className="eyebrow">{active.eyebrow}</p>
              <h3>{active.name}</h3>
              <p>{active.summary}</p>
              <a className="inline-link" href={`#${active.slug}`}>Open {active.name}</a>
            </div>
            <SignalTimeline activeProduct={activeProduct} />
          </div>
        </div>
      </section>

      <section className="dashboard-section" id="dashboard" data-reveal>
        <div className="container dashboard-grid">
          <div>
            <p className="eyebrow">Live operating picture</p>
            <h2>See the shop floor as it happens.</h2>
            <p>
              A single view for shift leads and plant managers: what stopped, why it
              stopped, which line is constrained, and who owns the next action.
            </p>
          </div>
          <div data-reveal>
            <DashboardPreview />
          </div>
        </div>
      </section>

      <IntegrationsSection />

      <section className="segments-section" id="segments" data-reveal>
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Manufacturing coverage</p>
            <h2>Made for the segments where every shift matters.</h2>
          </div>
          <div className="segments-grid">
            {segments.map(([segment, description, image], index) => (
              <article
                className="segment-card"
                data-glass
                key={segment}
                style={{ "--segment-image": `url(${image})` }}
                tabIndex={0}
              >
                <span className={index % 3 === 1 ? "amber" : index % 3 === 2 ? "blue" : ""} />
                <strong>{segment}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="workflow-section" data-reveal>
        <div className="container">
          <div className="section-heading workflow-heading">
            <div>
              <p className="eyebrow">How work moves</p>
              <h2>From scattered signal to owned action in four steps.</h2>
            </div>
            <p>
              This is not a separate product. It is the operating flow every LinerV
              product supports once connected to your plant reality.
            </p>
          </div>
          <div className="workflow-grid">
            {workflowSteps.map(([step, description], index) => (
                <article className="workflow-step" data-glass key={step} tabIndex={0}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i aria-hidden="true" />
                  <strong>{step}</strong>
                  <p>{description}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <PricingSection />

      <AboutSection />

      <section className="demo-section" id="demo" data-reveal>
        <div className="container demo-card">
          <div>
            <p className="eyebrow">Start with one line</p>
            <h2>Find the bottleneck before it becomes the shift story.</h2>
            <p>
              Show LinerV where production truth gets split today. We will map the
              first operating picture around your lines, shifts, and issue categories.
            </p>
          </div>
          <DemoForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}

export function App() {
  useLiquidGlass();
  useGsapScrollMotion();
  const hash = useHashRoute();
  const product = products.find((item) => item.slug === hash);

  if (hash === "signin") {
    return <SignInPage />;
  }

  if (hash === "demo") {
    return <DemoPage />;
  }

  if (product) {
    return <ProductPage product={product} />;
  }

  return <HomePage />;
}
