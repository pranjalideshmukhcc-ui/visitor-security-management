function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h2 className="font-semibold text-gray-900">
          Visitor & Security Management
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">
          A
        </div>
      </div>
    </header>
  );
}

export default Navbar;