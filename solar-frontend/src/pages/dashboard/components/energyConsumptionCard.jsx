const EnergyConsumptionCard = ({ date, consumption }) => {
  return (
    <div className="
      w-full min-h-[64px] rounded-lg bg-gray-50 px-3 py-2 flex flex-col items-center
      justify-center transition hover:bg-blue-50 active:bg-blue-100 sm:min-h-[72px]
    ">
      <span className="text-xs sm:text-sm font-semibold text-gray-500">
        {date}
      </span>

      <span className="text-sm sm:text-base font-bold text-gray-800">
        {consumption} kW
      </span>
    </div>
  );
};

export default EnergyConsumptionCard;
