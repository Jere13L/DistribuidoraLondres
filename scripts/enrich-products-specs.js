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
  { _id: 'b-jaguar', name: 'Jaguar Solingen', slug: 'jaguar' },
  { _id: 'b-derby', name: 'Derby Professional', slug: 'derby' }
];

const categories = [
  {
    _id: "cat-maquinas",
    title: "Máquinas de Corte & Trimmers",
    slug: "maquinas-corte-trimmers",
    description: "Clippers inalámbricas, trimmers de terminación, shavers de lámina y kits profesionales de marcas líderes.",
    icon: "Scissors",
    image: "/uploads/articulos/wahl-senior-cordless.jpeg"
  },
  {
    _id: "cat-tijeras",
    title: "Tijeras, Navajas & Filos",
    slug: "tijeras-filos-profesionales",
    description: "Tijeras de corte microdentadas, filo dulce japonés, navajas de barbero y hojas de afeitar profesionales.",
    icon: "Sparkles",
    image: "/uploads/articulos/treet-platinum-100-pack.jpeg"
  },
  {
    _id: "cat-secadores",
    title: "Secadores & Herramientas Térmicas",
    slug: "secadores-herramientas-termicas",
    description: "Secadores de alto rendimiento con motor italiano, planchas alisadoras de titanio cerámico y bucleadoras.",
    icon: "Wind",
    image: "/uploads/articulos/secador-tucano-8600w.jpeg"
  },
  {
    _id: "cat-accesorios",
    title: "Accesorios, Capas & Barbería",
    slug: "accesorios-capas-barberia",
    description: "Capas WMARK, peines de carbono, papel de cuello, rociadores, aerosoles Andis Cool Care y cosmética barberil.",
    icon: "Package",
    image: "/uploads/articulos/capa-wmark-negra.jpeg"
  }
];

const catMap = {};
categories.forEach(c => { catMap[c.slug] = c; });

const brandMap = {};
brands.forEach(b => { brandMap[b.slug] = b; });

