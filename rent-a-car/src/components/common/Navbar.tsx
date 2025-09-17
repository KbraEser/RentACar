import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Rent A Car</h1>
        <div className="space-x-4">
          <a href="/" className="hover:text-blue-200">
            Ana Sayfa
          </a>
          <a href="/cars" className="hover:text-blue-200">
            Araçlar
          </a>
          <a href="/about" className="hover:text-blue-200">
            Hakkımızda
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
