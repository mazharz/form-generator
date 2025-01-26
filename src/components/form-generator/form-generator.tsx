import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TextField } from "../text-field/text-field";
import { StyledCard } from "./styles";
import { Button, FormHelperText, Typography } from "@mui/material";
import { ElementGenerator } from "./element-generator";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visible } from "../visible/visible";
import { useForms } from "../../state/forms";
import { schema } from "./schema";

let elementCounter = 0;

const FormGenerator = () => {
  const [tempElementIds, setTempElementIds] = useState<number[]>([]);
  const addForm = useForms((state) => state.addForm);
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const elementsError = methods.formState.errors.elements?.message;

  const cleanForm = () => {
    setTempElementIds([]);
    methods.reset();
  };

  const submit = methods.handleSubmit((data) => {
    cleanForm();
    addForm(data);
  });

  const addElement = (id: number) => {
    setTempElementIds((prev) => [...prev, id]);
  };

  return (
    <FormProvider {...methods}>
      <StyledCard elevation={5}>
        <Typography
          textTransform="capitalize"
          textAlign="left"
          color="textDisabled"
        >
          Create a new form
        </Typography>

        <TextField name="id" label="id" required />
        <TextField name="name" label="Name" required />

        <Typography
          textTransform="capitalize"
          textAlign="left"
          color="textDisabled"
        >
          Form Elements
        </Typography>

        {tempElementIds.map((id) => (
          <ElementGenerator id={id} key={id} />
        ))}
        <Visible when={!!elementsError}>
          <FormHelperText error>{elementsError}</FormHelperText>
        </Visible>

        <Button variant="outlined" onClick={() => addElement(elementCounter++)}>
          Add another element
        </Button>

        <div className="actions">
          <Button variant="contained" onClick={submit} fullWidth>
            Create
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={cleanForm}
            fullWidth
          >
            Clean
          </Button>
        </div>
      </StyledCard>
    </FormProvider>
  );
};

export { FormGenerator };
