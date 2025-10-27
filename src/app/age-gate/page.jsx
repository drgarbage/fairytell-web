"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AgeGateContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const redirect = sp.get("redirect") || "/";

  const accept = () => {
    document.cookie = [
      `__session=age18=1`,
      "Path=/",
      "Max-Age=" + 60*60*24*365, // 1 年
      "SameSite=Lax",            // 如有跨站導回 -> 改成 "SameSite=None; Secure"
      "Secure"                   // 站點走 https 時加上
    ].join("; ");
    router.replace(redirect);
  };

  const decline = () => router.replace("/safe");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center mb-6">
          <span className="text-red-600 text-6xl font-extrabold mb-2">🔞</span>
          <h1 className="text-2xl font-bold mb-4">限制級內容提示</h1>
        </div>
        <p className="mb-2 text-lg font-medium">
          本網站部分內容屬限制級，僅供年滿 <span className="text-red-600 font-bold">18 歲</span> 之成年人瀏覽。未滿 18 歲者請勿進入。
        </p>
        <p className="text-sm text-gray-600 mb-6">
          本網站已依台灣網站內容分級規定處理。
        </p>
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={accept}
            className="rounded-lg px-6 py-2 bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
          >
            我已年滿 18 歲
          </button>
          <button
            onClick={decline}
            className="rounded-lg px-6 py-2 bg-gray-200 text-gray-800 font-semibold shadow hover:bg-gray-300 transition"
          >
            未滿 18 歲
          </button>
        </div>
        <hr className="my-4" />
        <div className="text-sm text-gray-500">
          家長指引：可參考過濾軟體與上網安全資源（iWIN）。
        </div>
      </div>
    </div>
  );
}

export default function AgeGatePage() {
  return (
    <Suspense fallback={null}>
      <AgeGateContent />
    </Suspense>
  );
}
