import { Box, Button, Typography } from "@mui/material";
import { Form as TForm } from "../../types/form";
import { Element } from "./element";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateYupSchema } from "../../helpers/yup";
import { StyledCard } from "./styles";
import { useForms } from "../../state/forms";
import { toast } from "react-toastify";

type Props = {
  form: TForm;
};

const Form = ({ form }: Props) => {
  const removeForm = useForms((state) => state.removeForm);
  const methods = useForm({
    resolver: yupResolver(generateYupSchema(form)),
  });

  const submit = methods.handleSubmit((data) =>
    toast(
      "Form was submitted with value: " + JSON.stringify(data, undefined, 2),
    ),
  );

  const deleteForm = () => removeForm(form.id);

  return (
    <FormProvider {...methods}>
      <StyledCard elevation={5}>
        <div className="header">
          <Typography
            textTransform="capitalize"
            textAlign="left"
            color="textDisabled"
          >
            {form.name}
          </Typography>
          <Box color="orange" sx={{ cursor: "pointer" }} onClick={deleteForm}>
            X
          </Box>
        </div>
        {form.elements.map((element) => (
          <Element key={element.id} element={element} />
        ))}
        <Button variant="outlined" onClick={submit}>
          Submit
        </Button>
      </StyledCard>
    </FormProvider>
  );
};

export { Form };
