export type Category = 'All' | 'Jhumkas' | 'Necklaces' | 'Bangles' | 'Nose Pins' | 'Anklets';

export interface JewelryItem {
  id: string;
  name: string;
  category: Category;
  price: string;
  description: string;
  image: string;
  material: string;
  isNew?: boolean;
}

export interface ContactInfo {
  whatsapp: string;
  email: string;
  instagram: string;
  address: string;
}
