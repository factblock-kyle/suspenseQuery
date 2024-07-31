import dayjs from 'dayjs';

const roundHalfTime = (lng: string, addMinute?: number) => {
  let date = dayjs().add(lng === 'kr' ? 0 : -9, 'hours');
  const minute = date.minute() + (addMinute ?? 0);

  date = date.second(0).millisecond(0);

  if (minute > 0 && minute <= 30) {
    date = date.minute(30);
    return date.toDate();
  }
  if (minute > 60) {
    date = date.minute(30).add(1, 'hour');
    return date.toDate();
  }
  date = date.minute(0).add(1, 'hour');
  return date.toDate();
};

export default roundHalfTime;
