import { AppState } from '../App';
import { Upload, PlayCircle } from 'lucide-react';

interface SettingsScreenProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToRoulette: () => void;
}

export function SettingsScreen({ appState, updateAppState, goToRoulette }: SettingsScreenProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAppState({ title: e.target.value });
  };

  const handleRouletteItemsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const items = e.target.value.split('\n');
    updateAppState({ rouletteItems: items });
  };

  const handleProductNameChange = (id: number, name: string) => {
    const updatedProducts = appState.products.map((product) =>
      product.id === id ? { ...product, name } : product
    );
    updateAppState({ products: updatedProducts });
  };

  const handleProductImageChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const updatedProducts = appState.products.map((product) =>
          product.id === id ? { ...product, image: event.target?.result as string } : product
        );
        updateAppState({ products: updatedProducts });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductRarityChange = (id: number, rarity: 'normal' | 'rare' | 'super-rare') => {
    const updatedProducts = appState.products.map((product) =>
      product.id === id ? { ...product, rarity } : product
    );
    updateAppState({ products: updatedProducts });
  };

  const addProduct = () => {
    const newId = appState.products.length + 1;
    updateAppState({
      products: [...appState.products, { id: newId, name: '', image: null, rarity: 'normal' }],
    });
  };

  const removeProduct = (id: number) => {
    if (appState.products.length > 1) {
      const updatedProducts = appState.products.filter((p) => p.id !== id);
      updateAppState({ products: updatedProducts });
    }
  };

  const handleGoToRoulette = () => {
    // 空行を削除してからルーレット画面へ遷移
    const filteredItems = appState.rouletteItems.filter((item) => item.trim() !== '');
    updateAppState({ rouletteItems: filteredItems });
    goToRoulette();
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <input
            type="text"
            value={appState.title}
            onChange={handleTitleChange}
            placeholder="タイトルを入力してください"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGoToRoulette}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlayCircle className="w-5 h-5" />
            ルーレット画面へ
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full p-6 flex gap-6">
          {/* Left Area: Roulette Items */}
          <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-gray-900 font-bold">ルーレット項目設定</h2>
            </div>
            <div className="flex-1 p-4 overflow-hidden">
              <textarea
                value={appState.rouletteItems.join('\n')}
                onChange={handleRouletteItemsChange}
                className="w-full h-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="各行に1つずつ項目を入力してください"
              />
            </div>
          </div>

          {/* Right Area: Product List */}
          <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900 font-bold text-[20px]">商品リスト</h2>
              <button
                onClick={addProduct}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                追加
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {appState.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="text-gray-700 min-w-[2rem]">
                      {product.id}
                    </div>
                    <select
                      value={product.rarity}
                      onChange={(e) => handleProductRarityChange(product.id, e.target.value as 'normal' | 'rare' | 'super-rare')}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="normal">通常</option>
                      <option value="rare">レア</option>
                      <option value="super-rare">スーパーレア</option>
                    </select>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleProductNameChange(product.id, e.target.value)}
                      placeholder="商品名"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleProductImageChange(product.id, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <Upload className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      disabled={appState.products.length === 1}
                    >
                      削除
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}