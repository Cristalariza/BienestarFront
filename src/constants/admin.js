export const ADMIN_SIDEBAR_ITEMS = [
  {
    id: 1,
    label: "Inicio",
    icon: "pi pi-home",
    url: "/admin",
  },
  {
    id: 2,
    label: "Deporte",
    icon: "pi pi-trophy",
    url: null,
    subItems: [
      {
        id: 21,
        label: "Grupos Deportivos",
        icon: "pi pi-users",
        url: "/admin/deporte/grupos",
      },
      {
        id: 22,
        label: "Inscripción",
        icon: "pi pi-check-circle",
        url: "/admin/deporte/inscripcion",
      },
      {
        id: 23,
        label: "Asistencia",
        icon: "pi pi-clipboard",
        url: "/admin/deporte/asistencia",
      },
      {
        id: 24,
        label: "Reporte",
        icon: "pi pi-chart-bar",
        url: "/admin/deporte/reporte",
      },
    ],
  },
  {
    id: 3,
    label: "Cultura",
    icon: "pi pi-palette",
    url: null,
    subItems: [
      {
        id: 31,
        label: "Grupos Culturales",
        icon: "pi pi-users",
        url: "/admin/cultura/grupos",
      },
      {
        id: 32,
        label: "Preinscripciones",
        icon: "pi pi-file-edit",
        url: "/admin/cultura/preinscripciones",
      },
      {
        id: 33,
        label: "Inscripciones",
        icon: "pi pi-check-circle",
        url: "/admin/cultura/inscripciones",
      },
      {
        id: 34,
        label: "Vestuario",
        icon: "pi pi-shopping-bag",
        url: "/admin/cultura/vestuario",
      },
      {
        id: 35,
        label: "Instrumentos",
        icon: "pi pi-star",
        url: "/admin/cultura/instrumentos",
      },
      {
        id: 36,
        label: "Asistencia",
        icon: "pi pi-clipboard",
        url: "/admin/cultura/asistencia",
      },
      {
        id: 37,
        label: "Reporte",
        icon: "pi pi-chart-bar",
        url: "/admin/cultura/reporte",
      },
    ],
  },
  {
    id: 4,
    label: "Ayuda Social",
    icon: "pi pi-heart",
    url: "/admin/ayuda-social",
    subItems: [
      {
        id: "bicicletas",
        label: "Bicicletas",
        url: "/admin/ayuda-social/bicicletas",
        icon: "pi pi-car",
      },
      {
        id: "grupos-juveniles",
        label: "Grupos Juveniles",
        url: "/admin/ayuda-social/grupos-juveniles",
        icon: "pi pi-users",
      },
    ],
  },
  {
    id: 5,
    label: "Informativo",
    icon: "pi pi-info-circle",
    url: null,
    subItems: [
      {
        id: 51,
        label: "Noticias",
        icon: "pi pi-book",
        url: "/admin/noticias",
      },
      {
        id: 52,
        label: "Eventos",
        icon: "pi pi-calendar",
        url: "/admin/eventos",
      },
    ],
  },
  {
    id: 6,
    label: "PQRS",
    icon: "pi pi-inbox",
    url: "/admin/pqrs",
  },
];
