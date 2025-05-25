import TextField from "@mui/material/TextField";
import { BaseTextFieldProps } from "@mui/material";

/**
 * Props for the TextInput component.
 *
 * @extends BaseTextFieldProps
 *
 * @property {string} label - The label to display for the input field.
 * @property {string} [value] - The current value of the input field.
 * @property {string} [placeholder] - Placeholder text to display when the input is empty.
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - Callback fired when the input value changes.
 */
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
