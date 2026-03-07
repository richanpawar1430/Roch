import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Mail, Phone, MapPin, ArrowRight, Gem } from 'lucide-react';
import { cn } from './lib/utils';
import { Category, JewelryItem } from './types';
import { JEWELRY_DATA } from './data/jewelry';
import { CONFIG } from './config';
import { Logo } from './components/Logo';
import Papa from 'papaparse';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'The Collection', href: '#catalogue' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-white/90 backdrop-blur-md border-b border-brand-200 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          {CONFIG.LOGO_URL ? (
            <img 
              src={formatImageUrl(CONFIG.LOGO_URL)} 
              alt={CONFIG.BUSINESS_NAME} 
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          ) : (
            <Logo size="md" />
          )}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-medium text-stone-600 hover:text-brand-700 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2 text-stone-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-brand-200 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest font-medium text-stone-600 py-2 border-b border-stone-100 last:border-0"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=1920"
          alt="Indian Jewelry Background"
          className="w-full h-full object-cover opacity-30 grayscale-[50%]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 via-transparent to-brand-50"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="block text-[10px] uppercase tracking-[0.6em] text-brand-700 mb-8 font-semibold"
        >
          Curated Indian Heritage
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-9xl font-serif mb-12 leading-[0.9] text-brand-900 tracking-tighter"
        >
          Timeless <br />
          <span className="italic font-light text-brand-600">Elegance</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm md:text-base text-brand-600 mb-12 max-w-md mx-auto font-light leading-relaxed tracking-wide"
        >
          Where centuries of craftsmanship meet contemporary elegance. Each oxidised piece whispers stories of India's timeless artistry.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <a
            href="#catalogue"
            className="px-10 py-4 bg-brand-900 text-brand-50 rounded-none text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-800 transition-all"
          >
            Explore Collection
          </a>
          <a
            href="#contact"
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-900 border-b border-brand-900 pb-1 hover:text-brand-600 hover:border-brand-600 transition-all"
          >
            Personal Inquiry
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const formatImageUrl = (url: string) => {
  if (!url) return '';
  // Match Google Drive file ID from various URL formats
  const driveMatch = url.match(/\/file\/d\/([^\/?#]+)/) || url.match(/id=([^\/&?#]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }
  return url;
};

// --- Featured Product Fallback ---
const FALLBACK_FEATURED = {
  name: "The Royal Bridal Set",
  category: "Bridal Series",
  price: "Price on Request",
  description: "An exclusive masterpiece featuring intricate temple motifs and cascading pearls. Designed for the modern bride looking to embrace timeless heritage.",
  images: [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1535633302704-b02f4fad253f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800'
  ]
};

interface FeaturedProduct {
  name: string;
  category: string;
  price: string;
  description: string;
  images: string[];
}
const HorizontalScrollGallery = () => {
  const [product, setProduct] = useState<FeaturedProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRemoteData = async () => {
      const sheetUrl = CONFIG.FEATURED_SHEET_CSV_URL;
      if (!sheetUrl) {
        setProduct(FALLBACK_FEATURED);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(sheetUrl);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Assume the sheet either has multiple columns for images (image1, image2, etc.)
            // OR multiple rows for the same product, where each row is a new image.
            
            if (results.data.length === 0) {
              setProduct(FALLBACK_FEATURED);
              return;
            }

            // Let's build a single product from the first row's metadata
            const firstRow: any = results.data[0];
            const featured: FeaturedProduct = {
              name: firstRow.name || firstRow.Title || 'Exclusive Showcase',
              category: firstRow.category || firstRow.Category || 'Signature Series',
              price: firstRow.price || firstRow.Price || 'Price on Request',
              description: firstRow.description || firstRow.Description || 'Discover our most celebrated and timeless creation.',
              images: []
            };

            // Collect all unique images from all rows (if they span multiple rows)
            // or multiple columns (image, image1, image2, etc)
            const allImages = new Set<string>();

            results.data.forEach((row: any) => {
              // Check common image column names
              const possibleImageKeys = ['image', 'image1', 'image2', 'image3', 'hoverImage', 'Image', 'Image 1', 'Image 2'];
              possibleImageKeys.forEach(key => {
                if (row[key] && typeof row[key] === 'string' && row[key].trim() !== '') {
                  allImages.add(formatImageUrl(row[key]));
                }
              });
            });

            if (allImages.size > 0) {
              featured.images = Array.from(allImages);
              setProduct(featured);
            } else {
              setProduct(FALLBACK_FEATURED);
            }
          }
        });
      } catch (error) {
        console.error('Error fetching featured data:', error);
        setProduct(FALLBACK_FEATURED);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemoteData();
  }, []);

  if (!product) return null;

  return (
    <section className="py-24 bg-brand-50 relative border-y border-brand-200">
      <div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.5em] text-brand-700 font-bold mb-4 block">
            {product.category}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-900 leading-tight mb-6">
            {product.name}
          </h2>
          <p className="text-sm text-brand-600 font-light tracking-wide leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="shrink-0 flex flex-col items-start md:items-end gap-6">
          <span className="text-xl font-sans font-medium text-brand-700 tracking-tight">{product.price}</span>
          <button 
            onClick={() => window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(/\+/g, '')}?text=Hi, I'm interested in the ${product.name} from the Signature Series`, '_blank')}
            className="px-10 py-4 bg-brand-900 text-brand-50 rounded-none text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-800 transition-all flex items-center gap-3"
          >
            Inquire Details <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container - Images Uncropped */}
      {/* We use items-center so images of different heights align nicely in the center */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 px-6 md:px-12 pb-12 w-full items-center">
        {/* Spacer for initial margin alignment */}
        <div className="snap-center shrink-0 w-[1px] md:w-[calc((100vw-80rem)/2)] hidden xl:block" aria-hidden="true" />
        
        {product.images.map((imgUrl, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="snap-center shrink-0 relative luxury-shadow bg-white rounded-sm p-4 md:p-6 flex items-center justify-center max-w-[90vw] md:max-w-3xl max-h-[70vh] group"
          >
            <img
              src={imgUrl}
              alt={`${product.name} - View ${index + 1}`}
              className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
              draggable="false"
              style={{ maxHeight: 'calc(70vh - 3rem)' }} // Account for padding
            />
          </motion.div>
        ))}
        
        {/* Spacer for end margin */}
        <div className="snap-center shrink-0 w-6 md:w-12" aria-hidden="true" />
      </div>
    </section>
  );
};

