export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  features: string[];
}

export const products: Product[] = [
  {
    id: 'laptop',
    name: 'Laptop Pro',
    category: 'Electronics',
    description:
      'High-performance laptop with the latest processor and stunning display. Perfect for professionals and creators.',
    image: '/shop/laptop.png',
    price: 1299.99,
    originalPrice: 1499.99,
    features: ['16GB RAM', '512GB SSD', '4K Display', 'All-day battery'],
  },
  {
    id: 'phone',
    name: 'Smartphone Ultra',
    category: 'Electronics',
    description:
      'Next-generation smartphone with advanced camera system and all-day battery life.',
    image: '/shop/phone.png',
    price: 899.99,
    features: ['5G', '120Hz Display', 'Triple Camera', 'Wireless Charging'],
  },
  {
    id: 'tablet',
    name: 'Tablet Air',
    category: 'Electronics',
    description:
      'Thin and light tablet perfect for entertainment, creativity, and productivity on the go.',
    image: '/shop/tablet.png',
    price: 649.99,
    originalPrice: 749.99,
    features: ['10.9" Display', 'Pencil Support', 'Face ID', 'USB-C'],
  },
  {
    id: 'headphones',
    name: 'Wireless Headphones',
    category: 'Audio',
    description:
      'Premium over-ear headphones with active noise cancellation and spatial audio.',
    image: '/shop/balls.png',
    price: 349.99,
    features: ['40hr Battery', 'ANC', 'Spatial Audio', 'Multipoint'],
  },
  {
    id: 'shoes',
    name: 'Running Shoes',
    category: 'Sports',
    description:
      'Lightweight running shoes designed for comfort and performance during your daily runs.',
    image: '/shop/shoes.png',
    price: 129.99,
    originalPrice: 159.99,
    features: ['Breathable Mesh', 'Cushioned Sole', 'Lightweight', 'Durable'],
  },
  {
    id: 'weights',
    name: 'Adjustable Weights',
    category: 'Sports',
    description:
      'Versatile adjustable dumbbells that replace an entire rack of weights.',
    image: '/shop/weights.png',
    price: 299.99,
    features: ['5-50 lbs', 'Quick Adjust', 'Compact', 'Durable'],
  },
  {
    id: 'gloves',
    name: 'Training Gloves',
    category: 'Sports',
    description:
      'Professional training gloves with wrist support and padded palms.',
    image: '/shop/gloves.png',
    price: 49.99,
    features: [
      'Wrist Support',
      'Padded Palm',
      'Breathable',
      'Machine Washable',
    ],
  },
  {
    id: 'top',
    name: 'Athletic Top',
    category: 'Apparel',
    description:
      'Moisture-wicking athletic top for intense workouts and casual wear.',
    image: '/shop/top.png',
    price: 39.99,
    features: ['Moisture-Wicking', 'Quick Dry', 'Stretchy', 'Odor Resistant'],
  },
];
