function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤️"],
    [[2], "⛅"],
    [[3], "☁️"],
    [[45, 48], "🌫️"],
    [[51, 56, 61, 66, 80], "🌦️"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧️"],
    [[71, 73, 75, 77, 85, 86], "🌨️"],
    [[95], "🌩️"],
    [[96, 99], "⛈️"],
  ]);

  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

function Day({ min, max, date, codes, isToday }) {
  return (
    <div className="day-card">
      <span className="weather-icon">{getWeatherIcon(codes)}</span>
      <p className="date">{date}</p>
      <p className="day-label">{isToday ? "Today" : formatDay(date)}</p>
      <p className="temperature">
        {Math.floor(min)}&deg; &mdash; <strong> {Math.ceil(max)}&deg;</strong>
      </p>
    </div>
  );
}

export default Day;
