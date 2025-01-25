import { FormHelperText, FormControl as MuiFormControl } from "@mui/material";
import { FieldError } from "react-hook-form";
import { Visible } from "../visible/visible";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  error: FieldError | undefined;
}>;

const FormControl = ({ error, children }: Props) => {
  return (
    <MuiFormControl>
      {children}
      <Visible when={!!error?.message && error?.message.length > 0}>
        <FormHelperText error>{error?.message ?? ""}</FormHelperText>
      </Visible>
    </MuiFormControl>
  );
};

export { FormControl };
