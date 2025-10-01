interface CarFilterResultsProps {
  carCount: number;
  loading?: boolean;
  selectedDateRange?: {
    startDate: string;
    endDate: string;
  };
}

export default function CarFilterResults({
  carCount,
  loading = false,
  selectedDateRange,
}: CarFilterResultsProps) {
  return (
    <div className="flex justify-between items-center mb-6 font-bold">
      <div>
        <p>{carCount} araç bulundu</p>
        {selectedDateRange?.startDate && (
          <p className="text-sm text-gray-600">
            Seçilen tarih aralığı: {selectedDateRange.startDate}
            {selectedDateRange.endDate && ` - ${selectedDateRange.endDate}`}
          </p>
        )}
      </div>
      {loading && <p>Filtreleme yapılıyor...</p>}
    </div>
  );
}
