import * as S from './styles.css';

interface Props {
  label: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  errorMsg?: string;
  placeholder?: string;
  maxLength?: number;
}

export default function Index({
  label,
  value,
  onChange,
  required = false,
  errorMsg,
  placeholder,
  maxLength,
}: Props) {
  const onClear = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={S.layout}>
      <label htmlFor="text">
        {label}
        {required && '*'}
      </label>
      <div className={S.container({ status: errorMsg ? 'error' : 'normal' })}>
        <input
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          placeholder={placeholder}
        />
        <button type="button" onClick={onClear}>
          x
        </button>
      </div>
      {maxLength && (
        <p className={S.maxLength}>
          {value.length}/{maxLength}
        </p>
      )}
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
}
