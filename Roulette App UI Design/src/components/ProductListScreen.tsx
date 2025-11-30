import { useState, useEffect, useRef } from 'react';
import { Settings, RotateCw, ArrowLeft } from 'lucide-react';
import { AppState, Product } from '../App';
import { ConfirmationModal } from './ConfirmationModal';
import { WinnerModal } from './WinnerModal';

interface ProductListScreenProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToSettings: () => void;
  goToRoulette: () => void;
}

export function ProductListScreen({ appState, updateAppState, goToSettings, goToRoulette }: ProductListScreenProps) {
  const [randomizedProducts, setRandomizedProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winningProduct, setWinningProduct] = useState<Product | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize randomized products
  useEffect(() => {
    randomizeProducts();
  }, [appState.products]);

  // Measure container height
  useEffect(() => {
    const measureHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    measureHeight();
    window.addEventListener('resize', measureHeight);
    return () => window.removeEventListener('resize', measureHeight);
  }, []);

  const randomizeProducts = () => {
    const shuffled = [...appState.products].sort(() => Math.random() - 0.5);
    setRandomizedProducts(shuffled);
  };

  const handleReload = () => {
    randomizeProducts();
    updateAppState({ revealedProducts: [] });
    setSelectedProductId(null);
  };

  // Calculate optimal layout based on container height and product count
  const getOptimalLayout = () => {
    const productCount = randomizedProducts.length;
    const availableHeight = containerHeight;
    
    // Base item height estimates for different configurations
    const testConfigs = [
      { cols: 1, gap: 24, padding: 'py-8 px-4', fontSize: 'text-lg' },
      { cols: 2, gap: 16, padding: 'py-6 px-3', fontSize: 'text-base' },
      { cols: 3, gap: 12, padding: 'py-4 px-3', fontSize: 'text-sm' },
      { cols: 4, gap: 8, padding: 'py-3 px-2', fontSize: 'text-sm' },
      { cols: 5, gap: 6, padding: 'py-2 px-2', fontSize: 'text-xs' },
    ];

    // Find the configuration that best fits without scrolling
    for (const config of testConfigs) {
      const rows = Math.ceil(productCount / config.cols);
      const itemHeight = config.gap * 4 + 24; // Approximate item height based on gap
      const totalGap = (rows - 1) * config.gap;
      const estimatedHeight = rows * itemHeight + totalGap + 16; // +16 for container padding

      if (estimatedHeight <= availableHeight || config.cols === 5) {
        return config;
      }
    }

    return testConfigs[testConfigs.length - 1];
  };

  const layout = getOptimalLayout();

  const handleProductClick = (productId: number) => {
    if (!appState.revealedProducts.includes(productId)) {
      setSelectedProductId(productId);
    }
  };

  const handleDecideClick = () => {
    if (selectedProductId) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    if (selectedProductId) {
      const product = appState.products.find((p) => p.id === selectedProductId);
      if (product) {
        setWinningProduct(product);
        setShowWinnerModal(true);
      }
    }
  };

  const handleWinnerModalClose = () => {
    setShowWinnerModal(false);
    if (selectedProductId) {
      updateAppState({
        revealedProducts: [...appState.revealedProducts, selectedProductId],
      });
      setSelectedProductId(null);
      setWinningProduct(null);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="w-full mx-auto flex items-center justify-between px-4">
          <h1 className="text-gray-900">{appState.title}</h1>
          <div className="flex gap-2">
            <button
              onClick={goToRoulette}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              ルーレットに戻る
            </button>
            <button
              onClick={goToSettings}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="設定に戻る"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full p-6">
          {/* Product List */}
          <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">商品リスト</h2>
              <button
                onClick={handleReload}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="リロード"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2" ref={containerRef}>
              <div className={`grid content-start ${
                layout.cols === 1 ? 'grid-cols-1 gap-4' :
                layout.cols === 2 ? 'grid-cols-2 gap-3' :
                layout.cols === 3 ? 'grid-cols-3 gap-2' :
                layout.cols === 4 ? 'grid-cols-4 gap-1.5' :
                'grid-cols-5 gap-1'
              }`}>
                {randomizedProducts.map((product, index) => {
                  const isRevealed = appState.revealedProducts.includes(product.id);
                  const isSelected = selectedProductId === product.id;
                  const paddingClass = layout.padding;
                  const displayNumber = index + 1;
                  const productNameSize = 
                    layout.fontSize === 'text-xs' ? 'text-sm' :
                    layout.fontSize === 'text-sm' ? 'text-base' :
                    layout.fontSize === 'text-base' ? 'text-lg' :
                    layout.fontSize === 'text-lg' ? 'text-xl' : 'text-base';
                  
                  // レアリティに応じた背景色
                  const revealedBgColor = 
                    product.rarity === 'super-rare' ? 'bg-gradient-to-br from-yellow-200 via-pink-200 via-purple-200 via-blue-200 to-green-200' :
                    product.rarity === 'rare' ? 'bg-orange-100' :
                    'bg-pink-100';
                  
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className={`flex items-center gap-2 ${paddingClass} border-2 rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : isRevealed
                          ? `border-gray-200 ${revealedBgColor}`
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      } ${!isRevealed && !isSelected ? 'hover:shadow-sm' : ''}`}
                    >
                      <div className={`min-w-[1.5rem] ${layout.fontSize} ${isRevealed ? 'text-gray-900' : 'text-gray-700'}`}>
                        {displayNumber}
                      </div>
                      <div className="flex-1">
                        {isRevealed ? (
                          <span className={`${productNameSize} text-gray-900`}>{product.name || '（未設定）'}</span>
                        ) : (
                          <div className="h-4 bg-gray-800 rounded" style={{ width: '100%' }}></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-center">
              <button
                onClick={handleDecideClick}
                disabled={!selectedProductId}
                className="w-1/3 mx-auto px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-[20px]"
              >
                決定
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showConfirmModal && selectedProductId && (() => {
        const displayNumber = randomizedProducts.findIndex(p => p.id === selectedProductId) + 1;
        return (
          <ConfirmationModal
            productId={selectedProductId}
            displayNumber={displayNumber}
            onConfirm={handleConfirm}
            onCancel={() => {
              setShowConfirmModal(false);
              setSelectedProductId(null);
            }}
          />
        );
      })()}

      {showWinnerModal && winningProduct && (
        <WinnerModal product={winningProduct} onClose={handleWinnerModalClose} />
      )}
    </div>
  );
}