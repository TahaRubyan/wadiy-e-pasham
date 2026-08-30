import { ShawlProduct } from '../types/product';

// Curated high-resolution authentic Kashmiri shawl and handloom textile image URLs for fallback
const AUTHENTIC_SHAWL_FALLBACKS = [
  'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=80',
];

// Rich Exaggerated Royal SOPs for all Masterpiece Shawls
const ROYAL_KASHMIR_SOPS = {
  washing: [
    'Dry Clean Only by certified Kashmiri cashmere conservationists.',
    'Strictly avoid washing machines, centrifugal spin cycles, or vigorous hand wringing.',
    'If spot cleansing, strictly use pH-neutral organic sweet almond surfactant in pure cold glacial temperature water (below 18°C).',
    'Blot gently between raw Egyptian cotton towels and dry flat in shaded alpine micro-breeze.'
  ],
  storage: [
    'Encase in pure unbleached breathable muslin cloth and store flat inside the bespoke lacquered Kashmiri walnut keepsake chest.',
    'Include organic red cedar bark chips and wild Himalayan dried lavender sachets to protect natural 12-micron keratin fibers.',
    'Never use synthetic plastic or vacuum compression bags—authentic Ladakhi cashmere requires continuous micro-airflow.',
    'Rest the shawl for 48 hours between wearings to allow the natural crimp memory of the fleece to recover its airy loft.'
  ],
  steaming: [
    'Never apply a hot iron plate directly onto the delicate handloom weave.',
    'Hover an ionic low-temperature vertical garment steamer at a 6-inch distance to revive the natural loft and silky drape.',
    'Allow the garment to cool completely on a padded silk hanger before wearing.'
  ],
  authenticity: [
    'Passed the legendary Kashmir Ring Test—entire 2-meter doshala glides effortlessly through an authentic royal signet ring.',
    'Individually inspected and lab-verified for 12.0–13.5 micron Ladakhi Changthangi underfleece purity.',
    'Accompanied by a government-certified laboratory purity hallmark and laser-etched serial hologram of authenticity.'
  ]
};

