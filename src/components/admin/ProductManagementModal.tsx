import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { ShawlProduct, FabricType, TierGrade, ArticleType } from '../../types/product';
import { useProducts } from '../../context/ProductContext';

interface ProductManagementModalProps {
  productToEdit?: ShawlProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductManagementModal: React.FC<ProductManagementModalProps> = ({
  productToEdit,
  isOpen,
  onClose,
}) => {
  const { addProduct, updateProduct, applyDiscount } = useProducts();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(25000);
  const [compareAtPrice, setCompareAtPrice] = useState<number | undefined>(undefined);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [tierGrade, setTierGrade] = useState<TierGrade>('Platinum');
  const [articleType, setArticleType] = useState<ArticleType>('Wool Pure Single');
  const [fabric, setFabric] = useState<FabricType>('Wool Pure Single');
  const [subCategory, setSubCategory] = useState<'Pashmina' | 'Kani' | 'Cashmere' | 'Silk Fusion' | 'Heirloom'>('Pashmina');
  const [dimensions, setDimensions] = useState('100 cm x 200 cm');
  const [weight, setWeight] = useState('180 grams');
  const [micronCount, setMicronCount] = useState('12.5 Microns');
  const [origin, setOrigin] = useState('Srinagar, Kashmir Valley');
  const [imageUrl, setImageUrl] = useState('');
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const [colors, setColors] = useState<{ name: string; hex: string; image?: string }[]>([
    { name: 'Peach Gold', hex: '#FFBE91' },
    { name: 'Warm Cream', hex: '#FFDDB0' },
  ]);

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setSubtitle(productToEdit.subtitle);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setCompareAtPrice(productToEdit.compareAtPrice);
      setTierGrade(productToEdit.tierGrade || 'Platinum');
      setArticleType(productToEdit.articleType || 'Wool Pure Single');
      setSubCategory(productToEdit.subCategory);
      setFabric(productToEdit.fabric);
      setDimensions(productToEdit.dimensions);
      setWeight(productToEdit.weight);
      setMicronCount(productToEdit.micronCount);
      setOrigin(productToEdit.origin);
      setImageUrl(productToEdit.images[0] || '');
      setIsOutOfStock(productToEdit.isOutOfStock || false);
      setColors(productToEdit.colors || []);
    } else {
      setTitle('');
      setSubtitle('');
      setDescription('');
      setPrice(25000);
      setCompareAtPrice(undefined);
      setDiscountPercent(0);
      setTierGrade('Platinum');
      setArticleType('Wool Pure Single');
      setIsOutOfStock(false);
      setImageUrl('https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1000&q=80');
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddColor = () => {
    setColors([...colors, { name: 'New Color', hex: '#FFD6BA' }]);
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    let finalPrice = price;
    let finalCompareAt = compareAtPrice;

    if (discountPercent > 0) {
      finalCompareAt = price;
      finalPrice = Math.round(price * (1 - discountPercent / 100));
    }

    const defaultSops = {
      washing: ['Dry Clean Only recommended.'],
      storage: ['Store clean shawls in breathable cotton bags provided.'],
      steaming: ['Use a low-temperature garment steamer.'],
      authenticity: ['Passes Kashmir quality inspection.']
    };

    if (productToEdit) {
      updateProduct({
        ...productToEdit,
        title,
        subtitle,
        description,
        price: finalPrice,
        compareAtPrice: finalCompareAt,
        tierGrade,
        articleType,
        subCategory,
        fabric: fabric || articleType,
        dimensions,
        weight,
        micronCount,
        origin,
        images: [imageUrl || productToEdit.images[0]],
        colors,
        isOutOfStock,
      });

      if (discountPercent > 0) {
        applyDiscount(productToEdit.id, discountPercent);
      }
    } else {
      const created = addProduct({
        title,
        subtitle,
        description,
        price: finalPrice,
        compareAtPrice: finalCompareAt,
        tierGrade,
        articleType,
        subCategory,
        fabric: articleType,
        dimensions,
        weight,
        micronCount,
        origin,
        images: [imageUrl || 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1000&q=80'],
        colors,
        tags: [subCategory, articleType, tierGrade],
        sops: defaultSops,
        isNewArrival: true,
        isOutOfStock,
      });

      if (discountPercent > 0) {
        applyDiscount(created.id, discountPercent);
      }
    }

    onClose();
  };

  const articleTypeList: ArticleType[] = [
    'Acrylic',
    'Wool 50-50 single',
    'Wool 60-40 single',
    'Wool 70-30 single',
    'Wool 80-20 single',
    'Wool Pure Single',
    'Wool 50-50 double',
    'Wool 60-40 double',
    'Wool 70-30 double',
    'Wool 80-20 double',
    'Wool Pure double',
    'Wool 96 Pure Single',
    'Wool 96 Pure double',
    'Wool 72Pure Single',
    'Wool 72Pure double',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#4A2B20]/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFF2EB] text-[#4A2B20] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-[#FFE8CD] relative my-8">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#FFE8CD] flex justify-between items-center">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#6B3E30]">WADIY-E-PASHAM Admin</span>
            <h3 className="font-serif text-xl font-bold text-[#4A2B20]">
              {productToEdit ? 'Edit Shawl Article' : 'Add New Shawl Article'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-500 hover:text-[#4A2B20] hover:bg-[#FFE8CD]/40 transition"
          >
            <X className="w-6 h-6 text-[#4A2B20]" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Main Info */}
          <div className="bg-white p-6 rounded-2xl border border-[#FFE8CD] space-y-4">
            <h4 className="font-serif text-base font-bold text-[#4A2B20]">Product Basics & Stock Status</h4>

            <div className="flex items-center gap-3 p-3 bg-[#FFE8CD]/50 rounded-xl border border-[#FFD6BA]">
              <input
                type="checkbox"
                id="outOfStockToggle"
                checked={isOutOfStock}
                onChange={(e) => setIsOutOfStock(e.target.checked)}
                className="w-4 h-4 rounded text-[#4A2B20] focus:ring-[#FFD6BA]"
              />
              <label htmlFor="outOfStockToggle" className="text-xs font-bold text-[#4A2B20] cursor-pointer">
                Mark Article as Out of Stock (Disables Ordering on Website)
              </label>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Royal Pashmina Stole"
                  className="w-full px-3.5 py-2 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:ring-2 focus:ring-[#FFD6BA]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Subtitle / Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Handwoven Single Weave"
                  className="w-full px-3.5 py-2 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:ring-2 focus:ring-[#FFD6BA]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed craft description..."
                className="w-full px-3.5 py-2 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm focus:ring-2 focus:ring-[#FFD6BA] resize-none"
              />
            </div>
          </div>

          {/* Pricing & Discount */}
          <div className="bg-white p-6 rounded-2xl border border-[#FFE8CD] space-y-4">
            <h4 className="font-serif text-base font-bold text-[#4A2B20] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#4A2B20]" /> Pricing & Discount Management
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Base Price (PKR) *
                </label>
                <input
                  type="number"
                  required
                  min={1000}
                  step={500}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm font-bold text-[#4A2B20]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Apply Discount (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={70}
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  placeholder="e.g. 15"
                  className="w-full px-3.5 py-2 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm font-bold text-[#6B3E30]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Calculated Price
                </label>
                <div className="px-3.5 py-2 bg-[#FFD6BA] rounded-xl text-sm font-bold text-[#4A2B20] border border-[#FFE8CD]">
                  PKR {discountPercent > 0 ? Math.round(price * (1 - discountPercent / 100)).toLocaleString() : price.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Tier Grade & Article Type */}
          <div className="bg-white p-6 rounded-2xl border border-[#FFE8CD] space-y-4">
            <h4 className="font-serif text-base font-bold text-[#4A2B20]">Tier Grade & Article Weave Type</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Luxury Tier Grade *
                </label>
                <select
                  value={tierGrade}
                  onChange={(e) => setTierGrade(e.target.value as TierGrade)}
                  className="w-full px-3.5 py-2 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm font-semibold text-[#4A2B20]"
                >
                  <option value="Platinum">Platinum Tier</option>
                  <option value="Gold">Gold Tier</option>
                  <option value="Diamond">Diamond Tier</option>
                  <option value="Imperial">Imperial Tier</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Article Weave Category *
                </label>
                <select
                  value={articleType}
                  onChange={(e) => setArticleType(e.target.value as ArticleType)}
                  className="w-full px-3.5 py-2 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm font-semibold text-[#4A2B20]"
                >
                  {articleTypeList.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                Image URL (e.g. /images/shawls/... or Unsplash URL) *
              </label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2 bg-[#FFF2EB] border border-[#FFE8CD] rounded-xl text-sm text-[#4A2B20]"
              />
            </div>
          </div>

          {/* Color Options */}
          <div className="bg-white p-6 rounded-2xl border border-[#FFE8CD] space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-serif text-base font-bold text-[#4A2B20]">Available Color Swatches</h4>
              <button
                type="button"
                onClick={handleAddColor}
                className="px-3 py-1.5 bg-[#FFD6BA] text-[#4A2B20] text-xs font-bold rounded-lg hover:bg-[#FFE8CD] transition border border-[#FFE8CD]"
              >
                + Add Color Swatch
              </button>
            </div>

            <div className="space-y-3">
              {colors.map((color, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-[#FFF2EB] rounded-xl border border-[#FFE8CD]">
                  <input
                    type="color"
                    value={color.hex}
                    onChange={(e) => {
                      const updated = [...colors];
                      updated[idx].hex = e.target.value;
                      setColors(updated);
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={color.name}
                    onChange={(e) => {
                      const updated = [...colors];
                      updated[idx].name = e.target.value;
                      setColors(updated);
                    }}
                    placeholder="Color Name"
                    className="flex-1 px-3 py-1.5 bg-white border border-[#FFE8CD] rounded-lg text-xs font-semibold text-[#4A2B20]"
                  />
                  {colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(idx)}
                      className="text-stone-400 hover:text-rose-600 font-bold text-xs px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#FFD6BA] text-[#4A2B20] font-bold rounded-xl hover:bg-[#FFE8CD] transition shadow-lg text-sm border border-[#FFE8CD]"
          >
            {productToEdit ? 'Save Changes to Article' : 'Create & Publish Article'}
          </button>

        </form>

      </div>
    </div>
  );
};
