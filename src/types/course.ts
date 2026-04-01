export type SeoData = {
  title: string;
  description: string;
  canonical: string;
};

export type HeroBadge = {
  text: string;
  variant?: 'default' | 'highlight';
};

export type HeroData = {
  logo: string;
  title: string;
  subtitle: string;
  description: string;
  badges: HeroBadge[];
  trustItems: string[];
  theme: {
    background: string;
    accent: string;
    highlight: string;
  };
};

export type MainFormData = {
  action: string;
  landingCode: string;
  startLabel: string;
  startText: string;
  submitText: string;
};

export type ScheduleItem = {
  tag: string;
  featured?: boolean;
  title: string;
  days: string;
  time: string;
  price: string;
  startDate: string;
  buttonText: string;
};

export type InfrastructureImage = {
  src: string;
  alt: string;
  badge?: string;
};

export type InfrastructureData = {
  title: string;
  description: string;
  images: InfrastructureImage[];
  stats: { label: string; value: string }[];
};

export type BenefitCard = {
  title: string;
  badge?: string;
  iconSvg?: string;
  items: string[];
};

export type SyllabusModule = {
  title: string;
  items: string[];
};

export type DownloadFormData = {
  action: string;
  landingCode: string;
  title: string;
  description: string;
  buttonText: string;
};

export type PaymentOption = {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonVariant: 'primary' | 'secondary';
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

export type ClientLogo = {
  name: string;
  image: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LocationData = {
  title: string;
  subtitle: string;
  address: string;
  mapEmbedUrl: string;
  photos: { src: string; alt: string }[];
};

export type SealItem = {
  title: string;
  description: string;
  image: string;
};

export type CourseLandingPageData = {
  seo: SeoData;
  gtmId: string;
  productId: string;
  hero: HeroData;
  mainForm: MainFormData;
  schedules: ScheduleItem[];
  infrastructure: InfrastructureData;
  benefits: {
    title: string;
    subtitle?: string;
    cards: BenefitCard[];
  };
  syllabus: {
    title: string;
    description: string;
    modules: SyllabusModule[];
  };
  downloadForm: DownloadFormData;
  paymentOptions: {
    title: string;
    subtitle?: string;
    items: PaymentOption[];
  };
  testimonials: {
    title: string;
    subtitle?: string;
    items: Testimonial[];
  };
  clients: {
    title: string;
    subtitle?: string;
    items: ClientLogo[];
  };
  faqs: {
    title: string;
    subtitle?: string;
    items: FaqItem[];
  };
  location: LocationData;
  seals: {
    title: string;
    subtitle?: string;
    items: SealItem[];
  };
};