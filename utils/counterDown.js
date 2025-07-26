export function calcTimeLeft(targetDate) {
  if (!targetDate) targetDate = new Date().setHours(23, 59, 59, 999);
  const One_hour_ms = 60 * 60 * 1000;
  const one_minute_ms = 60 * 1000;
  const One_second_ms = 1000;
  const timeLeft = targetDate - new Date().getTime();

  if (timeLeft > 0) {
    const hours = Math.floor(timeLeft / One_hour_ms);
    const minutes = Math.floor((timeLeft % One_hour_ms) / one_minute_ms);
    const seconds = Math.floor((timeLeft % one_minute_ms) / One_second_ms);
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  } else return { hours: 0, minutes: 0, seconds: 0 };
}
