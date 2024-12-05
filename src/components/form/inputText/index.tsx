import { Input } from "antd";

export default function InputText({
  value,
  error,
  onChange,
  onBlur,
  errorText,
  name,
  placeholder,
}: {
  value: string;
  error: boolean;
  errorText?: string;
  placeholder?: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="grid grid-cols-1 ">
      <Input
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        status={error ? "error" : undefined}
      />

      {errorText && <p className="text-red-600 text-sm">{errorText}</p>}
    </div>
  );
}
