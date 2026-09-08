const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');

const brands = [
  { _id: 'b-londress', name: 'Londress Pro Series', slug: 'londress-pro' },
  { _id: 'b-wahl', name: 'Wahl Professional', slug: 'wahl' },
  { _id: 'b-babyliss', name: 'BaBylissPRO', slug: 'babyliss-pro' },
  { _id: 'b-vgr', name: 'VGR Professional', slug: 'vgr' },
  { _id: 'b-wmark', name: 'WMARK Professional', slug: 'wmark' },
  { _id: 'b-kemei', name: 'Kemei Professional', slug: 'kemei' },
  { _id: 'b-andis', name: 'Andis USA', slug: 'andis' },
  { _id: 'b-treet', name: 'Treet Platinum', slug: 'treet' },
  { _id: 'b-tucano', name: 'Tucano Hair Tools', slug: 'tucano' },
  { _id: 'b-dompelo', name: 'Dom Pelo', slug: 'dom-pelo' },
  { _id: 'b-l3vel3', name: 'L3VEL3', slug: 'l3vel3' },
  { _id: 'b-infinity', name: "Infinity Look's Hair", slug: 'infinity' },
  { _id: 'b-loreal', name: 'L’Oréal Professionnel', slug: 'loreal' },
  { _id: 'b-schwarzkopf', name: 'Schwarzkopf Professional', slug: 'schwarzkopf' }
];

const categories = [
  {
    _id: "cat-maquinas",
    title: "Máquinas de Corte & Trimmers",
    slug: "maquinas-corte-trimmers",
    description: "Clippers inalámbricas, trimmers de terminación, shavers de lámina y kits profesionales de marcas líderes.",
    icon: "Scissors",
    image: "/uploads/articulos/wahl-senior-cordless.jpeg",
    itemCount: 11
  },
  {
    _id: "cat-tijeras",
    title: "Tijeras, Navajas & Filos",
    slug: "tijeras-filos-profesionales",
    description: "Tijeras de corte microdentadas, filo dulce japonés, navajas de barbero y hojas de afeitar Treet Platinum.",
    icon: "Sparkles",
    image: "/uploads/articulos/treet-platinum-100-pack.jpeg",
    itemCount: 5
  },
  {
    _id: "cat-quimica",
    title: "Coloración & Cosmética Capilar",
    slug: "coloracion-cosmetica-capilar",
    description: "Tinturas profesionales por pomo, polvos decolorantes rápidos, oxidantes en crema y botox capilar.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    itemCount: 4
  },
  {
    _id: "cat-secadores",
    title: "Secadores & Herramientas Térmicas",
    slug: "secadores-herramientas-termicas",
    description: "Secadores de alto rendimiento con motor italiano, planchas alisadoras de titanio cerámico y bucleadoras.",
    icon: "Wind",
    image: "/uploads/articulos/secador-tucano-8600w.jpeg",
    itemCount: 3
  },
  {
    _id: "cat-accesorios",
    title: "Accesorios, Capas & Barbería",
    slug: "accesorios-capas-barberia",
    description: "Capas WMARK, peines de carbono, papel de cuello Luke Paper, rociadores, aerosoles Andis Cool Care y lubricantes.",
    icon: "Package",
    image: "/uploads/articulos/capa-wmark-negra.jpeg",
    itemCount: 12
  }
];

const catMap = {};
categories.forEach(c => { catMap[c.slug] = c; });

const brandMap = {};
brands.forEach(b => { brandMap[b.slug] = b; });

