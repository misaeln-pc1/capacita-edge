import type { CourseLandingPageData } from '../types/course';
import testimonioRoberto from '../assets/img/excel/TESTIONIO-alumno-roberto-r-excel-presencial.webp';
import testimonioAndrea from '../assets/img/excel/TESTIONIO-alumno-andrea-v-excel-presencial.webp';
import testimonioAna from '../assets/img/excel/TESTIONIO-alumno-ana-b-excel-presencial.webp';
import clienteUnicef from '../assets/img/common/Cliente-unicef-Logo.webp';
import clienteNuestrosParques from '../assets/img/common/Cliente-NuestrosParques-logo.webp';
import clienteHospitalia from '../assets/img/common/Cliente-Hospitalia-logo.webp';
import clienteCodelco from '../assets/img/common/Cliente-Codelco-logo.webp';
import clienteUtalca from '../assets/img/common/Cliente-Utalca-logo.webp';
import clienteCetChile from '../assets/img/common/Cliente-CetChile-logo.webp';
import clienteBlueExpress from '../assets/img/common/Cliente-BlueExpress-Logo.webp';
import clienteFundacionTacal from '../assets/img/common/Cliente-Fundacion-Tacal_Logo.webp';
import clienteHeel from '../assets/img/common/Cliente-Heel-Logo.webp';
import clienteNovoFarma from '../assets/img/common/Cliente-Logo-NovoFarma.webp';
import clienteTelefonica from '../assets/img/common/Cliente-Logo-Telefonica.webp';
import clienteLoBarnechea from '../assets/img/common/Cliente-Logo-Lo-barnechea.webp';
import clienteSiemens from '../assets/img/common/Cliente-siemens-logo.webp';
import ubicacionFrontisOficina from '../assets/img/common/Ubicacion-Frontis-Oficina-Capacita-0-liviana.jpg';
import ubicacionFrontisEdificio from '../assets/img/common/Ubicacion-Frontis-Edificio1.jpeg';
import selloNch2728 from '../assets/img/common/SELLO-CALIDAD-Nch2728.webp';
import sello40Horas from '../assets/img/common/SELLO-40-HORAS.webp';
import selloOficinaSustentable from '../assets/img/common/SELLO-Oficina-Sustentable.webp';

