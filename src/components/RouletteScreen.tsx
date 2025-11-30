import { useState } from 'react';
import { Settings, RotateCw, List } from 'lucide-react';
import { AppState } from '../App';
import { RouletteWheel } from './RouletteWheel';

interface RouletteScreenProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  goToSettings: () => void;
  goToProductList: () => void;
}

export function RouletteScreen({ appState, updateAppState, goToSettings, goToProductList }: RouletteScreenProps) {
  const [spinning, setSpinning] = useState(false);
  const [winningNumber, setWinningNumber] = useState<string | null>(null);

  const handleSpinComplete = (result: string) => {
    setSpinning(false);
    setWinningNumber(result);
    updateAppState({
      history: [...appState.history, result],
    });
  };

  const handleSpin = () => {
    if (!spinning && appState.rouletteItems.length > appState.selectedItems.length) {
      // Add previous winning number to selectedItems before starting new spin
      if (winningNumber) {
        updateAppState({
          selectedItems: [...appState.selectedItems, winningNumber],
        });
      }
      setSpinning(true);
      setWinningNumber(null);
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
              onClick={goToProductList}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <List className="w-5 h-5" />
              商品リスト
            </button>
            <button
              onClick={goToSettings}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="設定に戻る"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full p-6 flex gap-6 items-start">
          {/* Roulette */}
          <div className="flex-[3] bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center h-[740px]">
            <div className="mb-4 w-full px-6 py-[6px] bg-yellow-100 border-2 border-yellow-400 rounded-[10px] text-center" style={{ visibility: winningNumber ? 'visible' : 'hidden' }}>
              <span className="text-[rgb(1,1,1)] font-bold text-[24px]\ text-[20px]">当選番号：{winningNumber || ''}</span>
            </div>
            <RouletteWheel
              items={appState.rouletteItems}
              selectedItems={appState.selectedItems}
              spinning={spinning}
              onSpinComplete={handleSpinComplete}
              onSpin={handleSpin}
            />
            <button
              onClick={handleSpin}
              disabled={spinning || appState.rouletteItems.length === appState.selectedItems.length}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-[16px]"
            >
              {spinning ? '回転中...' : 'ルーレットを回す'}
            </button>
          </div>

          {/* History */}
          <div className="flex-[2] bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col h-[740px]">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-700 font-bold text-[20px]">出目履歴</div>
              <button
                onClick={() => {
                  updateAppState({
                    selectedItems: [],
                    history: [],
                  });
                  setWinningNumber(null);
                }}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="リセット"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-row flex-wrap gap-2">
                {appState.history.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-[20px]">
                    <span className="text-gray-900">{item}</span>
                    {index < appState.history.length - 1 && (
                      <span className="text-gray-400">→</span>
                    )}
                  </div>
                ))}
                {appState.history.length === 0 && (
                  <span className="text-gray-400 text-sm">まだ履歴がありません</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}