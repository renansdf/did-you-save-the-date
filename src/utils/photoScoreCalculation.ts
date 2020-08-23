import { parseISO, isSameDay, isSameMonth, isSameYear } from 'date-fns';

interface IScoreData {
  timestamp: string;
  day: number;
  month: number;
  year: number;
}

const photoScoreCalculation = ({ timestamp, day, month, year }: IScoreData): number => {
  let accumulator = 0;

  const playerDateInput = year + "-" + month + "-" + day;
  const parsedPlayerInput = parseISO(playerDateInput);
  const parsedTimestamp = parseISO(timestamp);

  const sameYear = isSameYear(parsedTimestamp, parsedPlayerInput);
  const sameMonth = isSameMonth(parsedTimestamp, parsedPlayerInput);
  const sameDay = isSameDay(parsedTimestamp, parsedPlayerInput);

  if (sameYear) {
    accumulator = accumulator + 25;
  }

  if (sameMonth) {
    accumulator = accumulator + 65;
  }

  if (sameDay) {
    accumulator = accumulator + 299;
  }

  return accumulator;
}

export default photoScoreCalculation;