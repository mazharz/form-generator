import { Button, Typography } from "@mui/material";
import { Form } from "../../types/form";
import { ElementGenerator } from "./element-generator";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateYupSchema } from "../../helpers/yup";
import { StyledCard } from "./styles";

type Props<T> = {
  form: Form<T>;
};

const FormGenerator = <T,>({ form }: Props<T>) => {
  const methods = useForm({
    resolver: yupResolver(generateYupSchema(form)),
  });

  const submit = methods.handleSubmit((data) => console.log(data));

  return (
    <FormProvider {...methods}>
      <StyledCard elevation={5}>
        <Typography
          textTransform="capitalize"
          textAlign="left"
          color="textDisabled"
        >
          {form.name}
        </Typography>
        {form.elements.map((element) => (
          <ElementGenerator key={element.id} element={element} />
        ))}
        <Button variant="contained" onClick={submit}>
          Submit
        </Button>
      </StyledCard>
    </FormProvider>
  );
};

export { FormGenerator };
