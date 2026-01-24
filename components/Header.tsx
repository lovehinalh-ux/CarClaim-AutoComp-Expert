const Header: React.FC = () => {
  return (
    <header className="bg-stone-900 text-white py-8 px-6 md:px-8 border-b-4 border-red-600 shadow-xl mb-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2 uppercase">
            Car Compensation<br />
            <span className="text-red-500">Calculator</span>
          </h1>
          <div className="h-1 w-20 bg-white mb-3 mx-auto md:mx-0"></div>
          <p className="text-stone-400 text-lg font-bold tracking-wide">
            2026 車禍求償一覽表工具
          </p>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-xs font-mono text-stone-500 mb-1">SYSTEM STATUS</div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold bg-stone-800 px-3 py-1 rounded-full text-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            ONLINE
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
