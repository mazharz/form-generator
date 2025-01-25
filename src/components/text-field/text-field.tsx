import { Controller, useFormContext } from "react-hook-form";
// eslint-disable-next-line no-restricted-imports
import { TextField as MuiTextField } from "@mui/material";
import { FormControl } from "../form-control/form-control";

type Props = {
  name: string;
  label: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
};

const TextField = ({ name, label, type = "text", required = false }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={error}>
          <MuiTextField {...field} name={name} label={label} type={type} />
        </FormControl>
      )}
    />
  );
};

export { TextField };
