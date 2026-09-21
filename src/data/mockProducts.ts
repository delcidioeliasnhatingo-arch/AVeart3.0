import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Monitor Gamer ASUS ROG Swift OLED PG27AQDM 240Hz 0.03ms 1440p',
    handle: 'asus-rog-swift-oled-pg27aqdm-240hz',
    brand: 'ASUS ROG',
    category: 'Monitores Esports',
    price: 899.99,
    compareAtPrice: 1099.99,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80'
    ],
    badge: 'LANÇAMENTO OLED',
    inStock: true,
    stockQuantity: 4,
    description: 'Experimente a velocidade suprema com o painel OLED de 27 polegadas 1440p da ASUS ROG. Taxa de atualização fluida de 240Hz, tempo de resposta instantâneo de 0.03ms e dissipador de calor customizado inteligente.',
    shortDescription: 'OLED 27" 1440p, 240Hz, 0.03ms, G-Sync Compatible, HDR1000 True Black.',
    specs: [
      { label: 'Tamanho', value: '27 polegadas OLED' },
      { label: 'Resolução', value: '2560 x 1440 QHD' },
      { label: 'Taxa de Atualização', value: '240Hz' },
      { label: 'Tempo de Resposta', value: '0.03ms GtG' },
      { label: 'Conexões', value: '2x HDMI 2.0, 1x DP 1.4, Hub USB 3.2' },
      { label: 'Gama de Cores', value: '99% DCI-P3' }
    ],
    variants: [
      {
        name: 'Suporte',
        options: ['Base Ergonômica ROG', 'Sem Base (Vesa Ready)']
      },
      {
        name: 'Cor',
        options: ['Cyberpunk Stealth Black']
      }
    ],
    tags: ['oled', '240hz', 'asus', 'esports', 'monitor', 'rgb'],
    refreshRate: '240Hz',
    connectivity: 'DisplayPort 1.4',
    rgb: true,
    warrantyYears: 3,
    sku: 'ROG-PG27AQDM-BR',
    barcode: '4711081987654'
  },
  {
    id: 'prod-2',
    title: 'Teclado Gamer Magnético Wooting 60HE+ Hall Effect Rapid Trigger',
    handle: 'wooting-60he-plus-hall-effect-rapid-trigger',
    brand: 'Wooting',
    category: 'Teclados Mecânicos',
    price: 179.99,
    compareAtPrice: 219.99,
    rating: 5.0,
    reviewsCount: 389,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80'
    ],
    badge: 'ESPORTS FAVORITE',
    inStock: true,
    stockQuantity: 7,
    description: 'O teclado mais veloz do mundo com sensores magnéticos Lekker Hall Effect. Rapid Trigger ajustável de 0.1mm a 4.0mm com atuação analógica contínua, zero debounce delay e personalização avançada por software web.',
    shortDescription: 'Switches Magnéticos Hall Effect, Rapid Trigger 0.1mm, Polling Rate 1000Hz.',
    specs: [
      { label: 'Layout', value: '60% Compact ANSI' },
      { label: 'Switches', value: 'Lekker Hall Effect Magnéticos' },
      { label: 'Atuação', value: 'Ajustável de 0.1mm a 4.0mm' },
      { label: 'Rapid Trigger', value: 'Sensibilidade de 0.1mm com reset instantâneo' },
      { label: 'Keycaps', value: 'Double-shot PBT Pro' },
      { label: 'Iluminação', value: 'RGB Per-Key Customizável' }
    ],
    variants: [
      {
        name: 'Case',
        options: ['Alumínio Anodizado Preto', 'Ghost White Translucent']
      },
      {
        name: 'Switches',
        options: ['Lekker Linear L60 (60cN)', 'Lekker Light L45 (45cN)']
      }
    ],
    tags: ['wooting', 'rapid-trigger', 'hall-effect', 'fps', 'teclado'],
    connectivity: 'USB-C Destacável Trançado',
    switches: 'Hall Effect Magnético',
    rgb: true,
    warrantyYears: 2,
    sku: 'WT-60HE-PLUS-BR',
    barcode: '8720299876541'
  },
  {
    id: 'prod-3',
    title: 'Mouse Gamer Sem Fio Logitech G PRO X Superlight 2 Lightspeed 32K DPI',
    handle: 'logitech-g-pro-x-superlight-2-wireless-black',
    brand: 'Logitech G',
    category: 'Mouses & Periféricos',
    price: 159.99,
    compareAtPrice: 189.99,
    rating: 4.8,
    reviewsCount: 520,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'
    ],
    badge: 'MAIS VENDIDO',
    inStock: true,
    stockQuantity: 18,
    description: 'Evolução do mouse mais icônico dos campeonatos de esports. Pesa apenas 60g, conta com os novos switches híbridos óptico-mecânicos LIGHTFORCE, sensor HERO 2 com mais de 32.000 DPI e polling rate de 4000Hz.',
    shortDescription: 'Apenas 60g ultraleve, sensor HERO 2 32K DPI, Switches Ópticos Lightforce, USB-C.',
    specs: [
      { label: 'Peso', value: '60 gramas ultraleve' },
      { label: 'Sensor', value: 'HERO 2 32.000 DPI' },
      { label: 'Switches', value: 'LIGHTFORCE Óptico-Mecânicos' },
      { label: 'Taxa de Polling', value: '4000Hz / 0.25ms Lightspeed' },
      { label: 'Bateria', value: 'Até 95 horas contínuas' },
      { label: 'Conexão', value: 'Wireless Lightspeed 2.4GHz + USB-C' }
    ],
    variants: [
      {
        name: 'Cor',
        options: ['Preto Matte', 'Branco Puro', 'Magenta Neon']
      }
    ],
    tags: ['logitech', 'superlight', 'mouse', 'wireless', 'esports'],
    connectivity: 'Wireless 2.4GHz Lightspeed',
    rgb: false,
    warrantyYears: 2,
    sku: 'LOGI-GPX2-BLK',
    barcode: '097855187654'
  },
  {
    id: 'prod-4',
    title: 'Headset Gamer Sem Fio Audeze Maxwell Planar Magnetic 90mm Driver',
    handle: 'audeze-maxwell-wireless-planar-magnetic-gaming-headset',
    brand: 'Audeze',
    category: 'Headsets & Áudio Pro',
    price: 299.99,
    compareAtPrice: 349.99,
    rating: 4.9,
    reviewsCount: 96,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
    ],
    badge: 'GRAU AUDIÓFILO',
    inStock: true,
    stockQuantity: 5,
    description: 'Áudio imersivo de estúdio em um headset gamer definitivo. Drivers Planar Magnetic maciços de 90mm, bateria de 80 horas, microfone com cancelamento de ruído por inteligência artificial e áudio espacial Dolby Atmos.',
    shortDescription: 'Drivers Planar Magnetic 90mm, 80h de bateria, Bluetooth 5.3 + 2.4GHz sem delay.',
    specs: [
      { label: 'Transdutores', value: 'Planar Magnetic 90mm' },
      { label: 'Resposta de Frequência', value: '10Hz - 50.000Hz' },
      { label: 'Áudio Espacial', value: 'Dolby Atmos integrado (licença inclusa)' },
      { label: 'Bateria', value: 'Mais de 80 horas de reprodução' },
      { label: 'Microfone', value: 'IA Hardware Noise Reduction Shure' },
      { label: 'Conectividade', value: '2.4GHz Ultra-low latency, BT 5.3 LDAC, USB-C' }
    ],
    variants: [
      {
        name: 'Plataforma',
        options: ['PC / PlayStation 5 / Switch', 'PC / Xbox Series X / Mobile']
      }
    ],
    tags: ['audeze', 'planar', 'headset', 'audiophile', 'wireless'],
    connectivity: 'Wireless 2.4GHz + BT 5.3',
    rgb: false,
    warrantyYears: 2,
    sku: 'AUD-MAXWELL-PC',
    barcode: '812234032190'
  },
  {
    id: 'prod-5',
    title: 'Placa de Vídeo ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X',
    handle: 'asus-rog-strix-geforce-rtx-4090-oc-24gb',
    brand: 'ASUS ROG',
    category: 'Placas de Vídeo & Hardware',
    price: 1899.99,
    compareAtPrice: 2099.99,
    rating: 5.0,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80',
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80'
    ],
    badge: 'FLAGSHIP SUPREMO',
    inStock: true,
    stockQuantity: 2,
    description: 'A GPU de jogos mais poderosa da história da computação. Arquitetura NVIDIA Ada Lovelace com DLSS 3.5 com geração de quadros por IA, câmara de vapor patenteada e acabamento em alumínio fundido com iluminação Aura Sync.',
    shortDescription: '24GB GDDR6X, DLSS 3.5 Frame Generation, Câmara de Vapor, Boost Clock 2640 MHz.',
    specs: [
      { label: 'Memória de Vídeo', value: '24GB GDDR6X 384-bit' },
      { label: 'CUDA Cores', value: '16.384 núcleos' },
      { label: 'Interface', value: 'PCI Express 4.0' },
      { label: 'Refrigeração', value: 'Tri-Fan Axial-tech + Câmara de Vapor' },
      { label: 'Fonte Recomendada', value: '1000W 80 Plus Gold' },
      { label: 'Saídas', value: '2x HDMI 2.1a, 3x DisplayPort 1.4a' }
    ],
    variants: [
      {
        name: 'Edição',
        options: ['ROG Strix OC Black Edition', 'ROG Strix White Edition']
      }
    ],
    tags: ['rtx4090', 'nvidia', 'gpu', 'asus-rog', 'hardware', '4k'],
    rgb: true,
    warrantyYears: 3,
    sku: 'ROG-STRIX-RTX4090-O24G',
    barcode: '4711081912340'
  },
  {
    id: 'prod-6',
    title: 'Console Portátil ASUS ROG Ally X 24GB LPDDR5X 1TB SSD AMD Z1 Extreme',
    handle: 'asus-rog-ally-x-handheld-pc-1tb-24gb',
    brand: 'ASUS ROG',
    category: 'Consoles & Portáteis',
    price: 799.99,
    compareAtPrice: 899.99,
    rating: 4.8,
    reviewsCount: 215,
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80'
    ],
    badge: 'PORTÁTIL TOP TIER',
    inStock: true,
    stockQuantity: 6,
    description: 'Jogue todos os seus jogos de PC em qualquer lugar com ergonomia aprimorada, bateria de 80Wh (o dobro da geração anterior), 24GB de RAM ultrarrápida e 1TB de SSD M.2 2280 expansível com Windows 11 nativo.',
    shortDescription: 'Processador AMD Z1 Extreme, 24GB RAM 7500MHz, 1TB SSD NVMe, Tela 120Hz 1080p.',
    specs: [
      { label: 'Processador', value: 'AMD Ryzen Z1 Extreme (8 núcleos / 16 threads)' },
      { label: 'Gráficos', value: 'AMD Radeon RDNA 3 (12 CUs, até 8.6 TFlops)' },
      { label: 'Memória', value: '24GB LPDDR5X-7500 dual channel' },
      { label: 'Armazenamento', value: '1TB PCIe 4.0 NVMe M.2 SSD (2280)' },
      { label: 'Tela', value: '7" FHD 120Hz 500 nits IPS FreeSync Premium' },
      { label: 'Bateria', value: '80Wh com carregador PD 65W incluído' }
    ],
    variants: [
      {
        name: 'Armazenamento',
        options: ['1TB SSD NVMe M.2', '2TB SSD High-Speed Upgrade']
      }
    ],
    tags: ['rog-ally', 'handheld', 'console', 'asus', 'portatil'],
    refreshRate: '120Hz',
    connectivity: 'Wi-Fi 6E + Bluetooth 5.2',
    rgb: true,
    warrantyYears: 1,
    sku: 'ROG-ALLY-X-BR',
    barcode: '4711081882231'
  },
  {
    id: 'prod-7',
    title: 'Controlador de Transmissão Elgato Stream Deck MK.2 White Edition 15 Teclas LCD',
    handle: 'elgato-stream-deck-mk2-white-15-keys',
    brand: 'Elgato',
    category: 'Streaming & Setup Gadgets',
    price: 149.99,
    compareAtPrice: 179.99,
    rating: 4.9,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80'
    ],
    badge: 'SETUP ESSENCIAL',
    inStock: true,
    stockQuantity: 12,
    description: '15 teclas LCD personalizáveis para controlar seus jogos, streams, macros e automação residencial com um único toque. Suporte magnético destacável de 45 graus e cabo USB-C substituível.',
    shortDescription: '15 teclas LCD programáveis, controle de OBS, Spotify, Discord e macros instantâneas.',
    specs: [
      { label: 'Teclas', value: '15 teclas LCD coloridas programáveis' },
      { label: 'Interface', value: 'USB 2.0 / USB-C' },
      { label: 'Suporte', value: 'Angulado ergonômico 45° antiderrapante' },
      { label: 'Compatibilidade', value: 'Windows 10+, macOS 11+, Elgato Ecosystem' },
      { label: 'Dimensões', value: '118 x 84 x 25 mm (145g)' }
    ],
    variants: [
      {
        name: 'Cor',
        options: ['Frost White Edition', 'Midnight Stealth Black']
      }
    ],
    tags: ['elgato', 'stream-deck', 'streaming', 'setup', 'gadgets'],
    connectivity: 'USB-C com fio',
    rgb: true,
    warrantyYears: 2,
    sku: 'ELG-SD-MK2-WHT',
    barcode: '843591032876'
  },
  {
    id: 'prod-8',
    title: 'Carregador GaN Pro Anker Prime 200W 6 Portas Desktop Fast Charging Hub',
    handle: 'anker-prime-200w-gan-6-port-desktop-charger',
    brand: 'Anker',
    category: 'Smart Home & Gadgets',
    price: 129.99,
    compareAtPrice: 159.99,
    rating: 4.9,
    reviewsCount: 174,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80'
    ],
    badge: 'TECNOLOGIA GaN',
    inStock: true,
    stockQuantity: 15,
    description: 'Alimente todo o seu setup de uma vez só com a tecnologia GaNPrime 200W. 4 portas USB-C com Power Delivery 3.1 (até 140W em porta única para MacBooks e notebooks gamer) e 2 portas USB-A com controle térmico inteligente ActiveShield 3.0.',
    shortDescription: '200W de potência total, 4x USB-C + 2x USB-A, carrega 2 notebooks gamer simultaneamente.',
    specs: [
      { label: 'Potência Total', value: '200 Watts Máximos' },
      { label: 'Portas', value: '4x USB-C PD 3.1 + 2x USB-A' },
      { label: 'Saída Máxima Única', value: '140W USB-C' },
      { label: 'Proteção', value: 'ActiveShield 3.0 (3 milhões de verificações de temp/dia)' },
      { label: 'Eficiência', value: 'Tecnologia Nitreto de Gálio (GaN)' }
    ],
    variants: [
      {
        name: 'Voltagem',
        options: ['Bivolt Automático (100V - 240V)']
      }
    ],
    tags: ['anker', 'gan', 'charger', 'gadget', 'setup'],
    connectivity: 'USB-C Power Delivery',
    rgb: false,
    warrantyYears: 2,
    sku: 'ANK-PRIME-200W',
    barcode: '194644149872'
  },
  {
    id: 'prod-9',
    title: 'Barras de Iluminação Inteligente Nanoleaf Lines Gamer RGB 60Hz Sync Kit',
    handle: 'nanoleaf-lines-gamer-rgb-kit-9-smart-lightbars',
    brand: 'Nanoleaf',
    category: 'Smart Home & Gadgets',
    price: 199.99,
    compareAtPrice: 229.99,
    rating: 4.7,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80'
    ],
    badge: 'RAZER CHROMA SYNC',
    inStock: true,
    stockQuantity: 9,
    description: 'Transforme a iluminação ambiente da sua sala de jogos com barras LED retroiluminadas modulares com ângulos de 60 graus. Sincronização em tempo real com a tela do PC (Screen Mirror), Razer Chroma RGB e ritmo musical.',
    shortDescription: 'Kit 9 barras modulares, sincronização com tela em tempo real, Razer Chroma & Apple HomeKit.',
    specs: [
      { label: 'Quantidade', value: '9 Barras de Luz Modulares + Conectores' },
      { label: 'Cores', value: 'Mais de 16 milhões com tecnologia Dual Zone' },
      { label: 'Sincronização', value: 'Screen Mirror PC, Razer Chroma, Corsair iCUE' },
      { label: 'Conectividade', value: 'Wi-Fi 2.4GHz + Thread Border Router' },
      { label: 'Vida Útil', value: '25.000 horas de operação' }
    ],
    variants: [
      {
        name: 'Formato',
        options: ['Kit 9 Barras Angulares 60°', 'Kit 15 Barras Pro Setup']
      }
    ],
    tags: ['nanoleaf', 'rgb', 'smart-light', 'setup', 'razer-chroma'],
    connectivity: 'Wi-Fi & Bluetooth',
    rgb: true,
    warrantyYears: 2,
    sku: 'NANO-LINES-9PK',
    barcode: '740016550212'
  },
  {
    id: 'prod-10',
    title: 'Mousepad Gamer Esports Artisan FX Hayate Otsu XSoft XL Japan',
    handle: 'artisan-fx-hayate-otsu-xsoft-xl-mousepad',
    brand: 'Artisan',
    category: 'Mouses & Periféricos',
    price: 64.99,
    compareAtPrice: 79.99,
    rating: 5.0,
    reviewsCount: 240,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80'
    ],
    badge: 'MADE IN JAPAN',
    inStock: true,
    stockQuantity: 8,
    description: 'O padrão ouro dos jogadores profissionais de Valorant e CS2. Base de borracha natural com sucção especial que não desliza na mesa, bordas ultra finas costuradas e deslize híbrido de velocidade e controle cirúrgico.',
    shortDescription: 'Tecido jacquard japonês, base XSoft anti-derrapante, bordas micro costuradas.',
    specs: [
      { label: 'Dimensões', value: '490 x 420 x 4 mm (Tamanho XL)' },
      { label: 'Dureza da Espuma', value: 'XSoft (extra macio e com alto stopping power)' },
      { label: 'Origem', value: 'Kobe, Japão (Importado Original)' },
      { label: 'Superfície', value: 'Híbrida de alta precisão com micro-textura' }
    ],
    variants: [
      {
        name: 'Tamanho',
        options: ['XL (490x420mm)', 'L (420x330mm)']
      },
      {
        name: 'Cor',
        options: ['Ninja Black', 'Wine Red']
      }
    ],
    tags: ['artisan', 'mousepad', 'esports', 'japan', 'cs2'],
    rgb: false,
    warrantyYears: 1,
    sku: 'ART-HAYATE-XL-XS',
    barcode: '456037890123'
  },
  {
    id: 'prod-11',
    title: 'Óculos de Realidade Virtual Meta Quest 3 512GB com Mixed Reality 4K+',
    handle: 'meta-quest-3-512gb-mixed-reality-vr-headset',
    brand: 'Meta',
    category: 'Consoles & Portáteis',
    price: 649.99,
    compareAtPrice: 729.99,
    rating: 4.8,
    reviewsCount: 165,
    images: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=800&q=80',
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80'
    ],
    badge: 'REALIDADE MISTA',
    inStock: true,
    stockQuantity: 10,
    description: 'Mergulhe em jogos imersivos de ponta com o novo chip Snapdragon XR2 Gen 2, lentes Pancake ultranítidas com resolução 4K+ Infinite Display e câmeras duplas coloridas de alta resolução para Realidade Mista.',
    shortDescription: 'Snapdragon XR2 Gen 2, Lentes Pancake 4K+, Passthrough Colorido, 512GB.',
    specs: [
      { label: 'Resolução', value: '2064 x 2208 pixels por olho (Infinite Display 4K+)' },
      { label: 'Taxa de Atualização', value: '90Hz / 120Hz nativos' },
      { label: 'Processador', value: 'Qualcomm Snapdragon XR2 Gen 2' },
      { label: 'Armazenamento', value: '512GB de alta velocidade' },
      { label: 'Áudio', value: 'Alto-falantes espaciais 3D integrados (+40% graves)' },
      { label: 'Controles', value: 'Touch Plus com háptica TruTouch e rastreamento direto de mãos' }
    ],
    variants: [
      {
        name: 'Armazenamento',
        options: ['512GB High Capacity', '128GB Base']
      }
    ],
    tags: ['vr', 'meta-quest', 'mixed-reality', 'gadget', 'gaming'],
    refreshRate: '120Hz',
    connectivity: 'Wi-Fi 6E + USB-C Link',
    rgb: false,
    warrantyYears: 1,
    sku: 'META-Q3-512',
    barcode: '815820023456'
  },
  {
    id: 'prod-12',
    title: 'Controle Sem Fio Sony DualSense Edge Pro Wireless PS5 / PC Personalizável',
    handle: 'sony-dualsense-edge-pro-wireless-controller-ps5-pc',
    brand: 'Sony PlayStation',
    category: 'Mouses & Periféricos',
    price: 199.99,
    compareAtPrice: 229.99,
    rating: 4.9,
    reviewsCount: 278,
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80'
    ],
    badge: 'PRO ESPORTS',
    inStock: true,
    stockQuantity: 11,
    description: 'Construído para alta performance com módulos de analógicos substituíveis, botões traseiros remapeáveis em metal, travas de gatilho ajustáveis para tiros mais rápidos e perfis de controle sob medida para cada jogo.',
    shortDescription: 'Módulos de analógicos trocáveis, gatilhos ajustáveis, botões traseiros de metal.',
    specs: [
      { label: 'Botões Traseiros', value: '2 botões intercambiáveis (Alavanca ou Meia Cúpula)' },
      { label: 'Travas de Gatilho', value: '3 posições mecânicas para menor curso de disparo' },
      { label: 'Cabo Trançado', value: '2.8m com travamento de conexão seguro' },
      { label: 'Estojo de Transporte', value: 'Incluso com carregamento interno via USB-C' },
      { label: 'Compatibilidade', value: 'PlayStation 5, PC Windows, Steam, macOS, iOS, Android' }
    ],
    variants: [
      {
        name: 'Módulos Extras',
        options: ['Padrão com Estojo Rígido', 'Kit com 2 Módulos Analógicos Extras']
      }
    ],
    tags: ['dualsense', 'ps5', 'controller', 'pro', 'sony'],
    connectivity: 'Wireless Bluetooth + USB-C',
    rgb: true,
    warrantyYears: 1,
    sku: 'SONY-DS-EDGE-BR',
    barcode: '711719543210'
  }
];

export const CATEGORIES = [
  'Todos os Produtos',
  'Monitores Esports',
  'Teclados Mecânicos',
  'Mouses & Periféricos',
  'Headsets & Áudio Pro',
  'Placas de Vídeo & Hardware',
  'Consoles & Portáteis',
  'Streaming & Setup Gadgets',
  'Smart Home & Gadgets'
];

export const BRANDS = [
  'ASUS ROG',
  'Logitech G',
  'Wooting',
  'Audeze',
  'Sony PlayStation',
  'Elgato',
  'Anker',
  'Nanoleaf',
  'Artisan',
  'Meta'
];

export const REFRESH_RATES = ['120Hz', '144Hz', '240Hz', '360Hz'];

export const SWITCH_TYPES = [
  'Hall Effect Magnético',
  'Linear Red Mecânico',
  'Óptico-Mecânico Lightforce',
  'Tactile Brown'
];

export const CONNECTIVITY_OPTIONS = [
  'Wireless 2.4GHz Lightspeed',
  'Wireless 2.4GHz + BT 5.3',
  'Wi-Fi 6E + Bluetooth 5.2',
  'USB-C Destacável Trançado',
  'DisplayPort 1.4'
];
