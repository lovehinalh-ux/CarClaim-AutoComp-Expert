
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#B8860B] to-[#8B4513] text-white py-12 px-6 rounded-b-[3rem] shadow-xl mb-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">車禍求償一覽表工具</h1>
        <p className="text-[#F5F5DC] text-lg md:text-xl font-light opacity-90">
          專業顧問級試算，為您的權益把關
        </p>
      </div>
    </header>
  );
};

export default Header;
