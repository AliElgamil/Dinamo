import { Input } from "antd";

export default function Textarea({
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
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="grid grid-cols-1 ">
      <Input.TextArea
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        status={error ? "error" : undefined}
        autoSize={{
          minRows: 4,
        }}
      />

      {errorText && error && (
        <p className="text-red-600 text-sm">{errorText}</p>
      )}
    </div>
  );
}
