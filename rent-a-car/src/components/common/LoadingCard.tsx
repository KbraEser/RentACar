interface LoadingCardProps {
  title?: string;
  className?: string;
}

const LoadingCard = ({
  title = "Yükleniyor...",
  className = "",
}: LoadingCardProps) => {
  return (
    <div className={`rounded-lg shadow-lg p-6 bg-white ${className}`}>
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-600 rounded-full animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
          <p className="text-sm text-gray-600">Lütfen bekleyin...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
