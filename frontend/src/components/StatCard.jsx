function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>

        <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center">
          {icon}
        </div>
      </div>

      <p className="text-2xl font-bold text-gray-900 mt-3">
        {value}
      </p>

      <p className="text-xs text-gray-400 mt-2">
        {subtitle}
      </p>
    </div>
  );
}

export default StatCard;