const newRealProducts = [
  {
    _id: "prod-wahl-senior",
    name: "Máquina Wahl Professional 5-Star Cordless Senior Metal Case",
    slug: "wahl-5-star-cordless-senior-metal-case",
    sku: "WHL-SNR-01",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["wahl"],
    presentation: "Caja individual cerrada oficial (Consulte precio por bulto)",
    shortDescription: "Carcasa metálica ergonómica de alta resistencia, motor V9000 de torque constante y batería de iones de litio.",
    description: "La Wahl Cordless Senior es el estándar indiscutido para barberos exigentes. Equipada con carcasa de aluminio de servicio pesado para máximo control y estabilidad, motor rotativo que no decae en cabellos densos y palanca de ajuste metálica con graduación milimétrica (0.8mm a 2.5mm). Cuchilla ajustable a cero espacio para desvanecimientos ultra limpios.",
    images: [
      "/uploads/articulos/wahl-senior-cordless.jpeg",
      "/uploads/articulos/wahl-senior-cordless-2.jpeg"
    ],
    specifications: [
      { key: "Motor", value: "Rotativo V9000 de alta torsión" },
      { key: "Carcasa", value: "Aluminio Heavy Duty Metal Case" },
      { key: "Autonomía", value: "Batería Litio 80 minutos continuos" },
      { key: "Regulación", value: "Palanca metálica 0.8 mm - 2.5 mm" },
      { key: "Garantía", value: "Oficial Wahl Professional 2 años" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-wahl-magic-clip-bg",
    name: "Máquina Wahl 5-Star Cordless Magic Clip Black & Gold Edition",
    slug: "wahl-5-star-magic-clip-black-gold",
    sku: "WHL-MGC-BG",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["wahl"],
    presentation: "Caja individual oficial con 8 peines guía premium",
    shortDescription: "Edición exclusiva Black & Gold con cuchilla Stagger-Tooth bañada en oro y motor de alta velocidad optimizado.",
    description: "La máquina de corte más aclamada del mundo en su versión dorada premium. La cuchilla patentada Stagger-Tooth emite el característico sonido 'Crunch' que guía al barbero para un difuminado perfecto sin líneas marcadas. Batería de iones de litio de más de 100 minutos de uso ininterrumpido.",
    images: [
      "/uploads/articulos/wahl-magic-clip-black-gold.jpeg",
      "/uploads/articulos/wahl-magic-clip-black-gold-2.jpeg"
    ],
    specifications: [
      { key: "Cuchilla", value: "Stagger-Tooth bañada en Titanio Oro" },
      { key: "Motor", value: "Rotativo High-Speed mejorado" },
      { key: "Autonomía", value: "Más de 100 minutos de trabajo" },
      { key: "Peso", value: "290g ultraliviana y balanceada" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-babyliss-fxone-black",
    name: "Trimmer BaBylissPRO FXONE All-Metal Li-ion Black Edition",
    slug: "babylisspro-fxone-all-metal-trimmer-black",
    sku: "BBY-FXONE-BLK",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["babyliss-pro"],
    presentation: "Caja con base de carga y batería modular FXONE",
    shortDescription: "Nuevo sistema FXONE con batería universal intercambiable en un clic, motor brushless y cuerpo moleteado.",
    description: "La cúspide de la ingeniería para terminaciones de barbería. Sistema modular que permite retirar y reemplazar la batería en un segundo. Chasis metálico estriado negro mate que garantiza agarre óptimo aún con manos húmedas. Cuchilla en T de titanio con visión 360° para líneas nítidas.",
    images: [
      "/uploads/articulos/babylisspro-fxone-black.jpeg"
    ],
    specifications: [
      { key: "Sistema", value: "FXONE Batería recambiable universal" },
      { key: "Motor", value: "Digital sin escobillas (Brushless) N1" },
      { key: "Cuchilla", value: "T-Blade DLC/Titanio expuesta 360°" },
      { key: "Carcasa", value: "Aluminio moleteado anti-deslizante" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-babyliss-fxone-gold",
    name: "Trimmer BaBylissPRO FXONE All-Metal Li-ion Gold Edition",
    slug: "babylisspro-fxone-all-metal-trimmer-gold",
    sku: "BBY-FXONE-GLD",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["babyliss-pro"],
    presentation: "Caja de lujo con base de carga dorada y batería FXONE",
    shortDescription: "Edición Gold Luxury con acabado dorado brillante, motor Ferrari brushless y batería intercambiable FXONE.",
    description: "Máxima prestancia y potencia inigualable. Creada para barberías de alta gama que exigen precisión milimétrica en dibujos, afeitados en seco y líneas de contorno. Su motor digital entrega 7.200 RPM constantes sin calentamiento.",
    images: [
      "/uploads/articulos/babylisspro-fxone-gold.jpeg"
    ],
    specifications: [
      { key: "Acabado", value: "Dorado espejo Luxury Gold" },
      { key: "Velocidad", value: "7.200 RPM de par constante" },
      { key: "Batería", value: "FXONE Lithium-Ion intercambiable" },
      { key: "Cuchilla", value: "Titanio Oro Deep-Tooth ajustable a cero" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-vgr-v011",
    name: "Máquina de Corte VGR Navigator V-011 Professional Clipper",
    slug: "vgr-navigator-v011-professional-hair-clipper",
    sku: "VGR-V011",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["vgr"],
    presentation: "Caja individual con 4 peines guía + aceite + cepillo (Venta por unidad y bulto)",
    shortDescription: "Clipper profesional con batería de 2200 mAh, cuchillas de acero amigables con la piel y palanca taper.",
    description: "La mejor relación precio-calidad del mercado mayorista. Diseñada para trabajo diario en salones, posee batería de litio de alta densidad que rinde hasta 180 minutos de uso, cuerpo bicolor resistente y micro-palanca lateral de ajuste de altura.",
    images: [
      "/uploads/articulos/vgr-v011-clipper.jpeg",
      "/uploads/articulos/vgr-v011-clipper-2.jpeg",
      "/uploads/articulos/vgr-v011-clipper-3.jpeg"
    ],
    specifications: [
      { key: "Batería", value: "2200 mAh Litio (180 min autonomía)" },
      { key: "Cuchillas", value: "Acero quirúrgico Skin-friendly" },
      { key: "Palanca", value: "Multi-cut Taper Lever" },
      { key: "Carga", value: "USB universal con indicador LED" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },
  {
    _id: "prod-vgr-v275-gold",
    name: "Trimmer VGR Voyager V-275 Professional Hair Trimmer Gold",
    slug: "vgr-voyager-v275-professional-hair-trimmer-gold",
    sku: "VGR-V275",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["vgr"],
    presentation: "Caja de presentación con peines guía de 1, 2 y 3 mm",
    shortDescription: "Trimmer metálica dorada texturada con display digital de carga/RPM y cuchilla T-Blade de terminación.",
    description: "Cuerpo completamente metálico con grabado antideslizante. Pantalla digital que informa el porcentaje exacto de batería y velocidad de trabajo. Especialmente calibrada para rebajes de barba, cuello y detalles finos.",
    images: [
      "/uploads/articulos/vgr-v275-trimmer-gold.jpeg"
    ],
    specifications: [
      { key: "Cuerpo", value: "Metálico dorado labrado" },
      { key: "Display", value: "LED digital inteligente" },
      { key: "Batería", value: "1500 mAh Litio alta duración" },
      { key: "Cuchilla", value: "T-Blade acero inoxidable" }
    ],
    inStock: true,
    featured: false,
    isNew: true
  },
  {
    _id: "prod-vgr-v938-afa",
    name: "Trimmer Corporal VGR V-938 Edición Oficial AFA Selección Argentina",
    slug: "vgr-v938-body-trimmer-afa-seleccion-argentina",
    sku: "VGR-V938-AFA",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["vgr"],
    presentation: "Caja con licencia oficial AFA con base cargadora vertical",
    shortDescription: "Recortadora corporal y de detalles con cuchilla cerámica anti-pellizcos, resistencia IPX7 al agua y base de apoyo.",
    description: "Producto oficial licenciado de la Asociación del Fútbol Argentino (AFA). Cuchilla cerámica con bordes redondeados que no irrita zonas sensibles. 100% impermeable con certificación IPX7 para uso en seco o bajo el agua.",
    images: [
      "/uploads/articulos/vgr-v938-afa-trimmer.jpeg"
    ],
    specifications: [
      { key: "Licencia", value: "Oficial AFA (Selección Argentina)" },
      { key: "Resistencia al agua", value: "IPX7 totalmente sumergible" },
      { key: "Cuchilla", value: "Cerámica Skin-Friendly anti-cortes" },
      { key: "Base", value: "Soporte vertical de recarga USB" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-vgr-v315-shaver",
    name: "Afeitadora Rotativa VGR V-315 Men's Shaver Triple Cabezal Magnético",
    slug: "vgr-v315-mens-shaver-triple-cabezal-magnetico",
    sku: "VGR-V315",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["vgr"],
    presentation: "Caja con cable USB y cepillo limpiador",
    shortDescription: "Afeitadora rotativa de 3 cabezales flotantes magnéticos para afeitado suave al ras sin fricción.",
    description: "El cabezal con acople magnético facilita la limpieza con solo desprenderlo hacia arriba. Cuchillas flotantes independientes que se adaptan a las líneas de la mandíbula y cuello para un corte ultra suave.",
    images: [
      "/uploads/articulos/vgr-v315-shaver.jpeg"
    ],
    specifications: [
      { key: "Sistema", value: "Triple cabezal rotativo flotante" },
      { key: "Acople", value: "Magnetic Suction desmontable" },
      { key: "Batería", value: "Ion-Litio recargable USB" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },
  {
    _id: "prod-wmark-ng8906",
    name: "Afeitadora Shaver WMARK NG-8906 High Speed Barber Shaver 9500 RPM",
    slug: "wmark-ng8906-high-speed-barber-shaver-9500-rpm",
    sku: "WMK-NG8906",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["wmark"],
    presentation: "Caja cerrada con base de escritorio, cable USB y lámina de repuesto",
    shortDescription: "Shaver profesional de lámina doble de 9500 RPM, pantalla LCD con velocímetro y base de carga.",
    description: "Herramienta indispensable para el acabado skin fade en barbería. Con una velocidad máxima de 9500 RPM y láminas hipoalergénicas doradas, rasura a cero sin irritar. Pantalla con indicación en tiempo real de porcentaje de batería y velocidad.",
    images: [
      "/uploads/articulos/wmark-ng8906-shaver.jpeg",
      "/uploads/articulos/wmark-ng8906-shaver-2.jpeg"
    ],
    specifications: [
      { key: "Potencia", value: "Motor magnético hasta 9500 RPM" },
      { key: "Display", value: "Pantalla LCD digital completa" },
      { key: "Accesorios", value: "Base cargadora de escritorio incluida" },
      { key: "Láminas", value: "Doble lámina flotante dorada" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-wmark-ng8634-kit",
    name: "Kit Barbería WMARK NG-8634 Panther Edition (Clipper + Trimmer)",
    slug: "wmark-ng8634-kit-variable-barber-kit-panther",
    sku: "WMK-NG8634-KIT",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["wmark"],
    presentation: "Caja kit duo x 2 máquinas con bases independientes",
    shortDescription: "Combo profesional completo de máquina de corte + trimmer de detalle con bases individuales y diseño Panther.",
    description: "El kit definitivo para barberías. Incluye una clipper de corte pesado con cuchilla fade y una trimmer de terminación ultra nítida, ambas con bases de carga individuales para el puesto de trabajo. Diseño agresivo con relieve de pantera y motores de alto rendimiento.",
    images: [
      "/uploads/articulos/wmark-ng8634-barber-kit.jpeg"
    ],
    specifications: [
      { key: "Contenido", value: "1 Clipper + 1 Trimmer + 2 Bases" },
      { key: "Cuchillas", value: "DLC Fade y Skeleton T-Blade" },
      { key: "Batería", value: "Litio con carga independiente USB" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-kemei-km2299",
    name: "Trimmer Kemei KM-2299 Professional Hair Clipper / Trimmer",
    slug: "kemei-km2299-professional-hair-clipper-trimmer",
    sku: "KMI-KM2299",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["kemei"],
    presentation: "Caja sellada con 3 peines guía + cargador USB",
    shortDescription: "Trimmer liviana con cuchilla expuesta en T de 7000 RPM para contornos, patillas y terminaciones.",
    description: "Una de las herramientas más solicitadas por su ergonomía y bajo peso. Su cabezal en T facilita la visión clara de la línea de corte en orejas, nuca y perfilado de barba.",
    images: [
      "/uploads/articulos/kemei-km2299-clipper.jpeg",
      "/uploads/articulos/kemei-km2299-clipper-2.jpeg"
    ],
    specifications: [
      { key: "Velocidad", value: "7000 RPM de corte continuo" },
      { key: "Cuchilla", value: "Acero al carbono en T" },
      { key: "Conectividad", value: "Carga rápida USB Type-C" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },
  {
    _id: "prod-kemei-km2600",
    name: "Máquina de Corte Kemei KM-2600 Cordless Precision Fade Clipper",
    slug: "kemei-km2600-cordless-precision-fade-clipper",
    sku: "KMI-KM2600",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["kemei"],
    presentation: "Caja sellada con peines guía de 1.5 a 6 mm",
    shortDescription: "Clipper inalámbrica con cuchilla Stagger-tooth 'Crunch', palanca de regulación y motor rotativo.",
    description: "Clásico infaltable en barberías. Ofrece corte potente tanto en pelo seco como húmedo con cuchillas tipo Stagger-tooth que entregan cortes difuminados limpios sin líneas residuales.",
    images: [
      "/uploads/articulos/kemei-km2600-clipper.jpeg"
    ],
    specifications: [
      { key: "Batería", value: "Ion-Litio más de 60 min de corte" },
      { key: "Cuchilla", value: "Stagger-Tooth Crunch Technology" },
      { key: "Palanca", value: "Taper lever de regulación continua" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },
  {
    _id: "prod-treet-platinum-100",
    name: "Hojas de Afeitar Treet Platinum Super Stainless (Caja x 100 Filos)",
    slug: "hojas-de-afeitar-treet-platinum-caja-x-100",
    sku: "TRT-PLT-100",
    category: catMap["tijeras-filos-profesionales"],
    brand: brandMap["treet"],
    presentation: "Caja dispensadora exhibidora x 100 filos individuales",
    shortDescription: "Hojas de acero inoxidable sueco con recubrimiento de platino y teflón para filo dulce y deslizamiento suave.",
    description: "Los filos Treet Platinum son reconocidos por su corte suave que evita irritaciones en la piel del cliente. Cuentan con tratamiento anticorrosión y filo templado de altísima precisión para navajas de barbero.",
    images: [
      "/uploads/articulos/treet-platinum-100-pack.jpeg",
      "/uploads/articulos/treet-platinum-100-londres.jpeg"
    ],
    specifications: [
      { key: "Material", value: "Acero inoxidable sueco templado" },
      { key: "Recubrimiento", value: "Platino & Teflon antifricción" },
      { key: "Cantidad", value: "100 filos por caja" }
    ],
    inStock: true,
    featured: true,
    isNew: false
  },
  {
    _id: "prod-treet-platinum-200",
    name: "Hojas de Afeitar Treet Platinum Super Stainless (Pack Mayorista x 200)",
    slug: "hojas-de-afeitar-treet-platinum-pack-x-200",
    sku: "TRT-PLT-200",
    category: catMap["tijeras-filos-profesionales"],
    brand: brandMap["treet"],
    presentation: "Pack cerrado mayorista x 200 filos (40 cajitas x 5 u.)",
    shortDescription: "Pack mayorista de 200 hojas de afeitar Treet Platinum con precio diferencial por volumen.",
    description: "Presentación ideal para distribuidores y barberías con alto volumen de afeitado semanal. Hojas envasadas en papel encerado individual que previene la humedad.",
    images: [
      "/uploads/articulos/treet-platinum-200-blades.jpeg"
    ],
    specifications: [
      { key: "Presentación", value: "Pack sellado x 200 filos" },
      { key: "Uso", value: "Navajas tradicionales y shavettes" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },
  {
    _id: "prod-navajas-custom",
    name: "Navajas de Barbero Personalizadas Londress Series (Calavera, Oro, Joker)",
    slug: "navajas-de-barbero-personalizadas-londress-series",
    sku: "NVJ-PRO-CUST",
    category: catMap["tijeras-filos-profesionales"],
    brand: brandMap["londress-pro"],
    presentation: "Funda protectora plástica individual con cierre",
    shortDescription: "Porta navajas de acero inoxidable con traba deslizante y mangos estilizados en motivos Calavera, Oro y Joker.",
    description: "Navajas con excelente balance de peso y filo firme gracias a su sistema de inserción de medio filo con traba de seguridad. Mangos con diseños gráficos que resaltan en el puesto de trabajo.",
    images: [
      "/uploads/articulos/navajas-barber-custom.jpeg"
    ],
    specifications: [
      { key: "Sujeción", value: "Corredera de seguridad de acero inox" },
      { key: "Variantes", value: "Calavera Grim Reaper, Oro Vintage, Joker" },
      { key: "Compatibilidad", value: "Medio filo universal (Treet, Gillette, etc.)" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-caja-mayorista",
    name: "Caja Cerrada Mayorista Londress Barbería & Filos",
    slug: "caja-cerrada-mayorista-londress-barberia-filos",
    sku: "LND-BOX-MAY",
    category: catMap["tijeras-filos-profesionales"],
    brand: brandMap["londress-pro"],
    presentation: "Caja bulto cerrado surtido listo para despacho",
    shortDescription: "Combo surtido para barberías: Tijeras profesionales de corte y pulir, packs Treet Platinum, cuchillas cerámicas y accesorios.",
    description: "La opción más rentable para equipar o reponer insumos críticos. Incluye tijeras en fundas individuales, múltiples cajas de filos de afeitar Treet Platinum y cuchillas cerámicas de colores para máquinas de corte.",
    images: [
      "/uploads/articulos/caja-mayorista-barberia-londres.jpeg"
    ],
    specifications: [
      { key: "Contenido", value: "Tijeras, filos Treet, cuchillas cerámicas, palancas" },
      { key: "Destino", value: "Barberías profesionales y salones" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-dom-pelo-shaving",
    name: "Gel de Afeitar Dom Pelo Shaving Gel Mentolado 500g",
    slug: "gel-de-afeitar-dom-pelo-shaving-gel-mentolado-500g",
    sku: "DMP-SHV-500",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["dom-pelo"],
    presentation: "Botella con bomba dosificadora x 500g",
    shortDescription: "Gel de afeitar transparente de alto rendimiento que hidrata, refresca y permite ver la línea de corte con precisión.",
    description: "Gel profesional formulado en Brasil para afeitado y diseño de contornos con navaja. Su consistencia transparente no obstruye la visibilidad, permitiendo dibujar líneas perfectas. Con extractos humectantes que calman la piel.",
    images: [
      "/uploads/articulos/dom-pelo-shaving-gel-500g.jpeg"
    ],
    specifications: [
      { key: "Contenido neto", value: "500 gramos con dosificador" },
      { key: "Textura", value: "Gel transparente lubricante" },
      { key: "Efecto", value: "Frescura mentolada y anti-irritación" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-l3vel3-aftershave",
    name: "Colonia Post-Afeitado L3VEL3 Aftershave Cologne Vibrant 400ml",
    slug: "colonia-post-afeitado-l3vel3-aftershave-cologne-vibrant-400ml",
    sku: "LV3-AFT-400",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["l3vel3"],
    presentation: "Botella con atomizador spray de 400ml (13.5 fl oz)",
    shortDescription: "Aftershave y fragancia 2 en 1 revitalizante e hidratante para todo tipo de piel.",
    description: "La marca que eligen las mejores barberías del mundo. Refresca y revitaliza la piel instantáneamente luego del afeitado, desinfectando y cerrando los poros con una fragancia masculina duradera.",
    images: [
      "/uploads/articulos/l3vel3-aftershave-vibrant.jpeg"
    ],
    specifications: [
      { key: "Fragancia", value: "Vibrant (Cítrica amaderada)" },
      { key: "Volumen", value: "400 ml con atomizador" },
      { key: "Origen", value: "Importado oficial L3VEL3" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-infinity-locion",
    name: "Loción Pós-Barba Infinity Look's Hair Classic Barber Series Menthol 120ml",
    slug: "locion-pos-barba-infinity-classic-barber-menthol-120ml",
    sku: "INF-POS-120",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["infinity"],
    presentation: "Frasco spray atomizador de 120ml",
    shortDescription: "Loción post afeitado mentolada que hidrata, refresca y acalma la piel reduciendo rojeces.",
    description: "Fórmula astringente que proporciona una inmediata sensación de frescura tras el paso de la navaja o máquina. Su atomizador permite una aplicación higiénica y uniforme en cuello y mejillas.",
    images: [
      "/uploads/articulos/infinity-locion-posbarba-menthol.jpeg",
      "/uploads/articulos/infinity-locion-posbarba-2.jpeg"
    ],
    specifications: [
      { key: "Contenido", value: "120 ml atomizador" },
      { key: "Efecto", value: "Calmante, refrescante y antiséptico" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },
  {
    _id: "prod-cuchillas-camo",
    name: "Cuchillas Cerámicas Móviles Fade Camouflage (Verde, Azul, Rojo)",
    slug: "cuchillas-ceramicas-moviles-fade-camouflage",
    sku: "CCH-CER-CAMO",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Estuche acrílico individual con esponja amortiguadora",
    shortDescription: "Cuchilla móvil de cerámica de zirconio con estampado camuflado en verde, azul o rojo. Mantiene la máquina fría.",
    description: "Cuchilla de repuesto para máquinas de corte Wahl, Kemei, VGR, Gamma+ y Babyliss. La cerámica de zirconio no absorbe calor, asegurando que la máquina trabaje fría durante horas sin quemar la piel del cliente.",
    images: [
      "/uploads/articulos/cuchilla-ceramica-verde-camo.jpeg",
      "/uploads/articulos/cuchilla-ceramica-azul-camo.jpeg",
      "/uploads/articulos/cuchilla-ceramica-roja-camo.jpeg"
    ],
    specifications: [
      { key: "Material", value: "Cerámica de Zirconio Zirconia" },
      { key: "Compatibilidad", value: "Wahl Senior, Magic Clip, Kemei 2600, VGR" },
      { key: "Variantes", value: "Verde Camo, Azul Camo, Rojo Camo" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-wahl-peine-05",
    name: "Peine Guía WAHL Premium Cutting Guide # 1/2 con Traba Metálica 1.5mm",
    slug: "peine-guia-wahl-premium-cutting-guide-medio-1-5mm",
    sku: "WHL-PG-05",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["wahl"],
    presentation: "Blíster oficial sellado Wahl #3354-1000",
    shortDescription: "Peine de precisión número 1/2 (1.5mm - 1/16\") de resina de ingeniería con traba metálica de fijación segura.",
    description: "El peine indispensable para degradados cero y transiciones limpias. Su traba de acero templado impide que el peine se desprenda accidentalmente en medio de un pase de máquina.",
    images: [
      "/uploads/articulos/wahl-peine-guia-premium-05.jpeg",
      "/uploads/articulos/wahl-peine-guia-premium-05-2.jpeg"
    ],
    specifications: [
      { key: "Medida", value: "# 1/2 (1.5 mm - 1/16 pulgada)" },
      { key: "Fijación", value: "Secure Fit Metal Clip" },
      { key: "Compatibilidad", value: "Línea Wahl 5-Star y estándar" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },
  {
    _id: "prod-capa-wmark",
    name: "Capa de Barbería WMARK Professional Impermeable y Antiestática",
    slug: "capa-de-barberia-wmark-professional-impermeable-antiestatica",
    sku: "WMK-CAP-01",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["wmark"],
    presentation: "Bolsa sellada individual / Pack x 6 unidades",
    shortDescription: "Capa de corte de gran cobertura en base negra o blanca con W roja, tela antiestática que no retiene cabellos.",
    description: "Diseño premium para barberías contemporáneas. Confeccionada con tela sedosa repelente de agua y químicos de tinte, con cuello elástico regulable con ganchos de acero que se adapta a cualquier tamaño de cuello.",
    images: [
      "/uploads/articulos/capa-wmark-negra.jpeg",
      "/uploads/articulos/capa-wmark-blanca.jpeg",
      "/uploads/articulos/capa-wmark-negra-2.jpeg"
    ],
    specifications: [
      { key: "Medidas", value: "145 x 165 cm (cobertura total de sillón)" },
      { key: "Cierre", value: "Ganchos metálicos reforzados" },
      { key: "Modelos", value: "Negra con rojo / Blanca con rojo" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    _id: "prod-peines-carbono",
    name: "Set de Peines de Corte de Carbono Antiestático & Peine Metálico Dorado",
    slug: "set-peines-carbono-antiestatico-peine-metalico-dorado",
    sku: "PN-CRB-GLD",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Blíster individual de protección",
    shortDescription: "Peine de carbono resistente a químicos y calor + peine de precisión bañado en oro con orificios medidores.",
    description: "Diseñados para cortes con máquina sobre peine (clipper over comb) y trabajos de precisión con tijera. Dientes pulidos a mano que no raspan el cuero cabelludo y otorgan tensión uniforme.",
    images: [
      "/uploads/articulos/peines-carbono-dorado.jpeg",
      "/uploads/articulos/peine-carbono-profesional.jpeg"
    ],
    specifications: [
      { key: "Material", value: "Fibra de carbono + Aleación dorada" },
      { key: "Resistencia", value: "Térmica hasta 220°C" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },
  {
    _id: "prod-luke-paper",
    name: "Papel Cuello Elástico Autoadhesivo Luke Paper Professional",
    slug: "papel-cuello-elastico-autoadhesivo-luke-paper",
    sku: "LUK-NCK-100",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Rollo de 100 tiras / Tira de 5 rollos (500 servicios)",
    shortDescription: "Banda elástica impermeable de celulosa suave con adhesivo frontal para máxima higiene entre capa y piel.",
    description: "Indispensable para cumplir con estándares de higiene en peluquerías y barberías. Evita el contacto directo de la capa con la piel del cliente y retiene restos de cabellos sueltos.",
    images: [
      "/uploads/articulos/luke-paper-cuello.jpeg"
    ],
    specifications: [
      { key: "Rendimiento", value: "100 servicios por rollo" },
      { key: "Propiedades", value: "Impermeable, elástico y autoadhesivo" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },
  {
    _id: "prod-rociadores-barber",
    name: "Rociador Pulverizador Barber Design Pico Regulable",
    slug: "rociador-pulverizador-barber-design-pico-regulable",
    sku: "ROC-PLV-BAR",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Bolsa protectora / Caja mayorista x 12 u.",
    shortDescription: "Botella pulverizadora transparente con motivos de barbería, pico giratorio de bruma fina a chorro directo.",
    description: "Gatillo ergonómico de retorno rápido que previene la fatiga en las manos. Cuerpo transparente que permite visualizar el nivel de agua o loción capilar.",
    images: [
      "/uploads/articulos/rociadores-barber-transparentes.jpeg"
    ],
    specifications: [
      { key: "Capacidad", value: "300 ml" },
      { key: "Boquilla", value: "Regulable Bruma / Chorro" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },
  {
    _id: "prod-cepillo-fade",
    name: "Cepillo Fade Brush de Cerdas Suaves para Limpieza de Degradados",
    slug: "cepillo-fade-brush-cerdas-suaves-degradados",
    sku: "CEP-FAD-BLK",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Pack mayorista x 6 unidades / Unitario",
    shortDescription: "Cepillo de mano ergonómico con cerdas compactas que barren el polvillo de pelo sin raspar la piel del cliente.",
    description: "Herramienta fundamental para verificar la precisión del difuminado y la sombra en cada paso del degradado con máquina o navaja.",
    images: [
      "/uploads/articulos/cepillos-fade-brush.jpeg"
    ],
    specifications: [
      { key: "Cerdas", value: "Nylon balanceado suave" },
      { key: "Mango", value: "Plástico inyectado anatómico negro" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },
  {
    _id: "prod-andis-cool-care",
    name: "Andis Cool Care Plus 5 in 1 Aerosol para Cuchillas 439g",
    slug: "andis-cool-care-plus-5-in-1-aerosol-cuchillas-439g",
    sku: "AND-CCL-439",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["andis"],
    presentation: "Lata aerosol de 439g (15.5 oz) / Caja mayorista x 12 unidades",
    shortDescription: "El aerosol 5 en 1 líder en salones: enfría al instante, desinfecta, lubrica las hojas, limpia residuos y previene la corrosión.",
    description: "Extiende la vida útil de tus cuchillas Wahl, Andis, Babyliss o Kemei. Rociar directamente sobre la cuchilla en movimiento para un enfriamiento instantáneo durante jornadas extensas de salón.",
    images: [
      "/uploads/articulos/andis-cool-care-plus.jpeg"
    ],
    specifications: [
      { key: "Funciones", value: "Refrigerante, Desinfectante, Lubricante, Limpiador y Anti-óxido" },
      { key: "Contenido", value: "439 gramos (15.5 oz)" },
      { key: "Origen", value: "Made in USA" }
    ],
    inStock: true,
    featured: true,
    isNew: false
  },
  {
    _id: "prod-secador-tucano",
    name: "Secador Profesional Tucano HairDryer 8600 Watt Motor AC Italiano",
    slug: "secador-profesional-tucano-hairdryer-8600w-motor-ac",
    sku: "TUC-HDR-8600",
    category: catMap["secadores-herramientas-termicas"],
    brand: brandMap["tucano"],
    presentation: "Caja individual con 2 boquillas concentradoras de aire",
    shortDescription: "Motor italiano AC de larga vida útil, 6 combinaciones de temperatura/velocidad y tecnología de secado 50% más rápido.",
    description: "Flujo de aire concentrado y parejo para brushing profesional y alisados térmicos. Reduce el frizz sellando la cutícula capilar gracias a su emisión térmica infrarroja balanceada.",
    images: [
      "/uploads/articulos/secador-tucano-8600w.jpeg"
    ],
    specifications: [
      { key: "Potencia", value: "8600 W alto rendimiento" },
      { key: "Motor", value: "Italian AC Motor de uso intensivo" },
      { key: "Ajustes", value: "6 combinaciones de calor y velocidad + botón frío" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  }
];

// Combine with existing chemical products so we don't lose the coloración section
const existingProducts = JSON.parse(fs.readFileSync(path.join(dataDir, 'products.json'), 'utf8'));
const chemicalProds = existingProducts.filter(p => p.category?.slug === 'coloracion-cosmetica-capilar');

const allProducts = [...newRealProducts, ...chemicalProds];

// Update item counts in categories
categories.forEach(cat => {
  cat.itemCount = allProducts.filter(p => p.category?.slug === cat.slug).length;
});

fs.writeFileSync(path.join(dataDir, 'brands.json'), JSON.stringify(brands, null, 2), 'utf8');
fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2), 'utf8');
fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(allProducts, null, 2), 'utf8');

console.log(`Updated successfully!`);
console.log(`Total brands: ${brands.length}`);
console.log(`Total categories: ${categories.length}`);
console.log(`Total products: ${allProducts.length}`);