const Catalogue = ({ onCategoriesLoaded }: { onCategoriesLoaded: (cats: string[]) => void }) => {
  const [items, setItems] = useState<JewelryItem[]>(JEWELRY_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [categories, setCategories] = useState<Category[]>(() => {
    // Seed categories from fallback static data so filters appear immediately
    const fallbackCats = Array.from(new Set(JEWELRY_DATA.map(i => i.category).filter(Boolean)));
    return ['All', ...fallbackCats];
  });
  const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');

  useEffect(() => {
    const fetchRemoteData = async () => {
      const sheetUrl = CONFIG.GOOGLE_SHEET_CSV_URL;
      if (!sheetUrl) return;

      setIsLoading(true);
      try {
        const response = await fetch(sheetUrl);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data.map((row: any) => {
              const item = {
                id: row.id || Math.random().toString(36).substr(2, 9),
                name: row.name || 'Unnamed Piece',
                category: row.category as Category,
                price: row.price || '₹TBD',
                description: row.description || '',
                image: formatImageUrl(row.image || ''),
                hoverImage: row.hoverImage ? formatImageUrl(row.hoverImage) : undefined,
                material: row.material || 'Oxidised Silver Finish',
                isNew: row.isNew === 'true' || row.isNew === '1'
              };
              return item;
            });
            
            if (parsedData.length > 0) {
              setItems(parsedData);
              // Dynamically build categories from sheet data
              const uniqueCats = Array.from(new Set<string>(parsedData.map((i: JewelryItem) => i.category).filter(Boolean)));
              const dynamicCategories = ['All', ...uniqueCats];
              setCategories(dynamicCategories);
              onCategoriesLoaded(uniqueCats);
            }
          }
        });
      } catch (error) {
        console.error('Error fetching remote jewelry data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemoteData();
  }, []);

  // Helper to extract numeric price value for sorting
  const extractPrice = (price: string): number => {
    const match = price.replace(/,/g, '').match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const filteredItems = (() => {
    const categoryFiltered = activeCategory === 'All'
      ? items
      : items.filter(item => item.category === activeCategory);
    
    if (priceSort === 'asc') return [...categoryFiltered].sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
    if (priceSort === 'desc') return [...categoryFiltered].sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
    return categoryFiltered;
  })();

  return (
    <section id="catalogue" className="py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-brand-700 font-bold mb-4 block">The Collection</span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-900">Curated Adornments</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-[10px] uppercase tracking-[0.3em] font-bold transition-all pb-1 border-b",
                    activeCategory === cat
                      ? "text-brand-900 border-brand-900"
                      : "text-brand-400 border-transparent hover:text-brand-700"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Price Sort Dropdown */}
            <div className="relative ml-auto">
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value as 'default' | 'asc' | 'desc')}
                className="appearance-none bg-white border border-brand-200 text-brand-700 text-[10px] uppercase tracking-[0.3em] font-bold px-4 py-2 pr-8 focus:outline-none focus:border-brand-900 cursor-pointer hover:border-brand-700 transition-colors"
              >
                <option value="default">Sort by Price</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
              {/* Custom chevron icon */}
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg className="w-3 h-3 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4 text-stone-400">
              <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-800 rounded-full animate-spin"></div>
              <p className="text-xs uppercase tracking-widest font-bold">Refreshing Collection...</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-none mb-6 luxury-shadow bg-brand-50 min-h-[200px] flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={cn(
                        "w-full h-full object-contain transition-transform duration-1000",
                        item.hoverImage && "group-hover:scale-105 group-hover:opacity-0"
                      )}
                      referrerPolicy="no-referrer"
                    />
                    {item.hoverImage && (
                      <img
                        src={item.hoverImage}
                        alt={`${item.name} alternate view`}
                        className="absolute inset-0 w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105 opacity-0 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    {item.isNew && (
                      <div className="absolute top-4 left-4 bg-brand-900 text-brand-50 text-[8px] uppercase tracking-[0.3em] px-3 py-1.5 font-bold">
                        New Arrival
                      </div>
                    )}
                    <div className="absolute inset-0 bg-brand-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <button 
                        onClick={() => window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(/\+/g, '')}?text=Hi, I'm interested in the ${item.name}`, '_blank')}
                        className="bg-brand-900 text-brand-50 px-8 py-3 rounded-none text-[9px] uppercase tracking-[0.2em] font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                      >
                        Acquire Piece
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-brand-500 font-bold mb-2 block">{item.category}</span>
                    <h3 className="font-serif text-brand-900 mb-2 text-xl">{item.name}</h3>
                    <span className="text-xs font-light tracking-widest text-brand-600">{item.price}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-brand-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center md:text-left mb-16">
          <span className="text-[10px] uppercase tracking-[0.5em] text-brand-700 font-bold mb-4 block">Get In Touch</span>
          <h2 className="text-4xl md:text-6xl font-serif text-brand-900 mb-8 leading-tight">Connect with <span className="italic">{CONFIG.BUSINESS_NAME}</span></h2>
          <p className="text-base text-brand-700 mb-12 font-light leading-relaxed tracking-wide max-w-2xl">
            Experience the timeless beauty of Indian craft. For bulk orders, custom designs, or inquiries, reach out to us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="flex items-center gap-6 group">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-700 luxury-shadow group-hover:bg-brand-800 group-hover:text-white transition-all">
              <Phone size={20} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block mb-1">WhatsApp Orders</span>
              <a 
                href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(/\+/g, '')}`}
                target="_blank"
                className="text-xl font-medium text-stone-800 hover:text-brand-800 transition-colors"
              >
                ROCH Jewelry Brand
              </a>
            </div>
          </div>

          <div className="flex items-center gap-6 group">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-700 luxury-shadow group-hover:bg-brand-800 group-hover:text-white transition-all">
              <Mail size={20} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block mb-1">Email Inquiries</span>
              <a href={`mailto:${CONFIG.EMAIL}`} className="text-xl font-medium text-stone-800 hover:text-brand-800 transition-colors">
                {CONFIG.EMAIL}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-6 group">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-700 luxury-shadow group-hover:bg-brand-800 group-hover:text-white transition-all">
              <Instagram size={20} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block mb-1">Follow Us</span>
              <a href={`https://instagram.com/${CONFIG.INSTAGRAM_HANDLE.replace('@', '')}`} target="_blank" className="text-xl font-medium text-stone-800 hover:text-brand-800 transition-colors">
                {CONFIG.INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-6 group">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-700 luxury-shadow group-hover:bg-brand-800 group-hover:text-white transition-all">
              <MapPin size={20} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block mb-1">Our Studio</span>
              <p className="text-xl font-medium text-stone-800">
                {CONFIG.ADDRESS}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ categories }: { categories: string[] }) => {
  return (
    <footer className="bg-stone-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            {CONFIG.LOGO_URL ? (
              <img 
                src={formatImageUrl(CONFIG.LOGO_URL)} 
                alt={CONFIG.BUSINESS_NAME} 
                className="h-12 w-auto object-contain mb-6 brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Logo variant="light" size="lg" className="items-start mb-6" />
            )}
            <p className="text-stone-400 max-w-sm font-light leading-relaxed">
              Celebrating the soul of Indian craftsmanship. Oxidised silver whispers ancient stories, each adornment a testament to artistry that transcends time.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6 text-brand-400">Shop</h4>
            <ul className="space-y-4 text-sm text-stone-400">
              {categories.map((cat) => (
                <li key={cat}><a href="#catalogue" className="hover:text-white transition-colors">{cat}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6 text-brand-400">Company</h4>
            <ul className="space-y-4 text-sm text-stone-400">
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-stone-500">
          <p>© 2025 {CONFIG.BUSINESS_NAME} Jewelry. Curated from India.</p>
          <div className="flex gap-8">
            <a href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(/\+/g, '')}`} target="_blank" className="hover:text-white transition-colors">WhatsApp</a>
            <a href={`https://instagram.com/${CONFIG.INSTAGRAM_HANDLE.replace('@', '')}`} target="_blank" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [shopCategories, setShopCategories] = useState<string[]>([]);

  return (
    <div className="min-h-screen selection:bg-brand-200 selection:text-brand-900">
      <Navbar />
      <main>
        <Hero />
        <HorizontalScrollGallery />
        <Catalogue onCategoriesLoaded={setShopCategories} />
        <Contact />
      </main>
      <Footer categories={shopCategories} />
    </div>
  );
}
