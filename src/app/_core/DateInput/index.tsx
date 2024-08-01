import DatePicker from 'react-datepicker';

import * as S from './styles.css';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  value: Date | null;
  lng: string;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  filterTimeDateValue?: Date;
}

export default function Index({
  value,
  lng,
  onChange,
  minDate,
  maxDate,
  filterTimeDateValue, // filterTimeDateValue 오후 2시 30분일 경우, 오후 2시 30분 이하로 선택 불가
}: Props) {
  return (
    <div className={S.layout}>
      <DatePicker
        dateFormat="yyyy/MM/dd hh:mm aa"
        placeholderText="yyyy/MM/dd hh:mm aa"
        showTimeSelect
        selected={value}
        onChange={(date) => onChange(date)}
        minDate={minDate}
        maxDate={maxDate}
        filterTime={
          filterTimeDateValue
            ? (time) => {
                const selectedDate = new Date(time);
                const minDateTime = filterTimeDateValue!;
                return (
                  selectedDate.getHours() > minDateTime.getHours() ||
                  (selectedDate.getHours() === minDateTime.getHours() &&
                    selectedDate.getMinutes() >= minDateTime.getMinutes())
                );
              }
            : undefined
        }
      />
      {lng === 'kr' ? '(KST)' : '(UTC)'}
    </div>
  );
}