export const MOCK_PRODUCTS: ShawlProduct[] = [
  // 1. Diamond Tier
  {
    id: 'shawl-01',
    handle: 'royal-pashmina-rose-gold',
    title: 'Royal Ladakhi Pure Wool Stole',
    subtitle: 'Hand-combed 12-Micron Changthangi Wool',
    description: 'Masterwork handwoven from pure Ladakhi wool. Ultra-soft featherlight drape for regal occasions.',
    price: 34500,
    compareAtPrice: 39000,
    tierGrade: 'Diamond',
    articleType: 'Wool Pure Single',
    subCategory: 'Pashmina',
    fabric: 'Pure Ladakhi Cashmere',
    dimensions: '100 cm x 200 cm',
    weight: '165 grams',
    micronCount: '12.0 Microns',
    origin: 'Ladakh Plateau & Srinagar Looms',
    images: [
      '/images/shawls/wool_pure_single.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[0],
      AUTHENTIC_SHAWL_FALLBACKS[1]
    ],
    colors: [
      { name: 'Peach Gold', hex: '#FFBE91' },
      { name: 'Warm Cream', hex: '#FFDDB0' },
      { name: 'Rose Blush', hex: '#FFDCDC' }
    ],
    tags: ['Diamond Tier', 'Pure Pashmina'],
    sops: ROYAL_KASHMIR_SOPS,
    isFeatured: true,
    isBestseller: true,
    isNewArrival: true,
    isOutOfStock: false,
    releaseDate: '2026-08-28',
  },

  // 2. Platinum Tier
  {
    id: 'shawl-02',
    handle: 'imperial-kani-tapestry-wrap',
    title: 'Imperial Kani 96 Pure Double Doshala',
    subtitle: 'Woven with Wooden Bobbin Needles (Tuji)',
    description: 'Opulent paisley tapestry woven line-by-line using ancient wooden bobbins over 180+ hours of master labor.',
    price: 28900,
    compareAtPrice: 32000,
    tierGrade: 'Platinum',
    articleType: 'Wool 96 Pure double',
    subCategory: 'Kani',
    fabric: 'Kani Handloom Cashmere',
    dimensions: '115 cm x 230 cm',
    weight: '240 grams',
    micronCount: '13.5 Microns',
    origin: 'Kanihama Village, Kashmir',
    images: [
      '/images/shawls/wool_96_pure_double.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[1],
      AUTHENTIC_SHAWL_FALLBACKS[2]
    ],
    colors: [
      { name: 'Imperial Mahogany', hex: '#4A2B20' },
      { name: 'Warm Amber', hex: '#FFD6BA' }
    ],
    tags: ['Platinum Tier', 'Kani Weave'],
    sops: ROYAL_KASHMIR_SOPS,
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    isOutOfStock: false,
    releaseDate: '2026-08-20',
  },

  // 3. Imperial Tier
  {
    id: 'shawl-03',
    handle: 'jamawar-gold-paisley-doshala',
    title: 'Jamawar Heirloom Pure Double Shawl',
    subtitle: 'Reversible Ceremonial Double-Weave',
    description: 'Richly patterned statement wrap designed for bridal ceremonies, royal gatherings, and formal evening attire.',
    price: 38500,
    tierGrade: 'Imperial',
    articleType: 'Wool Pure double',
    subCategory: 'Heirloom',
    fabric: 'Pure Double-Weave Wool',
    dimensions: '115 cm x 230 cm',
    weight: '290 grams',
    micronCount: '14.0 Microns',
    origin: 'Old Srinagar Craft Guilds',
    images: [
      '/images/shawls/wool_pure_double.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[2],
      AUTHENTIC_SHAWL_FALLBACKS[0]
    ],
    colors: [
      { name: 'Antique Gold', hex: '#D4AF37' },
      { name: 'Mahogany Brown', hex: '#4A2B20' }
    ],
    tags: ['Imperial Tier', 'Heirloom Brocade'],
    sops: ROYAL_KASHMIR_SOPS,
    isFeatured: true,
    isBestseller: false,
    isNewArrival: true,
    isOutOfStock: false,
    releaseDate: '2026-08-25',
  },

  // 4. Gold Tier
  {
    id: 'shawl-04',
    handle: 'cashmere-80-20-single-stole',
    title: 'Wool 80-20 Single Cashmere Stole',
    subtitle: 'Classic Soft Single Weave',
    description: 'Timeless single-weave wrap in warm cream. Extremely soft, lightweight, and versatile.',
    price: 22500,
    compareAtPrice: 26000,
    tierGrade: 'Gold',
    articleType: 'Wool 80-20 single',
    subCategory: 'Cashmere',
    fabric: '80/20 Cashmere Blend',
    dimensions: '100 cm x 200 cm',
    weight: '175 grams',
    micronCount: '14.5 Microns',
    origin: 'Srinagar Valley',
    images: [
      '/images/shawls/wool_80_20_single.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[0]
    ],
    colors: [
      { name: 'Porcelain Cream', hex: '#FFF2EB' },
      { name: 'Soft Blush', hex: '#FFDCDC' }
    ],
    tags: ['Gold Tier', 'Cashmere'],
    sops: ROYAL_KASHMIR_SOPS,
    isFeatured: false,
    isBestseller: true,
    isNewArrival: true,
    isOutOfStock: false,
  },

  // 5. Gold Tier
  {
    id: 'shawl-05',
    handle: 'wool-50-50-single-wrap',
    title: 'Classic Wool 50-50 Single Wrap',
    subtitle: 'Everyday Comfort Weave',
    description: 'Versatile 50-50 wool blend single weave shawl offering warmth, durability, and smooth texture.',
    price: 14500,
    tierGrade: 'Gold',
    articleType: 'Wool 50-50 single',
    subCategory: 'Cashmere',
    fabric: 'Wool 50-50 Blend',
    dimensions: '100 cm x 200 cm',
    weight: '190 grams',
    micronCount: '16.0 Microns',
    origin: 'Kashmir Valley',
    images: [
      '/images/shawls/wool_50_50_single.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[1]
    ],
    colors: [{ name: 'Warm Amber', hex: '#FFD6BA' }],
    tags: ['Gold Tier', 'Wool Blend'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: true,
  },

  // 6. Gold Tier
  {
    id: 'shawl-06',
    handle: 'wool-60-40-single-stole',
    title: 'Heritage Wool 60-40 Single Stole',
    subtitle: 'Lightweight Daily Elegance',
    description: 'Smooth 60-40 wool single weave for spring and autumn layering with rich drape.',
    price: 16500,
    tierGrade: 'Gold',
    articleType: 'Wool 60-40 single',
    subCategory: 'Pashmina',
    fabric: 'Wool 60-40 Blend',
    dimensions: '100 cm x 200 cm',
    weight: '180 grams',
    micronCount: '15.5 Microns',
    origin: 'Srinagar Craft Looms',
    images: [
      '/images/shawls/wool_60_40_single.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[2]
    ],
    colors: [{ name: 'Peach Soft', hex: '#FFE8CD' }],
    tags: ['Gold Tier', 'Pashmina Blend'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: false,
  },

  // 7. Platinum Tier
  {
    id: 'shawl-07',
    handle: 'wool-70-30-single-doshala',
    title: 'Luxury Wool 70-30 Single Doshala',
    subtitle: '70% Pure Ladakhi Wool',
    description: 'Opulent single weave 70-30 wool stole offering high thermal retention and rich texture.',
    price: 18500,
    tierGrade: 'Platinum',
    articleType: 'Wool 70-30 single',
    subCategory: 'Pashmina',
    fabric: '70% Pure Ladakhi Wool',
    dimensions: '105 cm x 210 cm',
    weight: '185 grams',
    micronCount: '15.0 Microns',
    origin: 'Srinagar Guilds',
    images: [
      '/images/shawls/wool_70_30_single.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[0]
    ],
    colors: [{ name: 'Rose Blush', hex: '#FFDCDC' }],
    tags: ['Platinum Tier', 'Ladakhi Wool'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: true,
  },

  // 8. Gold Tier
  {
    id: 'shawl-08',
    handle: 'wool-50-50-double-shawl',
    title: 'Double-Layer Wool 50-50 Wrap',
    subtitle: 'Extra Warm Double Weave',
    description: 'Substantial double weave 50-50 wool wrap providing winter protection and formal posture.',
    price: 17500,
    tierGrade: 'Gold',
    articleType: 'Wool 50-50 double',
    subCategory: 'Heirloom',
    fabric: 'Wool 50-50 Double Weft',
    dimensions: '115 cm x 230 cm',
    weight: '260 grams',
    micronCount: '16.0 Microns',
    origin: 'Kashmir Looms',
    images: [
      '/images/shawls/wool_50_50_double.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[1]
    ],
    colors: [{ name: 'Mocha Brown', hex: '#4A2B20' }],
    tags: ['Gold Tier', 'Double Weave'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: false,
  },

  // 9. Platinum Tier
  {
    id: 'shawl-09',
    handle: 'wool-60-40-double-doshala',
    title: 'Reversible Wool 60-40 Double Stole',
    subtitle: 'Two-Tone Ceremonial Weave',
    description: 'Double-woven 60-40 wool article with contrasting borders for evening formalwear.',
    price: 19500,
    tierGrade: 'Platinum',
    articleType: 'Wool 60-40 double',
    subCategory: 'Kani',
    fabric: '60/40 Reversible Wool',
    dimensions: '110 cm x 220 cm',
    weight: '250 grams',
    micronCount: '15.5 Microns',
    origin: 'Kanihama Guilds',
    images: [
      '/images/shawls/wool_60_40_double.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[2]
    ],
    colors: [{ name: 'Warm Amber', hex: '#FFD6BA' }],
    tags: ['Platinum Tier', 'Reversible'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: true,
  },

  // 10. Platinum Tier
  {
    id: 'shawl-10',
    handle: 'wool-70-30-double-shawl',
    title: 'Imperial Wool 70-30 Double Wrap',
    subtitle: '70% Wool Double Layer',
    description: 'Rich double-weave wrap featuring traditional Paisley borders and dense thermal insulation.',
    price: 21500,
    tierGrade: 'Platinum',
    articleType: 'Wool 70-30 double',
    subCategory: 'Heirloom',
    fabric: '70% Wool Double Weave',
    dimensions: '115 cm x 230 cm',
    weight: '270 grams',
    micronCount: '15.0 Microns',
    origin: 'Srinagar Looms',
    images: [
      '/images/shawls/wool_70_30_double.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[0]
    ],
    colors: [{ name: 'Porcelain Cream', hex: '#FFF2EB' }],
    tags: ['Platinum Tier', 'Paisley Border'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: false,
  },

  // 11. Diamond Tier
  {
    id: 'shawl-11',
    handle: 'wool-80-20-double-shawl',
    title: 'Diamond Wool 80-20 Double Stole',
    subtitle: '80% Wool High-Density Weave',
    description: 'Premium double-layer 80-20 wool article with hand-tied fringe and silky softness.',
    price: 24500,
    tierGrade: 'Diamond',
    articleType: 'Wool 80-20 double',
    subCategory: 'Cashmere',
    fabric: '80% High-Density Wool',
    dimensions: '110 cm x 220 cm',
    weight: '265 grams',
    micronCount: '14.5 Microns',
    origin: 'Srinagar Looms',
    images: [
      '/images/shawls/wool_80_20_double.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[1]
    ],
    colors: [{ name: 'Peach Soft', hex: '#FFE8CD' }],
    tags: ['Diamond Tier', 'Fringe Shawl'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: true,
  },

  // 12. Diamond Tier
  {
    id: 'shawl-12',
    handle: 'wool-96-pure-single-stole',
    title: 'Royal Wool 96 Pure Single Stole',
    subtitle: '96% Pure Ladakhi Wool Single Weave',
    description: 'Rare 96% pure wool single weave stole with featherlight drape and exceptional warmth.',
    price: 27500,
    tierGrade: 'Diamond',
    articleType: 'Wool 96 Pure Single',
    subCategory: 'Pashmina',
    fabric: '96% Pure Ladakhi Wool',
    dimensions: '100 cm x 200 cm',
    weight: '170 grams',
    micronCount: '13.0 Microns',
    origin: 'Ladakh & Srinagar',
    images: [
      '/images/shawls/wool_96_pure_single.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[2]
    ],
    colors: [{ name: 'Rose Blush', hex: '#FFDCDC' }],
    tags: ['Diamond Tier', '96 Pure Wool'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: false,
  },

  // 13. Platinum Tier
  {
    id: 'shawl-13',
    handle: 'wool-72-pure-single-stole',
    title: 'Wool 72Pure Single Weave Stole',
    subtitle: '72% Pure Wool Fine Weave',
    description: 'Finely balanced 72% pure wool single weave wrap combining softness and daily versatility.',
    price: 20500,
    tierGrade: 'Platinum',
    articleType: 'Wool 72Pure Single',
    subCategory: 'Pashmina',
    fabric: '72% Pure Wool Single',
    dimensions: '100 cm x 200 cm',
    weight: '180 grams',
    micronCount: '14.8 Microns',
    origin: 'Kashmir Looms',
    images: [
      '/images/shawls/wool_72_pure_single.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[0]
    ],
    colors: [{ name: 'Warm Amber', hex: '#FFD6BA' }],
    tags: ['Platinum Tier', '72 Pure Wool'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: true,
  },

  // 14. Diamond Tier
  {
    id: 'shawl-14',
    handle: 'wool-72-pure-double-shawl',
    title: 'Wool 72Pure Double Weave Doshala',
    subtitle: '72% Pure Wool Double Layer',
    description: 'Substantial 72% pure wool double layer wrap with intricate border embroidery details.',
    price: 23500,
    tierGrade: 'Diamond',
    articleType: 'Wool 72Pure double',
    subCategory: 'Heirloom',
    fabric: '72% Pure Double Wool',
    dimensions: '115 cm x 230 cm',
    weight: '260 grams',
    micronCount: '14.8 Microns',
    origin: 'Kashmir Guilds',
    images: [
      '/images/shawls/wool_72_pure_double.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[1]
    ],
    colors: [{ name: 'Mocha Brown', hex: '#4A2B20' }],
    tags: ['Diamond Tier', 'Double Layer'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: false,
  },

  // 15. Gold Tier
  {
    id: 'shawl-15',
    handle: 'acrylic-lightweight-everyday-wrap',
    title: 'Acrylic Lightweight Everyday Wrap',
    subtitle: 'Soft Synthetic Daily Wear',
    description: 'Easy-care lightweight acrylic wrap providing cozy everyday warmth and easy maintenance.',
    price: 8500,
    compareAtPrice: 11000,
    tierGrade: 'Gold',
    articleType: 'Acrylic',
    subCategory: 'Silk Fusion',
    fabric: 'Soft Acrylic Blend',
    dimensions: '90 cm x 190 cm',
    weight: '200 grams',
    micronCount: 'Synthetic Fiber',
    origin: 'Kashmir Loom Craft',
    images: [
      '/images/shawls/acrylic.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[2]
    ],
    colors: [{ name: 'Peach Soft', hex: '#FFE8CD' }],
    tags: ['Gold Tier', 'Daily Wear'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: true,
  },

  // 16. Imperial Tier
  {
    id: 'shawl-16',
    handle: 'kani-imperial-tapestry-stole',
    title: 'Kani Imperial Tapestry Single Stole',
    subtitle: '96% Pure Wool Wooden Needle Weft',
    description: 'Bespoke Kani needlework stole with intricate floral borders and featherlight pure wool drape.',
    price: 36000,
    compareAtPrice: 42000,
    tierGrade: 'Imperial',
    articleType: 'Wool 96 Pure Single',
    subCategory: 'Kani',
    fabric: 'Kani Needle Tapestry',
    dimensions: '100 cm x 200 cm',
    weight: '160 grams',
    micronCount: '12.5 Microns',
    origin: 'Kanihama Weavers Guild',
    images: [
      '/images/shawls/kani_tapestry.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[1]
    ],
    colors: [{ name: 'Antique Amber', hex: '#FFD6BA' }],
    tags: ['Imperial Tier', 'Kani Needle'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: true,
  },

  // 17. Platinum Tier
  {
    id: 'shawl-17',
    handle: 'silk-fusion-rose-blush-wrap',
    title: 'Silk-Infused Wool 60-40 Stole',
    subtitle: 'Lustrous Silk-Wool Blend Drape',
    description: 'Shimmering mulberry silk combined with fine Kashmiri single-weave wool for radiant evening occasions.',
    price: 21000,
    tierGrade: 'Platinum',
    articleType: 'Wool 60-40 single',
    subCategory: 'Silk Fusion',
    fabric: 'Mulberry Silk & Wool',
    dimensions: '100 cm x 200 cm',
    weight: '170 grams',
    micronCount: '14.0 Microns',
    origin: 'Srinagar Weavers Guild',
    images: [
      '/images/shawls/pashmina_pure.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[0]
    ],
    colors: [{ name: 'Rose Blush', hex: '#FFDCDC' }, { name: 'Peach Soft', hex: '#FFE8CD' }],
    tags: ['Platinum Tier', 'Silk Fusion'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: true,
  },

  // 18. Imperial Tier
  {
    id: 'shawl-18',
    handle: 'heirloom-royal-ceremonial-doshala',
    title: 'Imperial Ceremonial Heirloom Doshala',
    subtitle: 'Heavyweight Reversible Brocade',
    description: 'Grand royal double-layer doshala woven for royal grooms, dignitaries, and ceremonial winter galas.',
    price: 45000,
    tierGrade: 'Imperial',
    articleType: 'Wool 80-20 double',
    subCategory: 'Heirloom',
    fabric: 'Reversible Heirloom Brocade',
    dimensions: '120 cm x 240 cm',
    weight: '310 grams',
    micronCount: '13.8 Microns',
    origin: 'Old Srinagar Craft Guilds',
    images: [
      '/images/shawls/heirloom_jamawar.jpg',
      AUTHENTIC_SHAWL_FALLBACKS[2]
    ],
    colors: [{ name: 'Mocha Mahogany', hex: '#4A2B20' }, { name: 'Antique Gold', hex: '#D4AF37' }],
    tags: ['Imperial Tier', 'Ceremonial Doshala'],
    sops: ROYAL_KASHMIR_SOPS,
    isNewArrival: false,
  }
];
