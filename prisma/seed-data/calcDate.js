const calcDate = (startDate, endDate, startTime, EndTime) => {
  const today = new Date();
  const dateStart = new Date(today);
  dateStart.setDate(today.getDate() + startDate);
  dateStart.setHours(startTime, 0, 0, 0);
  const dateEnd = new Date(today);
  dateEnd.setDate(today.getDate() + endDate);
  dateEnd.setHours(EndTime, 0, 0, 0);
  const formattedDateStart = dateStart.toISOString();
  const formattedDateEnd = dateEnd.toISOString();
  return {
    dateStart: formattedDateStart,
    dateEnd: formattedDateEnd,
  };
};

module.exports = { calcDate };
