
import React, { useRef, useState } from 'react';
import { ClaimItem, CategoryType } from '../types';
import { Printer, FileText, ArrowLeft, Download, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface Props {
  claimantName: string;
  accidentDate: string;
  items: ClaimItem[];
  totalAmount: number;
  onBack: () => void;
  onPrint: () => void;
}

const PDFPreview: React.FC<Props> = ({ claimantName, accidentDate, items, totalAmount, onBack, onPrint }) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const activeItems = items.filter(item => item.amount > 0);
  const categories = Object.values(CategoryType);

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    setIsGenerating(true);

    const element = pdfRef.current;
    const opt = {
      margin: 10,
      filename: `車禍求償清單_${claimantName || '未命名'}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, // Keep quality high
        useCORS: true,
        letterRendering: true,
        scrollY: 0,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('PDF 生成失敗，請嘗試使用瀏覽器列印功能。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-in zoom-in-95 duration-300">
      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full animate-in zoom-in-95">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">正在產製專業 PDF</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              請稍候，系統正在為您排版並優化文件畫質...<br />這可能需要幾秒鐘的時間。
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6 no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 rounded-xl font-bold transition-all shadow-sm"
        >
          <ArrowLeft size={20} /> 返回修改資料
        </button>
        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100">
          <FileText size={16} /> 您正在查看 PDF 預覽
        </div>
      </div>

      {/* Document Sheet - This is what gets captured */}
      <div
        ref={pdfRef}
        className="bg-white shadow-2xl border border-slate-200 rounded-lg p-6 md:p-10 min-h-[842px] mx-auto max-w-[595px] text-slate-800 pdf-content origin-top transform scale-95"
      >
        <div className="text-center border-b-2 border-slate-900 pb-8 mb-10">
          <h1 className="text-3xl font-black mb-2 tracking-tight">車禍事故求償一覽表</h1>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-2 text-lg mt-4 text-slate-700">
            <p><span className="font-bold">求償人：</span>{claimantName || '（未填寫）'}</p>
            <p><span className="font-bold">事故日期：</span>{accidentDate || '（未填寫）'}</p>
          </div>
          <p className="mt-4 text-slate-500 text-sm">報表產製日期：{new Date().toLocaleDateString('zh-TW')}</p>
        </div>

        <div className="space-y-10">
          {categories.map(category => {
            const categoryItems = activeItems.filter(item => item.category === category);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category} className="mb-6">
                <h2 className="text-lg font-bold mb-2 border-l-4 border-slate-800 pl-3">{category}</h2>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 px-4 py-2 text-left">請求項目</th>
                      <th className="border border-slate-300 px-4 py-2 text-right w-40">金額 (NT$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryItems.map(item => (
                      <tr key={item.id}>
                        <td className="border border-slate-300 px-4 py-2 text-slate-700">
                          <p className="font-medium">{item.name}</p>
                        </td>
                        <td className="border border-slate-300 px-4 py-2 text-right font-mono font-bold">
                          {item.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}

          <div className="border-t-4 border-slate-900 pt-6 mt-12 flex justify-between items-center">
            <span className="text-2xl font-black text-slate-800">預估總求償金額</span>
            <div className="text-right">
              <span className="text-3xl font-black text-blue-700 font-mono">
                NT$ {totalAmount.toLocaleString()}
              </span>
              <p className="text-xs text-slate-400 mt-1 italic">（此金額僅供參考，詳見下方說明）</p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3 underline">備註與聲明：</h3>
            <ul className="text-sm text-slate-600 space-y-2 list-disc ml-5 leading-relaxed">
              <li>本清單內容僅供調解或法律訴訟參考之用，非最終判決結果。</li>
              <li>所有請求項目皆應備妥相應之憑證（如醫療單據、維修發票、薪資證明等）以供查核。</li>
              <li>精神慰撫金之具體數額仍須由法官審核兩造身份資力、受害程度而定。</li>
              <li>本表係由「車禍求償小幫手」工具產製，計算結果之正確性仍需依實務判定。</li>
            </ul>
          </div>

          <div className="mt-20 flex justify-between gap-12">
            <div className="text-center border-t border-slate-400 pt-4 flex-1">
              <p className="text-sm font-bold text-slate-600">求償人（簽名/蓋章）</p>
              <div className="h-20"></div>
            </div>
            <div className="text-center border-t border-slate-400 pt-4 flex-1">
              <p className="text-sm font-bold text-slate-600">產製日期</p>
              <p className="mt-4 font-mono text-slate-500">{new Date().toLocaleDateString('zh-TW')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col md:flex-row justify-center gap-6 no-print">
        <button
          onClick={onBack}
          disabled={isGenerating}
          className="flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          <ArrowLeft size={24} /> 點擊返回修改內容
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-2xl font-black text-xl shadow-xl transform transition-all hover:scale-105 active:scale-95 shadow-blue-200 disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <Download size={24} />
          )}
          一鍵產製專業 PDF
        </button>
        <button
          onClick={onPrint}
          disabled={isGenerating}
          className="flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          <Printer size={24} /> 直接列印
        </button>
      </div>
    </div>
  );
};

export default PDFPreview;