const allProducts = [
  // 1. Wahl Magic Clip Común (Roja/Burgundy)
  {
    _id: "prod-wahl-magic-clip-red",
    name: "Máquina Wahl 5-Star Cordless Magic Clip Red Clásica",
    slug: "wahl-5-star-cordless-magic-clip-red",
    sku: "WHL-MGC-RED",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["wahl"],
    presentation: "Caja individual oficial con 8 peines guía (Corte 1.5mm a 25mm)",
    shortDescription: "La clipper de desvanecido más famosa del mundo con cuchilla patentada Stagger-Tooth Crunch y motor rotativo de 5.500 RPM.",
    description: "La Wahl 5-Star Cordless Magic Clip en su icónico acabado borgoña es la máquina de cabecera de las mejores barberías del mundo. Su revolucionaria cuchilla Stagger-Tooth con dientes alternados emite el característico sonido 'Crunch' que le permite al profesional escuchar con precisión cómo y cuándo el cabello está siendo difuminado. Elimina por completo las líneas duras entre sombras y transiciones. Extremadamente ligera (290 gramos) para jornadas prolongadas sin fatiga en la muñeca.",
    images: [
      "/uploads/articulos/wahl-magic-clip-black-gold.jpeg"
    ],
    specifications: [
      { key: "Motor", value: "Rotativo Profesional 5.500 RPM continuo" },
      { key: "Cuchilla", value: "Stagger-Tooth 2161 Crunch Blade de acero cromado" },
      { key: "Batería", value: "Iones de Litio de alta densidad sin efecto memoria" },
      { key: "Autonomía", value: "90 - 100 minutos de trabajo continuo" },
      { key: "Tiempo de Carga", value: "120 minutos (permite uso con o sin cable)" },
      { key: "Largo de Corte", value: "Palanca de ajuste cónico de 0.8 mm a 2.5 mm" },
      { key: "Peso", value: "290 g (ultraliviana y ergonómica)" },
      { key: "Voltaje", value: "100-240V ~ 50/60Hz bivoltaje mundial" },
      { key: "Accesorios", value: "8 peines guía (#0.5 al #8), aceite lubricante, cepillo y protector" },
      { key: "Garantía", value: "Oficial Wahl Professional 2 Años" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 2. Wahl Magic Clip Negra (Black & Gold)
  {
    _id: "prod-wahl-magic-clip-bg",
    name: "Máquina Wahl 5-Star Cordless Magic Clip Black & Gold Edition",
    slug: "wahl-5-star-magic-clip-black-gold",
    sku: "WHL-MGC-BG",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["wahl"],
    presentation: "Caja individual oficial con 8 peines guía premium reforzados",
    shortDescription: "Edición especial Black & Gold con motor rotativo optimizado a 6.500 RPM y cuchilla Stagger-Tooth con recubrimiento de titanio dorado.",
    description: "Versión de alto lujo de la legendaria Magic Clip. Incorpora una actualización de motor con mayor torque para atravesar sin esfuerzo cabellos gruesos y densos. Sus cuchillas cuentan con recubrimiento de titanio y DLC (Diamond-Like Carbon) que las mantiene 4 veces más frías durante el uso prolongado y previene la corrosión. Palanca de ajuste dorada y carcasa negra mate antideslizante.",
    images: [
      "/uploads/articulos/wahl-magic-clip-black-gold.jpeg",
      "/uploads/articulos/wahl-magic-clip-black-gold-2.jpeg"
    ],
    specifications: [
      { key: "Motor", value: "Rotativo High-Speed mejorado a 6.500 RPM" },
      { key: "Cuchilla", value: "Stagger-Tooth bañada en Titanio Oro & DLC antifricción" },
      { key: "Batería", value: "Litio Premium 2.600 mAh" },
      { key: "Autonomía", value: "100+ minutos ininterrumpidos" },
      { key: "Tiempo de Carga", value: "120 minutos con indicador LED inteligente" },
      { key: "Regulación", value: "Palanca cónica metálica 0.8 mm a 2.5 mm" },
      { key: "Peso", value: "290 gramos" },
      { key: "Voltaje", value: "100-240V Bivolt automático" },
      { key: "Accesorios", value: "8 alzas premium con traba metálica, cargador y aceite" },
      { key: "Garantía", value: "Oficial Wahl Professional 2 Años" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 3. Wahl Senior Cordless
  {
    _id: "prod-wahl-senior",
    name: "Máquina Wahl Professional 5-Star Cordless Senior Metal Case",
    slug: "wahl-5-star-cordless-senior-metal-case",
    sku: "WHL-SNR-01",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["wahl"],
    presentation: "Caja individual cerrada oficial (Consulte disponibilidad)",
    shortDescription: "Carcasa metálica de aluminio Heavy Duty, motor rotativo V9000 de 7.000 RPM y máxima potencia para corte al ras.",
    description: "La Wahl Cordless Senior es el estándar indiscutido para barberos exigentes que buscan máxima fuerza. Equipada con la carcasa de aluminio fundido a presión de servicio pesado para un balance inmejorable y control firme, su motor rotativo no disminuye revoluciones ni siquiera en los cabellos más densos o húmedos. Su cuchilla quirúrgica plana 'Fade Blade' es ajustable a cero espacio (zero-gap) para difuminados limpios hasta la piel.",
    images: [
      "/uploads/articulos/wahl-senior-cordless.jpeg",
      "/uploads/articulos/wahl-senior-cordless-2.jpeg"
    ],
    specifications: [
      { key: "Motor", value: "Rotativo V9000 de alto torque a 7.000 RPM" },
      { key: "Carcasa", value: "Aluminio fundido Heavy Duty Metal Case" },
      { key: "Cuchilla", value: "Quirúrgica Fade Blade plana ajustable a 0-gap" },
      { key: "Batería", value: "Iones de Litio industrial de alto rendimiento" },
      { key: "Autonomía", value: "80 minutos continuos de máxima torsión" },
      { key: "Regulación", value: "Palanca metálica estriada 0.8 mm - 2.5 mm" },
      { key: "Peso", value: "365 g (sensación de peso y balance profesional)" },
      { key: "Voltaje", value: "100 - 240V universal" },
      { key: "Accesorios", value: "3 peines guía premium (#0.5, #1, #1.5), peine de corte Wahl y cargador" },
      { key: "Garantía", value: "Oficial Wahl Professional 2 Años" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 4. WMark NG XL
  {
    _id: "prod-wmark-ng-xl",
    name: "Máquina de Corte WMARK NG-XL Professional High-Speed Clipper",
    slug: "wmark-ng-xl-professional-high-speed-clipper",
    sku: "WMK-NG-XL",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["wmark"],
    presentation: "Caja de lujo con base de carga vertical y 6 peines magnéticos",
    shortDescription: "Motor vectorial magnético de 9.000 RPM con microchip de torque constante y cuchilla Fade DLC cerámica.",
    description: "La serie WMARK NG-XL representa la nueva generación de cortadoras de cabello con motor magnético microcontrolado. Detecta automáticamente la resistencia de la masa capilar para acelerar el torque sin frenarse. Cuenta con cuerpo texturado para disipación térmica, base de carga pesada para estación de barbero y pantalla digital LED que indica porcentaje de batería y recordatorio de lubricación.",
    images: [
      "/uploads/articulos/kemei-km2600-clipper.jpeg"
    ],
    specifications: [
      { key: "Motor", value: "Magnético vectorial microchip a 9.000 RPM" },
      { key: "Cuchilla", value: "Acero al carbono DLC combinada con cerámica móvil" },
      { key: "Batería", value: "Litio de 2.500 mAh de larga duración" },
      { key: "Autonomía", value: "150 - 180 minutos de uso intensivo" },
      { key: "Tiempo de Carga", value: "150 minutos en base vertical o cable USB-C" },
      { key: "Pantalla", value: "Display digital LED con porcentaje de carga y alertas" },
      { key: "Regulación", value: "Palanca click-system de 5 posiciones fijas (0.8mm a 3.5mm)" },
      { key: "Accesorios", value: "Base de carga, 6 peines magnéticos (#0.5 al #4), cable USB y cepillo" },
      { key: "Garantía", value: "Oficial WMARK 1 Año" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 5. BaBylissPRO FXONE Gold
  {
    _id: "prod-babyliss-fxone-gold",
    name: "Trimmer BaBylissPRO FXONE All-Metal Li-ion Gold Edition",
    slug: "babylisspro-fxone-all-metal-trimmer-gold",
    sku: "BBY-FXONE-GLD",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["babyliss-pro"],
    presentation: "Caja individual con batería modular FXONE y base de carga rápida",
    shortDescription: "Sistema revolucionario FXONE con batería intercambiable en un toque, motor Ferrari Brushless de 7.200 RPM y cuerpo dorado moleteado.",
    description: "El trimmer por excelencia de la alta barbería internacional. Su chasis dorado totalmente metálico con moleteado antideslizante otorga la máxima precisión para trazar líneas de contorno, diseños de barba y remates milimétricos. Su cuchilla en T de titanio dorado expuesta en 360 grados ofrece visibilidad total y se mantiene fría durante toda la jornada laboral.",
    images: [
      "/uploads/articulos/babylisspro-fxone-gold.jpeg"
    ],
    specifications: [
      { key: "Motor", value: "Digital sin escobillas (Brushless N1) a 7.200 RPM" },
      { key: "Sistema Batería", value: "Batería universal intercambiable con botón de liberación rápida" },
      { key: "Autonomía", value: "150 minutos por batería" },
      { key: "Cuchilla", value: "T-Blade DLC/Titanio Oro 2.0 mm expuesta 360° ajustable a cero" },
      { key: "Carcasa", value: "Aluminio de calidad aeroespacial con relieve moleteado" },
      { key: "Tiempo de Carga", value: "Base de carga rápida con anillo de luz LED" },
      { key: "Voltaje", value: "100 - 240V Bivoltaje internacional" },
      { key: "Accesorios", value: "Base de carga, herramienta de ajuste zero-gap, aceite y protector" },
      { key: "Garantía", value: "Oficial BaBylissPRO 2 Años" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 6. BaBylissPRO FXONE Black
  {
    _id: "prod-babyliss-fxone-black",
    name: "Trimmer BaBylissPRO FXONE All-Metal Li-ion Black Edition",
    slug: "babylisspro-fxone-all-metal-trimmer-black",
    sku: "BBY-FXONE-BLK",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["babyliss-pro"],
    presentation: "Caja con base de carga y batería modular FXONE",
    shortDescription: "Chasis íntegramente negro mate con cuchilla T-Blade Black Graphite hipoalergénica y motor Brushless de 7.200 RPM.",
    description: "La cumbre de la ingeniería para terminaciones de barbería en acabado Black Stealth. El sistema modular FXONE permite retirar la batería con un solo clic y colocar otra cargada al instante para trabajo non-stop en el salón. Su cuchilla de grafito negro minimiza la fricción, opera en temperaturas más bajas y no causa irritación en cuellos sensibles.",
    images: [
      "/uploads/articulos/babylisspro-fxone-black.jpeg"
    ],
    specifications: [
      { key: "Motor", value: "Digital sin escobillas N1 Brushless a 7.200 RPM" },
      { key: "Sistema", value: "FXONE Batería de litio recambiable universal" },
      { key: "Cuchilla", value: "T-Blade Black Graphite 360° de perfil ultra bajo" },
      { key: "Carcasa", value: "Aluminio anodizado negro mate moleteado" },
      { key: "Autonomía", value: "Hasta 2.5 horas continuas por carga" },
      { key: "Zero Gap", value: "Ajustable a 0.0 mm para contornos y líneas láser" },
      { key: "Alimentación", value: "Bivolt automático 100-240V" },
      { key: "Accesorios", value: "Base cargadora individual, lubricante, cepillo de limpieza y protector" },
      { key: "Garantía", value: "Oficial BaBylissPRO 2 Años" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 7. Afeitadora WMark NG-8906
  {
    _id: "prod-wmark-ng8906",
    name: "Afeitadora Shaver WMARK NG-8906 High Speed Barber Shaver 9500 RPM",
    slug: "wmark-ng8906-high-speed-barber-shaver",
    sku: "WMK-NG8906",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["wmark"],
    presentation: "Caja individual con lámina dorada de repuesto y funda de tela",
    shortDescription: "Shaver profesional de doble lámina de titanio hipoalergénica con asombroso motor de 9.500 RPM para afeitado a piel cero.",
    description: "Herramienta fundamental para desvanecer a cero y rasurar cuellos o patillas sin irritaciones. Sus láminas doradas ultra delgadas de titanio flotante capturan el vello en cualquier dirección de corte. Gracias a su potente motor rotativo de 9.500 RPM, elimina el vello rebelde de una sola pasada evitando el enrojecimiento de la piel del cliente.",
    images: [
      "/uploads/articulos/wmark-ng8906-shaver.jpeg",
      "/uploads/articulos/wmark-ng8906-shaver-2.jpeg"
    ],
    specifications: [
      { key: "Motor", value: "Rotativo High-Speed a 9.500 RPM de vibración ultra baja" },
      { key: "Cabezal", value: "Doble lámina flotante de titanio dorado hipoalergénico" },
      { key: "Batería", value: "Iones de Litio de 1.400 mAh" },
      { key: "Autonomía", value: "90 - 120 minutos de uso continuo" },
      { key: "Carga", value: "Puerto USB Tipo-C universal de carga rápida (2 horas)" },
      { key: "Carcasa", value: "ABS de alta resistencia con empuñadura ergonómica" },
      { key: "Accesorios", value: "Cabezal de repuesto, cable USB-C, cepillo limpiador y funda" },
      { key: "Garantía", value: "Oficial WMARK 1 Año" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 8. Afeitadora VGR V-325
  {
    _id: "prod-vgr-v325-shaver",
    name: "Afeitadora Rotativa VGR V-325 Men's Shaver Triple Cabezal 3D",
    slug: "afeitadora-rotativa-vgr-v-325-triple-cabezal",
    sku: "VGR-V325",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["vgr"],
    presentation: "Caja individual con trimmer de patillas desplegable y cable USB",
    shortDescription: "Afeitadora eléctrica con 3 cabezales rotativos 3D flotantes independientes, resistencia al agua IPX7 y display LED inteligente.",
    description: "La afeitadora VGR V-325 ofrece un afeitado confortable y al ras gracias a su sistema de triple cuchilla rotativa con seguimiento dinámico del contorno facial y cuello. Completamente impermeable con certificación IPX7, permite uso en seco o con espuma/gel de afeitar, y lavado directo bajo la canilla. Incorpora recortador emergente para patillas y bigote en la parte posterior.",
    images: [
      "/uploads/articulos/vgr-v315-shaver.jpeg"
    ],
    specifications: [
      { key: "Sistema de Corte", value: "3 cabezales rotativos flotantes con doble anillo de corte" },
      { key: "Motor", value: "7.000 RPM de alta eficiencia y bajo ruido" },
      { key: "Impermeabilidad", value: "Certificación IPX7 100% lavable bajo agua" },
      { key: "Batería", value: "Litio recargable de 1.200 mAh" },
      { key: "Autonomía", value: "100 minutos continuos de uso" },
      { key: "Tiempo de Carga", value: "1.5 horas mediante conector USB" },
      { key: "Pantalla", value: "LED con porcentaje de batería, bloqueo de viaje y recordatorio de lavado" },
      { key: "Trimmer Integrado", value: "Cuchilla popup desplegable para patillas" },
      { key: "Garantía", value: "Oficial VGR 1 Año" }
    ],
    inStock: true,
    featured: false,
    isNew: true
  },

  // 9. VGR V-315 Shaver Triple Cabezal Magnético
  {
    _id: "prod-vgr-v315-shaver",
    name: "Afeitadora Rotativa VGR V-315 Men's Shaver Triple Cabezal Magnético",
    slug: "vgr-v315-mens-shaver-triple-cabezal-magnetico",
    sku: "VGR-V315",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["vgr"],
    presentation: "Caja individual con cable de carga USB y cepillo limpiador",
    shortDescription: "Cabezal magnético desmontable de 3 cuchillas rotativas, pantalla digital y cuerpo ergonómico premium.",
    description: "Innovador diseño con fijación magnética del cabezal que facilita la limpieza y desinfección en segundos sin trabas mecánicas. Sus láminas microperforadas atrapan cabellos en distintas direcciones proporcionando un rasurado uniforme y suave sin jalones.",
    images: [
      "/uploads/articulos/vgr-v315-shaver.jpeg"
    ],
    specifications: [
      { key: "Cabezal", value: "Magnético 'Quick-Release' desmontable en un segundo" },
      { key: "Cuchillas", value: "Triple cuchilla circular autoafilable de acero inoxidable" },
      { key: "Autonomía", value: "90 minutos con batería de litio" },
      { key: "Carga", value: "USB universal para viajes y salón (1 hora de carga)" },
      { key: "Display", value: "Indicador numérico de batería restante y bloqueo de seguridad" },
      { key: "Garantía", value: "Oficial VGR 1 Año" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 10. Tijera Jaguar Entresacar 28 Dientes
  {
    _id: "prod-jaguar-entresacar",
    name: "Tijera Jaguar Pre Style Relax Entresacar 28 Dientes 5.5 Pulgadas",
    slug: "tijera-jaguar-pre-style-relax-entresacar-28-dientes",
    sku: "JAG-ENT-28D",
    category: catMap["tijeras-filos-profesionales"],
    brand: brandMap["jaguar"],
    presentation: "Estuche individual original Jaguar Solingen con anillos reductores",
    shortDescription: "Tijera de pulir y entresacar profesional con 28 dientes microdentados de acero alemán forjado y templado en hielo.",
    description: "Fabricada en Solingen, Alemania, la tijera Jaguar Pre Style Relax de 28 dientes con muescas prismáticas garantiza una sensación de corte suave y un desvanecido de volumen sin enganches. Su diseño de mango offset ergonómico relaja los músculos del brazo, cuello y hombro del barbero. Incluye tornillo plano Vario Screw ajustable con moneda.",
    images: [
      "/uploads/articulos/treet-platinum-100-pack.jpeg"
    ],
    specifications: [
      { key: "Origen", value: "Solingen, Alemania (100% Original)" },
      { key: "Dientes", value: "28 dientes de entresacar con microdentado prismático" },
      { key: "Material", value: "Acero inoxidable alemán especial templado Friodur en hielo" },
      { key: "Medida", value: "5.5 pulgadas (14 cm)" },
      { key: "Tornillo", value: "Sistema Vario Screw para regulación exacta de tensión" },
      { key: "Mango", value: "Diseño Offset ergonómico con apoyadedo desmontable" },
      { key: "Acabado", value: "Satén pulido mate anticorrosión" },
      { key: "Garantía", value: "Jaguar Solingen Oficial" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 11. Tijera Jaguar Filo Dulce
  {
    _id: "prod-jaguar-filo-dulce",
    name: "Tijera Jaguar Pre Style Ergo Filo Dulce Profesional 5.5 Pulgadas",
    slug: "tijera-jaguar-pre-style-ergo-filo-dulce",
    sku: "JAG-FD-55",
    category: catMap["tijeras-filos-profesionales"],
    brand: brandMap["jaguar"],
    presentation: "Estuche individual oficial Jaguar Solingen con apoyadedo",
    shortDescription: "Tijera de corte recto y desmechado de precisión con filo dulce pulido de acero inoxidable alemán templado en hielo.",
    description: "La Jaguar Pre Style Ergo es el instrumento de precisión indispensable para todo estilista y barbero. Su filo dulce pulido ('honing') permite realizar cortes precisos punta a punta y técnicas de slice / deslizamiento sin tirar del cabello. El acero inoxidable de Solingen con tratamiento en frío asegura una durabilidad extrema del afilado.",
    images: [
      "/uploads/articulos/treet-platinum-200-blades.jpeg"
    ],
    specifications: [
      { key: "Origen", value: "Solingen, Alemania" },
      { key: "Tipo de Filo", value: "Filo Dulce pulido de precisión para corte y desmechado" },
      { key: "Material", value: "Acero inoxidable forjado alemán de alta densidad" },
      { key: "Medida", value: "5.5 pulgadas (14 cm) clásica" },
      { key: "Mango", value: "Diseño Classic simétrico con apoyadedo extraíble y anillos suaves" },
      { key: "Ajuste", value: "Tornillo Vario regulable para tensión personalizada" },
      { key: "Garantía", value: "Jaguar Solingen Oficial" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 12. Kemei KM-2600
  {
    _id: "prod-kemei-km2600",
    name: "Máquina de Corte Kemei KM-2600 Cordless Precision Fade Clipper",
    slug: "kemei-km2600-cordless-precision-fade-clipper",
    sku: "KMI-KM2600",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["kemei"],
    presentation: "Caja individual con 4 peines guía (3, 6, 10, 13 mm) y cargador",
    shortDescription: "Motor rotativo silencioso de 6.000 RPM, cuchilla de acero inoxidable autoafilable y batería de litio de 120 minutos.",
    description: "Una de las máquinas más confiables para iniciación profesional y trabajo continuo en barbería. Ofrece un equilibrio perfecto entre potencia, bajo peso y confiabilidad mecánica. Su cuchilla de acero al carbono regulable permite realizar desvanecidos con suavidad y precisión.",
    images: [
      "/uploads/articulos/kemei-km2600-clipper.jpeg"
    ],
    specifications: [
      { key: "Motor", value: "Rotativo 6.000 RPM de alta torsión silencioso" },
      { key: "Cuchilla", value: "Acero inoxidable cromado autoafilable" },
      { key: "Batería", value: "Litio de 2.000 mAh sin efecto memoria" },
      { key: "Autonomía", value: "120 minutos continuos" },
      { key: "Tiempo de Carga", value: "90 minutos con luz piloto LED" },
      { key: "Regulación", value: "Palanca de ajuste milimétrico de 0.8 a 2.0 mm" },
      { key: "Voltaje", value: "100-240V Bivoltaje" },
      { key: "Garantía", value: "Oficial Kemei 6 Meses" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 13. Patillera Kemei KM-2299
  {
    _id: "prod-kemei-km2299",
    name: "Trimmer Kemei KM-2299 Professional Hair Clipper / Trimmer",
    slug: "kemei-km2299-professional-hair-clipper-trimmer",
    sku: "KMI-KM2299",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["kemei"],
    presentation: "Caja individual con 3 peines guía (1, 2, 3 mm) y cable USB",
    shortDescription: "Trimmer de acabado fino con cuchilla T-Blade DLC negra ultra delgada (0.1 mm) y motor de 7.500 RPM.",
    description: "Famosa en la comunidad de barberos por su excelente corte al ras ('zero-gap ready') de fábrica. Su cuchilla expuesta en T permite delinear contornos de barba, patillas y nucas con nitidez absoluta. Su motor de alta velocidad garantiza cortes limpios sin tirones.",
    images: [
      "/uploads/articulos/kemei-km2299-clipper.jpeg",
      "/uploads/articulos/kemei-km2299-clipper-2.jpeg"
    ],
    specifications: [
      { key: "Motor", value: "Rotativo High-Speed a 7.500 RPM" },
      { key: "Cuchilla", value: "T-Blade DLC Black de 40mm con corte al ras de 0.1 mm" },
      { key: "Batería", value: "Litio 1.200 mAh recargable" },
      { key: "Autonomía", value: "180 minutos de uso continuo" },
      { key: "Carga", value: "Puerto USB Tipo-C universal" },
      { key: "Peso", value: "180 gramos (ultraliviana para trazos artísticos)" },
      { key: "Garantía", value: "Oficial Kemei 6 Meses" }
    ],
    inStock: true,
    featured: true,
    isNew: false
  },

  // 14. Filo Treet Platinum 100
  {
    _id: "prod-treet-platinum-100",
    name: "Hojas de Afeitar Treet Platinum Super Stainless (Caja x 100 Filos)",
    slug: "hojas-de-afeitar-treet-platinum-super-stainless-100",
    sku: "TRT-PLT-100",
    category: catMap["tijeras-filos-profesionales"],
    brand: brandMap["treet"],
    presentation: "Caja exhibidora de 100 medias hojas individuales para barbero",
    shortDescription: "Hojas partidas de fábrica de acero sueco con triple recubrimiento Platinum & PTFE para máximo filo y suavidad.",
    description: "Las hojas de afeitar Treet Platinum son el insumo predilecto de los barberos profesionales por su equilibrio entre filo duradero y protección contra la irritación cutánea. Vienen partidas al medio de fábrica listas para colocar en navajines estándar sin riesgo de accidentes al doblarlas.",
    images: [
      "/uploads/articulos/treet-platinum-100-pack.jpeg",
      "/uploads/articulos/treet-platinum-100-londres.jpeg"
    ],
    specifications: [
      { key: "Material", value: "Acero inoxidable sueco templado de máxima pureza" },
      { key: "Recubrimiento", value: "Triple capa de Platino, Cromo y PTFE (Teflón) antifricción" },
      { key: "Formato", value: "Medias hojas partidas de fábrica listas para navaja" },
      { key: "Cantidad", value: "100 hojas de afeitar envueltas en papel parafinado individual" },
      { key: "Compatibilidad", value: "Todos los navajines y portanavajas de barbería estándar" }
    ],
    inStock: true,
    featured: true,
    isNew: false
  },

  // 15. Filo Treet Platinum 200
  {
    _id: "prod-treet-platinum-200",
    name: "Hojas de Afeitar Treet Platinum Super Stainless (Pack x 200)",
    slug: "hojas-de-afeitar-treet-platinum-super-stainless-200",
    sku: "TRT-PLT-200",
    category: catMap["tijeras-filos-profesionales"],
    brand: brandMap["treet"],
    presentation: "Pack cerrado x 20 cajitas de 10 unidades (200 hojas enteras)",
    shortDescription: "Presentación en pack de 200 hojas enteras doble filo para salones de alto volumen de afeitado.",
    description: "Opción económica de abastecimiento a granel para salones, escuelas de barbería y distribuidores. Cada hoja de doble filo rinde dos servicios profesionales. El tratamiento al platino garantiza cortes indoloros y afeitados al ras de máxima pulcritud.",
    images: [
      "/uploads/articulos/treet-platinum-200-blades.jpeg"
    ],
    specifications: [
      { key: "Cantidad", value: "200 hojas dobles enteras (rinde 400 usos)" },
      { key: "Empaque", value: "20 cajitas dispenser x 10 hojas envueltas" },
      { key: "Acero", value: "Sueco inoxidable con triple coating de platino" },
      { key: "Destino", value: "Salones y barberías de alta rotación" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 16. Filos Derby Extra 100
  {
    _id: "prod-filos-derby-100",
    name: "Hojas de Afeitar Derby Extra Professional Single Edge (Caja x 100)",
    slug: "hojas-de-afeitar-derby-extra-professional-100",
    sku: "DRB-EXT-100",
    category: catMap["tijeras-filos-profesionales"],
    brand: brandMap["derby"],
    presentation: "Caja cerrada de 100 filos partidos individuales en papel parafinado",
    shortDescription: "Cuchillas de afeitar profesionales Derby Extra con revestimiento de cromo, cerámica, platino y polímero.",
    description: "Reconocidas a nivel mundial por su extrema suavidad en el deslizamiento sobre pieles sensibles. Las cuchillas Derby Extra están elaboradas con tiras de acero inoxidable sueco templado y electrostáticamente tratadas con 5 capas de aleaciones protectoras para evitar raspaduras y cortes accidentales.",
    images: [
      "/uploads/articulos/treet-platinum-100-londres.jpeg"
    ],
    specifications: [
      { key: "Procedencia", value: "Turquía (Derby Professional Original)" },
      { key: "Recubrimiento", value: "Cromo, Cerámica, Platino, Tungsteno y Polímero" },
      { key: "Formato", value: "Single Edge (media hoja partida de fábrica)" },
      { key: "Cantidad", value: "100 hojas de afeitar individuales protegidas" },
      { key: "Piel", value: "Ideal para clientes con tendencia a foliculitis o piel sensible" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 17. Capas WMark
  {
    _id: "prod-capa-wmark",
    name: "Capa de Barbería WMARK Professional Impermeable y Antiestática",
    slug: "capa-de-barberia-wmark-professional",
    sku: "WMK-CAP-01",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["wmark"],
    presentation: "Unidad individual en bolsa protectora con cierre hermético",
    shortDescription: "Capa de corte profesional 140x160cm de poliéster siliconado que repele el pelo y el agua con cuello elástico ajustable.",
    description: "Capa de gran tamaño para cobertura total del cliente en sillón de barbero. La textura sedosa de su tela de poliéster de alta densidad impide que los pelos se claven en el tejido y resbala cualquier salpicadura líquida. Cuello con broches metálicos regulables y borde elástico para ajuste anatómico sin estrangular.",
    images: [
      "/uploads/articulos/capa-wmark-negra.jpeg",
      "/uploads/articulos/capa-wmark-blanca.jpeg",
      "/uploads/articulos/capa-wmark-negra-2.jpeg"
    ],
    specifications: [
      { key: "Dimensiones", value: "140 cm de ancho x 160 cm de largo (cobertura total)" },
      { key: "Material", value: "Poliéster siliconado antiestático y repelente al agua" },
      { key: "Cierre", value: "Broches metálicos inoxidables con cuello elástico adaptable" },
      { key: "Lavado", value: "Apta para lavarropas, secado ultrarrápido sin plancha" },
      { key: "Colores", value: "Disponible en Negro clásico con logo y Blanco Barber" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 18. Papel de cuello Luke Pack x 5
  {
    _id: "prod-luke-paper",
    name: "Papel Cuello Elástico Autoadhesivo Luke Paper Professional (Pack x 5 Rollos)",
    slug: "papel-cuello-elastico-autoadhesivo-luke-paper",
    sku: "LUK-NCK-100",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Pack cerrado termoencogible x 5 rollos (500 tiras en total)",
    shortDescription: "Tiras higiénicas de celulosa elástica con adhesivo azul médico para evitar el contacto directo del cuello con la capa.",
    description: "Insumo obligatorio para la higiene en salones y barberías modernas. Absorbe el sudor y evita que los cabellos cortados ingresen bajo la ropa. Se estira hasta un 200% de su largo original sin rasgarse y se fija firmemente gracias a sus extremos adhesivos termoestables.",
    images: [
      "/uploads/articulos/luke-paper-cuello.jpeg"
    ],
    specifications: [
      { key: "Presentación", value: "Pack x 5 rollos (100 tiras precortadas por rollo = 500 tiras)" },
      { key: "Elasticidad", value: "Celulosa de fibra larga de alta elongación (hasta 200%)" },
      { key: "Adhesivo", value: "Cinta adhesiva médica hipoalergénica de fijación instantánea" },
      { key: "Impermeabilidad", value: "Tratamiento repelente a la humedad y transpiración" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 19. Papel Cuello Rollo Suelto Individual x 1u
  {
    _id: "prod-papel-cuello-suelto",
    name: "Papel de Cuello Elástico Barber Rollo Suelto Individual (100 Tiras)",
    slug: "papel-de-cuello-elastico-barber-rollo-individual",
    sku: "LUK-NCK-01",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Rollo individual precortado cerrado x 100 tiras",
    shortDescription: "Rollo individual de 100 tiras de papel cuello elástico con autoadhesivo para reposición rápida.",
    description: "Ideal para compras fraccionadas o barberías que desean reponer stock semanalmente. Mantiene la misma calidad premium de celulosa con resistencia al estiramiento y adhesión firme para una atención higiénica al cliente.",
    images: [
      "/uploads/articulos/luke-paper-cuello.jpeg"
    ],
    specifications: [
      { key: "Contenido", value: "1 Rollo individual con 100 tiras precortadas" },
      { key: "Uso", value: "Protección higiénica desechable contra cabellos y sudor" },
      { key: "Fijación", value: "Puntos autoadhesivos de agarre rápido" },
      { key: "Elasticidad", value: "Se adapta a cuellos desde niños hasta adultos" }
    ],
    inStock: true,
    featured: false,
    isNew: true
  },

  // 20. WMark NG-8634 Kit (Clipper + Trimmer)
  {
    _id: "prod-wmark-ng8634-kit",
    name: "Kit Barbería WMARK NG-8634 Panther Edition (Clipper + Trimmer)",
    slug: "kit-barberia-wmark-ng8634-panther-edition-clipper-trimmer",
    sku: "WMK-NG8634-KIT",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["wmark"],
    presentation: "Caja combo de lujo con estación de carga dual y alzas completas",
    shortDescription: "Combo definitivo para barbero: máquina de corte de 6.500 RPM + trimmer de contorno de 7.000 RPM en una sola base de recarga simultánea.",
    description: "El kit WMARK NG-8634 reúne las dos herramientas indispensables del puesto de trabajo en un set homogéneo y de altísima presencia. La clipper cuenta con palanca de micro-ajuste y cuchilla Fade para transiciones limpias, mientras que el trimmer incorpora cuchilla en T ultra precisa de 0.1 mm para dibujos y líneas rectas. Ambos se cargan juntos sobre una sólida base vertical.",
    images: [
      "/uploads/articulos/wmark-ng8634-barber-kit.jpeg"
    ],
    specifications: [
      { key: "Clipper Motor", value: "Rotativo 6.500 RPM con batería de litio 2.500 mAh (240 min autonomía)" },
      { key: "Trimmer Motor", value: "Rotativo 7.000 RPM con batería de litio 2.000 mAh (180 min autonomía)" },
      { key: "Cuchillas", value: "Acero al carbono 440C con recubrimiento cerámico DLC" },
      { key: "Estación de Carga", value: "Base dual para recargar ambas máquinas en simultáneo" },
      { key: "Accesorios Clipper", value: "6 peines guía magnéticos premium (#0.5 al #4)" },
      { key: "Accesorios Trimmer", value: "3 peines guía (1.5mm, 3mm, 4.5mm)" },
      { key: "Garantía", value: "Oficial WMARK 1 Año" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 21. Cuchilla Wahl Cerámica
  {
    _id: "prod-cuchillas-camo",
    name: "Cuchillas Cerámicas Móviles Fade para Máquinas Wahl (Camufladas y Blancas)",
    slug: "cuchillas-ceramicas-moviles-fade-wahl",
    sku: "CCH-CER-CAMO",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Blíster individual protector con esponja antichoque",
    shortDescription: "Cuchilla cerámica de Zirconio de repuesto para máquinas Wahl. Disipa la temperatura un 75% más que el acero tradicional.",
    description: "Repuesto indispensable para actualizar máquinas Wahl Magic Clip, Cordless Senior, Super Taper y modelos compatibles. La cerámica de óxido de zirconio ofrece una retención de filo significativamente superior al metal, no se corroe con el agua ni los desinfectantes y mantiene la máquina fría incluso durante degradados prolongados.",
    images: [
      "/uploads/articulos/cuchilla-ceramica-azul-camo.jpeg",
      "/uploads/articulos/cuchilla-ceramica-roja-camo.jpeg",
      "/uploads/articulos/cuchilla-ceramica-verde-camo.jpeg"
    ],
    specifications: [
      { key: "Material", value: "Cerámica de Zirconio de grado quirúrgico ultra duro" },
      { key: "Compatibilidad", value: "Wahl Cordless Magic Clip, Senior, Super Taper, Legend y Kemei 2600" },
      { key: "Temperatura", value: "Mantiene la zona de corte 75% más fría que las cuchillas 100% de acero" },
      { key: "Resistencia", value: "Inmune a la oxidación provocada por rociadores o desinfectantes" },
      { key: "Diseño", value: "Variantes en Camuflado Azul, Rojo, Verde y Blanco Puro" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 22. After Shave Clásica Infinity Look's
  {
    _id: "prod-infinity-locion",
    name: "Loción Pós-Barba Infinity Look's Hair Classic Barber Series Menthol 120ml",
    slug: "locion-pos-barba-infinity-looks-hair-classic-menthol-120ml",
    sku: "INF-POS-120",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["infinity"],
    presentation: "Botella individual 120ml con pico vertedor (Caja x 12 unidades)",
    shortDescription: "Loción astringente y refrescante mentolada clásica con alcohol desinfectante para cierre inmediato de poros.",
    description: "El toque final del auténtico afeitado de barbería. Formulada con mentol cristalizado y agentes humectantes que alivian al instante la sensación de tirantez e irritación provocada por la navaja. Desinfecta microcortes, cierra los poros y deja una estela aromática fresca y varonil.",
    images: [
      "/uploads/articulos/infinity-locion-posbarba-menthol.jpeg",
      "/uploads/articulos/infinity-locion-posbarba-2.jpeg"
    ],
    specifications: [
      { key: "Volumen", value: "120 ml (formato práctico para estación de trabajo)" },
      { key: "Efecto", value: "Cierre de poros inmediato, acción astringente y desinfectante" },
      { key: "Fragancia", value: "Classic Barber Menthol refrescante de alta fijación" },
      { key: "Ingredientes Activos", value: "Mentol natural, glicerina humectante y alcohol etílico cosmético" },
      { key: "Formato Profesional", value: "Caja cerrada por 12 unidades para reventa o uso en salón" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 23. Cepillo Fade
  {
    _id: "prod-cepillo-fade",
    name: "Cepillo Fade Brush de Cerdas Suaves para Limpieza de Degradados",
    slug: "cepillo-fade-brush-limpieza-degradados",
    sku: "CEP-FAD-BLK",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Blíster individual protector (Consulte precio por docena)",
    shortDescription: "Cerdas de nylon micro-suaves de alta densidad con mango ergonómico de madera para despejar cabellos sin irritar.",
    description: "Herramienta técnica esencial durante la ejecución de sombreados y desvanecidos (fades). Sus cerdas suaves barren de manera instantánea las partículas de pelo cortado sobre el cuero cabelludo, permitiendo al profesional visualizar con total claridad cualquier imperfección en la línea de sombra sin enrojecer la piel del cliente.",
    images: [
      "/uploads/articulos/cepillos-fade-brush.jpeg"
    ],
    specifications: [
      { key: "Cerdas", value: "Nylon suave de alta densidad hipoalergénico que no raspa" },
      { key: "Mango", value: "Madera lacada negra ergonómica con cavidad para pulgar" },
      { key: "Dimensiones", value: "14 cm de largo x 2.5 cm de ancho" },
      { key: "Función", value: "Barrido visual continuo de desvanecidos Fade y Taper" },
      { key: "Desinfección", value: "Apto para pulverizado frecuente con alcohol o Cool Care" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 24. Cepillo Talquero Barber
  {
    _id: "prod-cepillo-talquero",
    name: "Cepillo Talquero Quita Pelos Barber con Depósito y Pulsador de Talco",
    slug: "cepillo-talquero-quita-pelos-barber-con-dispenser",
    sku: "CEP-TALQ-01",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Caja individual con tapa protectora antipolvo",
    shortDescription: "Cepillo de cuello y nuca con depósito interior recargable y botón dosificador de talco para un acabado impecable.",
    description: "Combina la suavidad de un plumero quita pelos tradicional con un práctico dispenser integrado. Al presionar el pulsador central del mango, libera una suave niebla de talco directamente sobre las cerdas, permitiendo secar la transpiración del cuello y despegar cabellos adheridos sin necesidad de frotar en exceso.",
    images: [
      "/uploads/articulos/cepillos-fade-brush.jpeg"
    ],
    specifications: [
      { key: "Cerdas", value: "Fibras sintéticas ultrasuaves de efecto plumero" },
      { key: "Depósito", value: "Compartimento interno transparente recargable a rosca" },
      { key: "Mecanismo", value: "Pulsador de fuelle suave que dosifica la salida del talco" },
      { key: "Base", value: "Apoyo vertical para estación de corte" },
      { key: "Higiene", value: "Cerdas desmontables para lavado y desinfección periódica" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 25. Peine 18cm Milimetrado
  {
    _id: "prod-peine-18cm",
    name: "Peine de Corte Profesional 18cm con Regla Milimétrica Graduada",
    slug: "peine-de-corte-profesional-18cm-regla-milimetrica",
    sku: "PN-MIL-18CM",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Funda individual transparente (Pack x 6 o x 12 unidades)",
    shortDescription: "Peine técnico de fibra de carbono resistente al calor (220°C) con escala milimétrica grabada con láser para cortes simétricos.",
    description: "Diseñado para barberos técnicos que buscan exactitud matemática en sus secciones. Cuenta con una regla graduada en centímetros y milímetros en el lomo para verificar largos parejos en cúspide y laterales. Sus dientes con terminación redondeada protegen el cuero cabelludo y desenredan sin partir la hebra capilar.",
    images: [
      "/uploads/articulos/peine-carbono-profesional.jpeg"
    ],
    specifications: [
      { key: "Largo Total", value: "18.5 cm (tamaño estándar para corte y tijera sobre peine)" },
      { key: "Material", value: "Compuesto de Fibra de Carbono antiestático y antifrizz" },
      { key: "Resistencia Térmica", value: "Soporta temperaturas de secador y plancha hasta 220°C" },
      { key: "Graduación", value: "Escala milimétrica grabada con láser indeleble" },
      { key: "Dientes", value: "Mitad finos de precisión y mitad anchos para tensión media" }
    ],
    inStock: true,
    featured: false,
    isNew: true
  },

  // 26. Alzas de Plástico Universales
  {
    _id: "prod-alzas-plastico",
    name: "Set de Alzas / Peines Guía de Plástico Universales #1 al #8",
    slug: "set-de-alzas-peines-guia-plastico-universales",
    sku: "ALZ-PLS-UNIV",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Organizador de acrílico con 8 peines guía (3mm a 25mm)",
    shortDescription: "Juego completo de 8 alzas de plástico de alta flexibilidad y enganche firme compatibles con todas las clippers estándar.",
    description: "Juego completo de peines guía con código numérico y milimétrico en relieve. Fabricados en polímero plástico de gran elasticidad que no se quiebra al encastrar y con dientes curvos que deslizan sin arañar la cabeza. Incluye las medidas estándar: #1 (3mm), #2 (6mm), #3 (10mm), #4 (13mm), #5 (16mm), #6 (19mm), #7 (22mm) y #8 (25mm).",
    images: [
      "/uploads/articulos/wahl-peine-guia-premium-05.jpeg"
    ],
    specifications: [
      { key: "Medidas Incluidas", value: "#1 (3mm), #2 (6mm), #3 (10mm), #4 (13mm), #5 (16mm), #6 (19mm), #7 (22mm), #8 (25mm)" },
      { key: "Material", value: "Polímero de alta resistencia a la tracción y químicos" },
      { key: "Compatibilidad", value: "Máquinas Wahl, Kemei, VGR, WMARK, Babyliss y similares" },
      { key: "Organizador", value: "Base contenedora transparente con divisiones numeradas" }
    ],
    inStock: true,
    featured: false,
    isNew: true
  },

  // 27. Andis Cool Care Plus
  {
    _id: "prod-andis-cool-care",
    name: "Andis Cool Care Plus 5 in 1 Aerosol para Cuchillas 439g",
    slug: "andis-cool-care-plus-5-in-1-aerosol",
    sku: "AND-CCL-439",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["andis"],
    presentation: "Lata aerosol 439g / 15.5 oz (Caja cerrada x 12 unidades)",
    shortDescription: "Aerosol técnico multifunción 5 en 1: refrigerante instantáneo, desinfectante bactericida, lubricante, limpiador y antioxidante.",
    description: "El producto más importante para el mantenimiento preventivo y la bioseguridad en el salón. Su fórmula de alta presión pulveriza entre los dientes de la cuchilla, expulsando los restos de cabello mientras enfría el metal en cuestión de segundos. Desinfecta contra bacterias, hongos y virus, lubrica el tren móvil para reducir el desgaste del motor y deposita una película que evita el óxido.",
    images: [
      "/uploads/articulos/andis-cool-care-plus.jpeg"
    ],
    specifications: [
      { key: "Acción 5 en 1", value: "Refrigera, Desinfecta, Lubrica, Limpia y Protege contra el óxido" },
      { key: "Capacidad", value: "439 g (15.5 oz) de alto rendimiento" },
      { key: "Pico Rociador", value: "Eyección de alta presión Comfort Tip para expulsar pelos entre cuchillas" },
      { key: "Eficacia", value: "Fórmula virucida, fungicida y bactericida grado hospitalario" },
      { key: "Fabricación", value: "Made in USA (Andis Company)" }
    ],
    inStock: true,
    featured: true,
    isNew: false
  },

  // 28. Dom Pelo Shaving Gel
  {
    _id: "prod-dom-pelo-shaving",
    name: "Gel de Afeitar Dom Pelo Shaving Gel Mentolado 500g",
    slug: "gel-de-afeitar-dom-pelo-shaving-gel-mentolado-500g",
    sku: "DMP-SHV-500",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["dom-pelo"],
    presentation: "Pote profesional 500g con válvula dosificadora 'Pump'",
    shortDescription: "Gel de afeitado translúcido de alta lubricación con mentol y aloe vera para un deslizamiento óptimo de la navaja.",
    description: "A diferencia de las espumas tradicionales que tapan la línea de corte, la fórmula 100% transparente de Dom Pelo Shaving Gel permite al barbero ver exactamente por dónde pasa el filo de la navaja, facilitando contornos geométricos, barbas perfiladas y cejas perfectas. Su textura enriquecida genera un film sedoso que reduce a cero los tirones e hidrata la piel.",
    images: [
      "/uploads/articulos/dom-pelo-shaving-gel-500g.jpeg"
    ],
    specifications: [
      { key: "Contenido", value: "500 gramos (alto rendimiento para más de 120 servicios)" },
      { key: "Textura", value: "Gel cristalino no espumígeno de máxima visibilidad" },
      { key: "Componentes", value: "Mentol refrescante, extracto de Aloe Vera y humectantes" },
      { key: "Dosificador", value: "Válvula 'Pump' higiénica que evita contaminación cruzada" },
      { key: "Formato Profesional", value: "Caja x 12 potes para distribución" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 29. Porta Navaja Custom
  {
    _id: "prod-navajas-custom",
    name: "Navajas de Barbero Personalizadas Londress Series (Calavera, Oro, Joker)",
    slug: "navajas-de-barbero-personalizadas-londress-series",
    sku: "NVJ-PRO-CUST",
    category: catMap["tijeras-filos-profesionales"],
    brand: brandMap["londress-pro"],
    presentation: "Estuche de cuero sintético individual con traba de seguridad",
    shortDescription: "Portanavajas profesionales de acero inoxidable con seguro de clip oscilante y diseños grabados de barbería.",
    description: "Diseñadas para ofrecer un balance perfecto en la mano del profesional. Su brazo de acero inoxidable cuenta con sistema de traba a bisagra de fácil inserción para medias hojas de afeitar, garantizando firmeza absoluta del filo sin oscilaciones durante el rasurado.",
    images: [
      "/uploads/articulos/navajas-barber-custom.jpeg"
    ],
    specifications: [
      { key: "Material", value: "Acero inoxidable 420 pulido con mango grabado" },
      { key: "Sistema de Traba", value: "Clip oscilante reforzado antideslizamiento" },
      { key: "Compatibilidad", value: "Medias hojas de afeitar estándar (Treet, Derby, Shark, Gillette)" },
      { key: "Peso", value: "55 gramos (equilibrio perfecto entre peso y maniobrabilidad)" },
      { key: "Diseños", value: "Variantes en grabado Skull Calavera, Gold Luxury y Dark Joker" }
    ],
    inStock: true,
    featured: true,
    isNew: false
  },

  // 30. Secador Tucano 8600W
  {
    _id: "prod-secador-tucano",
    name: "Secador Profesional Tucano HairDryer 8600 Watt Motor AC Italiano",
    slug: "secador-profesional-tucano-hairdryer-8600w",
    sku: "TUC-HDR-8600",
    category: catMap["secadores-herramientas-termicas"],
    brand: brandMap["tucano"],
    presentation: "Caja individual con 2 boquillas concentradoras de aire",
    shortDescription: "Potencia térmica extrema con motor AC italiano de larga duración, generador de iones negativos y golpe de aire frío.",
    description: "Herramienta térmica de alto flujo diseñada para el ritmo continuo de salones y barberías. Su potente motor de corriente alterna genera una presión de aire concentrada que reduce los tiempos de secado a la mitad, mientras su emisor cerámico de iones negativos sella la cutícula y elimina el frizz. Cable extralargo de 3 metros con protección antitorsión.",
    images: [
      "/uploads/articulos/secador-tucano-8600w.jpeg"
    ],
    specifications: [
      { key: "Motor", value: "AC Profesional Italiano de servicio continuo (más de 2.000 horas)" },
      { key: "Potencia Nominal", value: "8600 Watt max power de secado ultrarrápido" },
      { key: "Temperaturas", value: "3 niveles de temperatura + 2 velocidades de ventilación" },
      { key: "Golpe de Frío", value: "Botón 'Cool Shot' instantáneo para fijar peinados y styling" },
      { key: "Tecnología", value: "Rejilla de Cerámica & Turmalina generadora de iones" },
      { key: "Cable", value: "3 metros de longitud con refuerzo de goma y ojal para colgar" },
      { key: "Garantía", value: "Oficial Tucano 1 Año" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 31. VGR V-938 AFA Trimmer
  {
    _id: "prod-vgr-v938-afa",
    name: "Trimmer Corporal VGR V-938 Edición Oficial AFA Selección Argentina",
    slug: "trimmer-corporal-vgr-v938-edicion-afa",
    sku: "VGR-V938-AFA",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["vgr"],
    presentation: "Caja especial coleccionable AFA con base de carga y 3 peines",
    shortDescription: "Edición conmemorativa tricampeones mundiales con cuchilla de cerámica redondeada 'Skin-Safe' y resistencia IPX7.",
    description: "Trimmer para terminaciones de barba y depilación corporal masculina. Su cuchilla móvil cerámica con puntas suavemente redondeadas previene pellizcos, cortes e irritaciones en zonas delicadas. Viene con los colores y escudo oficial de la Selección Argentina de Fútbol, luz LED de guía frontal y base de carga con conexión USB.",
    images: [
      "/uploads/articulos/vgr-v938-afa-trimmer.jpeg"
    ],
    specifications: [
      { key: "Cuchilla", value: "Cerámica Skin-Safe con bordes redondeados anticortes" },
      { key: "Motor", value: "6.500 RPM de vibración amortiguada" },
      { key: "Luz Guía", value: "Faro LED frontal para iluminar zonas de corte complejas" },
      { key: "Resistencia", value: "IPX7 apto para uso bajo la ducha y lavado fácil" },
      { key: "Autonomía", value: "100 minutos con batería de litio de 800 mAh" },
      { key: "Accesorios", value: "Base de recarga rápida, 3 peines guía (2, 3, 4 mm), cepillo y cable USB" },
      { key: "Garantía", value: "Oficial VGR 1 Año" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 32. VGR V-011 Clipper
  {
    _id: "prod-vgr-v011",
    name: "Máquina de Corte VGR Navigator V-011 Professional Clipper",
    slug: "maquina-de-corte-vgr-navigator-v011-professional",
    sku: "VGR-V011",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["vgr"],
    presentation: "Caja individual con 4 peines guía, cable USB y aceite",
    shortDescription: "Clipper profesional con cuchilla cóncava de acero al carbono, motor de 6.500 RPM y batería de 2.000 mAh.",
    description: "Diseñada para barberos y aprendices que requieren una máquina confiable y resistente a un excelente relación de rendimiento. Su palanca lateral de punto fijo permite regular alturas intermedias sin descalibrarse. Batería de iones de litio con conector USB universal para cargar en cualquier fuente o estación.",
    images: [
      "/uploads/articulos/vgr-v011-clipper.jpeg",
      "/uploads/articulos/vgr-v011-clipper-2.jpeg",
      "/uploads/articulos/vgr-v011-clipper-3.jpeg"
    ],
    specifications: [
      { key: "Motor", value: "Rotativo 6.500 RPM continuo" },
      { key: "Cuchilla", value: "Acero al carbono cromado inoxidable" },
      { key: "Batería", value: "Litio 2.000 mAh de carga rápida" },
      { key: "Autonomía", value: "180 minutos de uso" },
      { key: "Display", value: "Indicador lumínico de estado de carga" },
      { key: "Garantía", value: "Oficial VGR 6 Meses" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 33. VGR V-275 Gold Trimmer
  {
    _id: "prod-vgr-v275-gold",
    name: "Trimmer VGR Voyager V-275 Professional Hair Trimmer Gold",
    slug: "trimmer-vgr-voyager-v275-hair-trimmer-gold",
    sku: "VGR-V275",
    category: catMap["maquinas-corte-trimmers"],
    brand: brandMap["vgr"],
    presentation: "Caja individual con 3 peines guía (1, 2, 3 mm) y base USB",
    shortDescription: "Trimmer de acabado dorado metálico con grabado vintage, cuchilla en T de acero quirúrgico y 150 min de batería.",
    description: "Elegante patillera con cuerpo tallado con motivos victorianos y terminación dorada brillante. Su cuchilla angosta en forma de T permite trabajar contornos detrás de las orejas, rebordes de barba y patillas con suma delicadeza y nitidez visual.",
    images: [
      "/uploads/articulos/vgr-v275-trimmer-gold.jpeg"
    ],
    specifications: [
      { key: "Cuchilla", value: "T-Blade de acero quirúrgico de alta precisión" },
      { key: "Cuerpo", value: "Metal grabado en relieve con terminación dorada vintage" },
      { key: "Motor", value: "6.000 RPM de sonido silencioso" },
      { key: "Autonomía", value: "150 minutos con batería de litio de 1.500 mAh" },
      { key: "Garantía", value: "Oficial VGR 6 Meses" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 34. Rociadores Barber
  {
    _id: "prod-rociadores-barber",
    name: "Rociador Pulverizador Barber Design Pico Regulable",
    slug: "rociador-pulverizador-barber-design",
    sku: "ROC-PLV-BAR",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Unidad individual en envase protegido (Pack por 6 u.)",
    shortDescription: "Atomizador de agua para barbería estilo botella de whisky con gatillo ergonómico de microaspersión continua.",
    description: "Diseño vintage emblemático de barbería tradicional que viste la estación de trabajo. Su válvula de bombeo pulveriza una bruma uniforme y fina que humedece el cabello de manera pareja sin empaparlo ni generar goteos sobre el cliente.",
    images: [
      "/uploads/articulos/rociadores-barber-transparentes.jpeg"
    ],
    specifications: [
      { key: "Capacidad", value: "500 ml de carga líquida" },
      { key: "Material", value: "PET de alta densidad transparente antichoque" },
      { key: "Pico", value: "Boquilla de bronce/plástico con regulación desde niebla fina hasta chorro directo" },
      { key: "Gatillo", value: "Ergonómico de doble tracción para menor esfuerzo en los dedos" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 35. Peines Carbono y Metálico
  {
    _id: "prod-peines-carbono",
    name: "Set de Peines de Corte de Carbono Antiestático & Peine Metálico Dorado",
    slug: "set-de-peines-de-corte-carbono-metalico-dorado",
    sku: "PN-CRB-GLD",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["londress-pro"],
    presentation: "Kit de 2 piezas (1 peine de carbono negro + 1 peine metálico dorado)",
    shortDescription: "Dúo imprescindible: peine de carbono ultrarresistente para trabajo técnico con tijera y peine metálico dorado para styling.",
    description: "El peine de carbono negro es antiestático y resistente a químicos y calor, perfecto para seccionar y cortar con precisión. El peine metálico dorado de aleación ligera ofrece rigidez insuperable para peinar con pomadas y ceras marcando surcos definidos en cortes clásicos.",
    images: [
      "/uploads/articulos/peines-carbono-dorado.jpeg",
      "/uploads/articulos/peine-carbono-profesional.jpeg"
    ],
    specifications: [
      { key: "Contenido", value: "1 Peine de Carbono Técnico 21 cm + 1 Peine Metálico Dorado de Peinado" },
      { key: "Carbono", value: "Resistente a calor hasta 230°C, libre de estática" },
      { key: "Metal", value: "Aleación de aluminio pulido anodizado color oro que no se despinta" },
      { key: "Dientes", value: "Puntas pulidas al espejo que masajean el cuero cabelludo" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 36. L3VEL3 Aftershave
  {
    _id: "prod-l3vel3-aftershave",
    name: "Colonia Post-Afeitado L3VEL3 Aftershave Cologne Vibrant 400ml",
    slug: "colonia-post-afeitado-l3vel3-aftershave-cologne-vibrant-400ml",
    sku: "LV3-AFT-400",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["l3vel3"],
    presentation: "Botella dispenser 400ml con pico vertedor profesional",
    shortDescription: "Fragancia masculina premium de alta permanencia con base desinfectante e hidratante para cierre de servicio.",
    description: "La prestigiosa firma L3VEL3 de USA presenta su colonia Aftershave con aroma Vibrant. Diseñada para calmar y tonificar la piel recién afeitada o rasurada, previene la irritación e hidrata profundamente dejando una fragancia sofisticada que dura todo el día.",
    images: [
      "/uploads/articulos/l3vel3-aftershave-vibrant.jpeg"
    ],
    specifications: [
      { key: "Volumen", value: "400 ml de gran rendimiento" },
      { key: "Aroma", value: "Vibrant: notas cítricas, madera noble y ámbar fresco" },
      { key: "Efecto", value: "Desinfectante, hidratante y tonificante dérmico" },
      { key: "Origen", value: "Importado USA (L3VEL3 Professional)" }
    ],
    inStock: true,
    featured: true,
    isNew: true
  },

  // 37. Alza Wahl 0.5 (1.5mm)
  {
    _id: "prod-wahl-peine-05",
    name: "Peine Guía WAHL Premium Cutting Guide # 1/2 con Traba Metálica 1.5mm",
    slug: "peine-guia-wahl-premium-cutting-guide-medio-1-5mm",
    sku: "WHL-PG-05",
    category: catMap["accesorios-capas-barberia"],
    brand: brandMap["wahl"],
    presentation: "Blíster individual oficial Wahl Professional con traba de metal",
    shortDescription: "Alza intermedia # 1/2 (1.5 mm / 1/16\") con traba metálica de acero inoxidable para unión perfecta sin desprenderse.",
    description: "El peine guía más utilizado y codiciado por los barberos para conectar el cero con el uno en degradados perfectos. A diferencia de las alzas plásticas comunes, la línea WAHL Premium cuenta con traba metálica de seguridad trasera que asegura el peine a la cuchilla evitando accidentes por desprendimiento en pleno corte. Dientes de ingeniería mineral reforzada.",
    images: [
      "/uploads/articulos/wahl-peine-guia-premium-05.jpeg",
      "/uploads/articulos/wahl-peine-guia-premium-05-2.jpeg"
    ],
    specifications: [
      { key: "Medida", value: "Número 1/2 (1.5 milímetros - 1/16 de pulgada)" },
      { key: "Traba", value: "Clip de acero inoxidable grabado con logo Wahl original" },
      { key: "Material Dientes", value: "Plástico mineralizado de alta rigidez y cantos redondeados" },
      { key: "Compatibilidad", value: "Wahl Cordless Senior, Magic Clip, Super Taper, Icon, Balding y Legend" },
      { key: "Procedencia", value: "Wahl Clipper Corporation USA" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  },

  // 38. Caja Mayorista Londress
  {
    _id: "prod-caja-londress",
    name: "Caja Cerrada Londress Barbería & Filos",
    slug: "caja-cerrada-londress-barberia-filos",
    sku: "LND-BOX-MAY",
    category: catMap["tijeras-filos-profesionales"],
    brand: brandMap["londress-pro"],
    presentation: "Bulto cerrado de fábrica (Consulte composición y descuento por volumen)",
    shortDescription: "Caja matriz para abastecimiento de distribuidoras y cadenas de salones con atención comercial personalizada.",
    description: "Diseñada para comercios, academias y revendedores del gremio. Configuración a medida que incluye surtido de hojas de afeitar Treet Platinum y Derby, capas profesionales, cosmética capilar y repuestos técnicos con atención y provisión profesional.",
    images: [
      "/uploads/articulos/caja-mayorista-barberia-londres.jpeg"
    ],
    specifications: [
      { key: "Modalidad", value: "Caja consolidada de productos seleccionados" },
      { key: "Contenido", value: "Surtido personalizable de insumos de alta rotación" },
      { key: "Atención", value: "Coordinación y asesoramiento por WhatsApp" },
      { key: "Servicio", value: "Atención personalizada para profesionales" }
    ],
    inStock: true,
    featured: false,
    isNew: false
  }
];

// Actualizar itemCount dinámico
categories.forEach(cat => {
  cat.itemCount = allProducts.filter(p => p.category?.slug === cat.slug).length;
});

// Escribir archivos
fs.writeFileSync(path.join(dataDir, 'brands.json'), JSON.stringify(brands, null, 2), 'utf8');
fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2), 'utf8');
fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(allProducts, null, 2), 'utf8');

console.log(`Guardados exitosamente:`);
console.log(`- ${allProducts.length} productos en products.json`);
console.log(`- ${categories.length} categorías en categories.json`);
console.log(`- ${brands.length} marcas en brands.json`);