export const excelPresencialPage: CourseLandingPageData = {
  seo: {
    title: 'Curso de Excel Presencial en Santiago | Capacita.cl',
    description: 'Capacitación 100% práctica en Santiago Centro. Incluye certificación OTEC bajo norma NCh 2728.',
    canonical: 'https://capacita.cl/curso-de-excel-presencial-en-santiago/'
  },
  gtmId: 'GTM-52J4PSR',
  productId: 'excel_basico_intermedio_presencial',

  hero: {
    logo: 'https://capacita.cl/wp-content/uploads/2019/02/Logo_Capacita_850x300-e1602863310152.jpg',
    title: 'Curso de Excel Presencial',
    subtitle: 'Nivel Básico e Intermedio',
    description: 'Mejora tu CV y domina las planillas con clases diseñadas para aprender paso a paso y de forma personalizada.',
    badges: [
      { text: '📍 Santiago Centro · 100% Presencial' },
      { text: '🏅 10+ Años Capacitando', variant: 'highlight' }
    ],
    trustItems: [
      '📜 Diploma Certificado',
      '🚀 100% Práctico',
      '💳 Pagable en 2 Cuotas'
    ],
    theme: {
      background: 'linear-gradient(135deg, #004A99 0%, #002347 100%)',
      accent: '#ff9800',
      highlight: '#ffca28'
    }
  },

mainForm: {
  action: '/api/forms/lead',
turnstileSiteKey: '0x4AAAAAACyxbmmxJx_EtyEr',
  landingFuente: 'excel-presencial',
  cursoInteresado: 'Excel Presencial',
  tipoModalidad: 'Presencial',
  landingCode: 'EXCEL_PRESENCIAL_EDGE',
  startLabel: 'Inicio en Marzo',
  startText: 'Cupos limitados. Solicita el programa aquí:',
  submitText: 'Regístrate'
},

  quickFacts: {
  title: 'Ficha rápida del curso',
  subtitle: 'Información clave antes de inscribirte. Aquí puedes revisar rápidamente modalidad, duración, valor y condiciones generales del curso.',
  sharedItems: [
    {
      label: 'Duración',
      value: '16 horas'
    },
    {
      label: 'Modalidad',
      value: '100% presencial'
    },
    {
      label: 'Valor',
      value: '$112.000',
      subvalue: 'o 2 cuotas de $56.000'
    },
    {
      label: 'Sede',
      value: 'Santiago Centro'
    }
  ],
  pills: [
    'Incluye diploma',
    'Te facilitamos un Notebook',
    'Material Impreso',
    'Pendrive con plantillas',
    'Pago en 2 cuotas',
    '2 horarios disponibles'
  ]
},

outcomes: {
  title: '¿Qué te llevas al salir?',
  subtitle: 'Más que contenidos, aquí ves el resultado práctico que deberías lograr al finalizar el curso.',
  primaryTitle: 'Resultados concretos',
  secondaryTitle: 'Además incluye',
  primaryItems: [
    'Ordenar y estructurar planillas de trabajo con mejor criterio.',
    'Usar funciones clave de búsqueda, referencia y condicionales.',
    'Crear reportes más claros para tareas administrativas o de análisis.',
    'Trabajar con tablas, bases de datos y tablas dinámicas con más seguridad.',
    'Aplicar lo aprendido en situaciones reales desde las primeras clases.'
  ],
  secondaryItems: [
    'Diploma al finalizar el curso.',
    'Material de apoyo y guía de repaso.',
    'Acompañamiento presencial con relator.',
    'Aprendizaje progresivo, no solo teoría.',
    'Base útil para seguir luego con Excel avanzado o Power BI.'
  ]
},

courseFit: {
  title: 'Perfil recomendado para este curso',
  subtitle: 'Esta sección te ayuda a identificar rápidamente si este programa calza con tu nivel actual y con el tipo de apoyo que estás buscando.',
  yesTitle: 'Sí, este curso es para ti si…',
  noTitle: 'No es para ti si…',
  yesItems: [
    'Usas Excel en tu trabajo y sientes que te faltan bases sólidas.',
    'Quieres aprender presencialmente, con guía real y práctica.',
    'Buscas aplicar Excel en reportes, planillas y tareas del día a día.',
    'Prefieres avanzar paso a paso, sin depender de cursos grabados.'
  ],
  noItems: [
    'Ya manejas funciones avanzadas, tablas dinámicas y automatización.',
    'Buscas un curso 100% grabado o autogestionado.',
    'Solo quieres una constancia, sin involucrarte en ejercicios reales.',
    'Necesitas partir desde un nivel avanzado o con enfoque en dashboards.'
  ],
  ctaText: 'Si este perfil te calza, el siguiente paso ideal es revisar temario, pagos y testimonios.',
  ctaButtonText: 'Ir al registro',
  ctaHref: '#registro'
},

  schedules: [
    {
      tag: 'Próximo Inicio',
      featured: true,
      title: 'Jornada Tarde',
      days: 'Lunes y Miércoles',
      time: '19:30 a 22:10 hrs.',
      price: '112.000',
      startDate: 'Lunes 23 de Marzo',
      buttonText: 'Reservar mi Cupo'
    },
    {
      tag: 'Cupos Disponibles',
      title: 'Jornada Mañana',
      days: 'Martes y Jueves',
      time: '10:00 a 12:40 hrs.',
      price: '112.000',
      startDate: 'Jueves 26 de Marzo',
      buttonText: 'Reservar mi Cupo'
    }
  ],

  infrastructure: {
    title: 'Infraestructura Moderna y Equipada - Excel Presencial',
    description: 'Tu aprendizaje merece un entorno real, cómodo y profesional en el corazón de Santiago.',
    images: [
      {
        src: 'https://capacita.cl/wp-content/uploads/2026/01/Sala-de-Clases-Equipada-y-Presencial-1-1.webp',
        alt: 'Sede Principal Capacita',
        badge: 'Sede Central - Bombero Salas'
      },
      {
        src: 'https://capacita.cl/wp-content/uploads/2026/01/Sala-de-Clases-Equipada-y-Presencial-2-1.webp',
        alt: 'Equipamiento Pro',
        badge: 'Hardware i7 + Fibra Óptica'
      },
      {
        src: 'https://capacita.cl/wp-content/uploads/2026/01/Sala-de-Clases-Equipada-y-Presencial-3-1.webp',
        alt: 'Comodidad Alumno',
        badge: 'Espacio Climatizado'
      }
    ],
    stats: [
      { value: '20 Alumnos', label: 'Capacidad Máxima' },
      { value: 'Estación Individual', label: 'PC para cada Alumno' },
      { value: 'Santiago Centro', label: 'Ubicación Estratégica' }
    ]
  },

  benefits: {
    title: 'Aprende Excel Presencial, con un Profesor guiándote',
    subtitle: 'La ventaja de Capacita.cl',
    cards: [
      {
        title: 'Beneficios y descuentos',
        badge: 'EX-ALUMNOS: 12% OFF',
        items: [
          'Si ya has tomado cursos antes, premiamos tu confianza con un descuento especial en tu nueva inscripción.',
          'Incentivo contado: 5% de ahorro directo al pagar por transferencia o pago total.',
          'Consulta por opción de pago en 2 cuotas sin interés.'
        ]
      },
      {
        title: 'Kit de Materiales a entregar',
        badge: 'MANUAL IMPRESO A COLOR',
        items: [
          'Manual técnico para tomar apuntes y consultarlo en la oficina.',
          'Pendrive con plantillas, archivos de ejercicios y herramientas.',
          'Diploma físico y digital con sello oficial OTEC.'
        ]
      },
      {
        title: 'En nuestra sede central',
        items: [
          'El relator resuelve tus dudas en el momento.',
          'Coffee Break y networking con otros profesionales.',
          'Ubicación a 3 cuadras del Metro La Moneda.'
        ]
      }
    ]
  },
syllabus: {
  title: 'Temario del Curso Detallado',
  description: 'Una ruta lógica diseñada para el dominio total de la herramienta.',
  modules: [
    {
      title: '1. Generales y Nivelación',
      items: [
        'Personalización de Barras y Menús',
        'Administración de Libros y Hojas',
        'Referencias Relativas y Absolutas ($)',
        'Funciones de Tiempo: Días y Horas',
        'Funciones de Texto (Extraer, Derecha)',
        'Texto en Columnas (Nivel 1)'
      ]
    },
    {
      title: '2. Búsqueda y Referencia',
      items: [
        'Asignación de Nombres a Matrices',
        'Función BUSCARV (Falso/Cero)',
        'Funciones de Datos Simples',
        'Búsqueda Compleja (Multi-tabla)',
        'Creación de Listas para Búsquedas',
        'Comparación de Bases de Datos'
      ]
    },
    {
      title: '3. Funciones Condicionales',
      items: [
        'Función SI Simple',
        'Funciones Condicionales Anidadas',
        'Cálculos en Funciones Condicionales',
        'Uso de Nombres en Lógica SI',
        'Función CONTAR.SI y SUMAR.SI',
        'Manejo de Errores (ESERROR)'
      ]
    },
    {
      title: '4. Gráficos Profesionales',
      items: [
        'Gráficos de 1 o más Variables',
        'Gráficos Comparativos y Apilables',
        'Visualización de 100%',
        'Gráficos de 2 Ejes (Eje Secundario)',
        'Gráficos Mixtos y Especiales',
        'Repaso de Formatos Visuales'
      ]
    },
    {
      title: '5. Gestión de Bases de Datos',
      items: [
        'Teoría de Estructura de Datos',
        'Reglas y Tipos de Campos',
        'Filtros con Parámetros Avanzados',
        'Orden con Parámetros Múltiples',
        'Limpieza con Texto en Columnas',
        'Validación y Reglas de Campo'
      ]
    },
    {
      title: '6. Tablas Dinámicas',
      items: [
        'Estructura de la Tabla Dinámica',
        'Definiciones y Tipos de Campos',
        'Rediseño y Actualización de Datos',
        'Segmentación de Información Profesional'
      ]
    }
  ]
},

  downloadForm: {
    action: 'https://forms.zohopublic.com/capacita736/form/DescargarTemario/formperma/QCbY7vO5Oj6T_CTYsp7yn4Fm6I9I-fD7KPPO2G9yV-I/htmlRecords/submit',
    landingCode: 'DESCARGA_TEMARIO_EXCEL',
    title: '¿Necesitas los temas detallados?',
    description: 'Descarga el temario completo en PDF para revisarlo con calma.',
    buttonText: 'Descargar PDF'
  },

 paymentOptions: {
  title: 'Alternativas de pago',
  subtitle: 'Selecciona la alternativa más cómoda para ti',
  items: [
    {
      title: 'Pago al Contado',
      description: 'Asegura tu cupo lo antes posible (disponibilidad hasta agotar matrícula). Puedes realizar una transferencia directa a nuestra cuenta o pagar en efectivo directamente en nuestra sede en Santiago Centro.',
      buttonText: 'Contactar para Pago al Contado',
      buttonHref: '#registro',
      buttonVariant: 'primary'
    },
    {
      title: 'Tarjetas de Crédito',
      description: 'Aceptamos todas las tarjetas de crédito y débito. Puedes pagar presencialmente en nuestra sede o solicitar tu link de pago seguro para gestionar tus cuotas de forma remota antes de iniciar tus clases.',
      buttonText: 'Solicitar pago con tarjeta',
      buttonHref: '#registro',
      buttonVariant: 'primary'
    },
    {
      title: 'Si eres Empresa',
      description: 'Ofrecemos capacitación de excel con sence para empresas. Emitimos tus Órdenes de Compra y te asesoramos en todo el trámite de la franquicia tributaria para simplificar tu gestión.',
      buttonText: 'Cotizar para Empresa',
      buttonHref: '#registro',
      buttonVariant: 'secondary'
    }
  ]
},

testimonials: {
  kicker: 'Nuestra comunidad de alumnos',
  title: 'El valor de la formación presencial: ¿Por qué nos eligen nuestros alumnos?',
  subtitle: 'Conoce el impacto real de aprender Excel Presencial en vivo con profesionales de tu misma área.',
  items: [
    {
      name: 'Robert R.',
      role: 'Analista de Cuentas',
      quote: 'La metodología 100% práctica me permitió aplicar lo aprendido de inmediato en mis reportes mensuales.',
      image: testimonioRoberto
    },
    {
      name: 'Andrea V.',
      role: 'En búsqueda activa',
      quote: 'El entorno presencial y el apoyo de la profesora hicieron que temas complejos de Excel fueran fáciles de dominar.',
      image: testimonioAndrea
    },
    {
      name: 'Ana B.',
      role: 'Asistente Administrativa',
      quote: 'Capacitarme en una OTEC certificada me dio el respaldo que buscaba para mi crecimiento profesional.',
      image: testimonioAna
    }
  ]
},

  clients: {
  title: 'Quienes nos han elegido',
  subtitle: 'Organizaciones que validan la calidad de nuestra formación presencial',
  items: [
    {
      name: 'Vialcorp',
      image: 'https://capacita.cl/wp-content/uploads/2020/08/vialcorp-logo.jpg'
    },
    {
      name: 'UNICEF',
      image: clienteUnicef
    },
    {
      name: 'Nuestros Parques',
      image: clienteNuestrosParques
    },
    {
      name: 'Hospitalia',
      image: clienteHospitalia
    },
    {
      name: 'Codelco',
      image: clienteCodelco
    },
    {
      name: 'Siemens',
      image: clienteSiemens
    },
    {
      name: 'Universidad de Talca',
      image: clienteUtalca
    },
    {
      name: 'CET Chile',
      image: clienteCetChile
    },
    {
      name: 'Blue Express',
      image: clienteBlueExpress
    },
    {
      name: 'Fundación Tacal',
      image: clienteFundacionTacal
    },
    {
      name: 'Heel',
      image: clienteHeel
    },
    {
      name: 'NovoFarma',
      image: clienteNovoFarma
    },
    {
      name: 'Telefónica',
      image: clienteTelefonica
    },
    {
      name: 'Lo Barnechea',
      image: clienteLoBarnechea
    }
  ]
},

faqs: {
  title: 'Preguntas Frecuentes - Excel Presencial',
  subtitle: 'Claridad total sobre tu experiencia en Capacita.cl',
  items: [
    {
      question: '¿El curso se dicta de forma 100% presencial?',
      answer: 'Así es. Toda la formación se realiza en vivo en nuestra sede de Bombero Salas 1369, Oficina 404, Santiago Centro. Dispones de un profesor experto guiándote paso a paso en el aula, eliminando las distracciones de las clases grabadas.'
    },
    {
      question: '¿Existen requisitos o filtros de ingreso?',
      answer: 'No. En Capacita.cl eliminamos la burocracia académica. No exigimos entrevistas, diagnósticos obligatorios ni exceso de documentación. Recibimos a profesionales y entusiastas desde los 14 años que buscan un entorno de aprendizaje serio y efectivo.'
    },
    {
      question: '¿Recibiré un diploma oficial al término de las clases?',
      answer: 'Sí. Al completar el programa, obtienes un certificado oficial emitido por nuestra OTEC bajo la norma NCh 2728:2015. Este documento tiene validez curricular nacional y respalda tus nuevas competencias ante cualquier empleador.'
    },
    {
      question: '¿Cómo puedo resolver dudas con la coordinación?',
      answer: 'Para consultas administrativas o de contenido, puedes escribir directamente a coordinación@capacita.cl. Nuestro equipo en Santiago Centro te brindará una respuesta ágil para que tu proceso de inscripción sea fluido.'
    },
    {
      question: '¿Qué materiales se incluyen en la sala de clases?',
      answer: 'Ofrecemos una experiencia completa. Incluimos el Kit Pro: uso de computador de alta gama en sede, manual impreso a color y servicio de Coffee Break ejecutivo. Solo necesitas traer tu disposición para aprender.'
    },
    {
      question: '¿Cuáles son las opciones para concretar el pago?',
      answer: 'Aceptamos transferencia bancaria y tarjetas de crédito/débito vía Webpay Plus. Para empresas, facilitamos el proceso mediante Órdenes de Compra y facturación inmediata.'
    },
    {
      question: 'Si represento a una empresa, ¿puedo usar la Franquicia Tributaria?',
      answer: 'Sí. Además de nuestros alumnos particulares, desarrollamos programas de capacitación de excel con sence para empresas. Entregamos toda la documentación formal (código SENCE y certificados OTEC) para que su departamento de RRHH o su OTIC intermediaria utilice la franquicia tributaria sin complicaciones.'
    }
  ]
},

location: {
  title: 'Ubicación y Sede',
  subtitle: 'Bombero Salas 1369, Oficina 404, Santiago Centro (Metro La Moneda).',
  address: 'Bombero Salas 1369, Oficina 404, Santiago, Chile',
  addressLabel: 'Bombero Salas 1369, Oficina 404',
  addressSuffix: 'Santiago Centro (Metro La Moneda).',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.1557375252873!2d-70.6565154!3d-33.4452445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c50767290123%3A0xc39213137b03657b!2sBombero%20Salas%201369%2C%20Oficina%20404%2C%20Santiago%2C%20Chile!5e0!3m2!1ses-419!2scl!4v1705190000000!5m2!1ses-419!2scl',
  photos: [
    {
      src: ubicacionFrontisOficina,
      alt: 'Frontis de la oficina Capacita, Oficina 404'
    },
    {
      src: ubicacionFrontisEdificio,
      alt: 'Frontis del edificio Bombero Salas 1369'
    }
  ]
},

seals: {
  title: 'Sellos y Certificados de Calidad',
  subtitle: 'Respaldo institucional y garantía para tu formación profesional',
  items: [
    {
      title: 'Norma NCh 2728:2015',
      description: 'Sistema de Gestión de Calidad rigurosamente auditado y certificado por OTEC.',
      image: selloNch2728
    },
    {
      title: 'Sello 40 Horas',
      description: 'Empresa certificada, comprometida con el bienestar y la conciliación laboral.',
      image: sello40Horas
    },
    {
      title: 'Oficina Sustentable',
      description: 'Compromiso activo con la responsabilidad ambiental corporativa.',
      image: selloOficinaSustentable
    }
  ]
},
};

export const excelPresencialSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Curso de Excel Básico Intermedio Presencial",
  "description": "Capacitación 100% práctica en Santiago Centro. Incluye certificación OTEC bajo norma NCh 2728.",
  "educationalLevel": "Básico e Intermedio",
  "courseCode": "EXC-03-2026",
  "provider": {
    "@type": "Organization",
    "name": "Capacita.cl",
    "url": "https://capacita.cl"
  }
};