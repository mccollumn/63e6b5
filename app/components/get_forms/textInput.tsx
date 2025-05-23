import TextField from "@mui/material/TextField";
import { BaseTextFieldProps } from "@mui/material";

interface TextInputProps extends BaseTextFieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  label,
  value,
  placeholder,
  onChange,
  ...props
}: TextInputProps) => {
  return (
    <TextField
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      fullWidth
      size="small"
      {...props}
    />
  );
};

export default TextInput;
