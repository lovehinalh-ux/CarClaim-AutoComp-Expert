
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-12 px-6 rounded-b-[3rem] shadow-xl mb-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">車禍求償一覽表工具</h1>
        <p className="text-blue-100 text-lg md:text-xl font-light">
          專業、透明、快速計算您的求償金額
        </p>
      </div>
    </header>
  );
};

export default Header;
