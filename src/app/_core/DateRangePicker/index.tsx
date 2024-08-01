import { Dispatch, SetStateAction, useEffect } from 'react';

import dayjs from 'dayjs';

import DateInput from '@core/DateInput';
import roundHalfTime from '@utils/setRoundHalfTime';

import * as S from './styles.css';

const addMinutes = (date: Date, minutes: number): Date => {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
};

interface Props {
  minDate?: Date;
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
  lng: string;
  filterTime?: boolean;
}

export default function Index({
  minDate,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  lng,
  filterTime = false,
}: Props) {
  const today = new Date();
  const isSameDay = (date1: Date, date2: Date) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  useEffect(() => {
    if (startDate && startDate < roundHalfTime(lng)) {
      setStartDate(roundHalfTime(lng));
    }

    if (startDate! > endDate!) {
      const newDate = dayjs(startDate).add(30, 'minute').toDate();
      setEndDate(newDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    <div className={S.period}>
      <DateInput
        minDate={minDate}
        value={startDate}
        onChange={setStartDate}
        lng={lng}
        filterTimeDateValue={
          filterTime && isSameDay(startDate!, today) ? minDate! : undefined
        }
      />
      <DateInput
        minDate={startDate!}
        value={endDate}
        onChange={setEndDate}
        lng={lng}
        filterTimeDateValue={
          isSameDay(startDate!, endDate!)
            ? addMinutes(startDate!, 30)
            : undefined
        }
      />
    </div>
  );
}
