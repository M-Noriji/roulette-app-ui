interface ConfirmationModalProps {
  productId: number;
  displayNumber: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({ productId, displayNumber, onConfirm, onCancel }: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-gray-900 mb-4 text-[20px] font-bold">確認</h2>
        <p className="text-gray-700 mb-6 text-[20px] font-bold">
          本当に番号 <span className="text-blue-600">{displayNumber}</span> でよろしいですか？
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}