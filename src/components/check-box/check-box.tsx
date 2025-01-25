import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl } from "../form-control/form-control";

type Props = { name: string; label: string; required?: boolean };

const Checkbox = ({ name, label, required }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={error}>
          <FormControlLabel
            label={label}
            control={<MuiCheckbox {...field} name={name} />}
          ></FormControlLabel>
        </FormControl>
      )}
    />
  );
};

export { Checkbox };
