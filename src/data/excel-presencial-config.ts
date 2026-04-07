export const excelPresencialConfig = {
  schema_version: 1,
  landing_key: 'excel-presencial',
  published_at: '2026-03-31T20:18:48',
  identity: {
    title: 'Curso de Excel Presencial',
    modality: '100% presencial',
    duration: '16 horas',
    location: 'Santiago Centro'
  },
  offerings: [
    {
      slot_key: 'pm-lun-mie',
      slot_label: 'Jornada Tarde',
      days: 'Lunes y Miercoles',
      time: '19:30 a 22:10 hrs',
      start: '2026-04-06',
      start_label: 'Lunes 6 de abril',
      seats: 8,
      price: 112000,
      price_label: '$112.000',
      installments_label: '2 cuotas de $56.000',
      sort_order: 1
    },
    {
      slot_key: 'pm-mar-jue',
      slot_label: 'Jornada Tarde',
      days: 'Martes y Jueves',
      time: '19:30 a 22:10 hrs',
      start: '2026-04-07',
      start_label: 'Martes 7 de abril',
      seats: 10,
      price: 105000,
      price_label: '$105.000',
      installments_label: '2 cuotas de $52.500',
      sort_order: 2
    },
    {
      slot_key: 'sabado-am',
      slot_label: 'Jornada Sábado',
      days: 'Sábados',
      time: '09:30 a 13:30 hrs',
      start: '2026-04-11',
      start_label: 'Sábado 11 de abril',
      seats: 7,
      price: 119000,
      price_label: '$119.000',
      installments_label: '2 cuotas de $59.500',
      sort_order: 3
    }
  ]
};