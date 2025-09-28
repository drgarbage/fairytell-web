export default function SafePage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center mb-6">
          <span className="text-blue-600 text-6xl font-extrabold mb-2">🛡️</span>
          <h1 className="text-2xl font-bold mb-4">已離開限制級內容</h1>
        </div>
        <p className="mb-2 text-lg font-medium text-gray-800">
          本網站僅供18歲以上用戶使用。
        </p>
        <p className="text-sm text-gray-600 mb-6">
          請確認年齡符合相關規定，未滿18歲請勿瀏覽本網站內容。
        </p>
      </div>
    </div>
  );
}
