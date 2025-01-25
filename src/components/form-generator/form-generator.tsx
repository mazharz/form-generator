import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TextField } from "../text-field/text-field";
import { StyledCard } from "./styles";
import { Button, FormHelperText, Typography } from "@mui/material";
import { ElementGenerator } from "./element-generator";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Visible } from "../visible/visible";
import { HTML_INPUT_TYPES } from "../../constants/form";
import { useForms } from "../../state/forms";

let counter = 0;

const schema = yup.object({
  id: yup.string().trim().required("The form ID is required"),
  name: yup.string().trim().required("The form name is required"),
  elements: yup
    .array(
      yup.object({
        id: yup.string().trim().required("The element id is required"),
        label: yup.string().trim().required("The element label is required"),
        type: yup
          .string()
          .oneOf(["text", "checkbox"])
          .required("The element type is required"),
        textType: yup
          .string()
          .test(
            "is-text-type-valid",
            "The element text type is required",
            function (value) {
              const { type } = this.parent;
              if (type === "text") {
                if (!value) {
                  return this.createError({
                    message: "The element text type is required",
                  });
                }
                if (!HTML_INPUT_TYPES.includes(value)) {
                  return this.createError({
                    message:
                      "The element text type is should be an HTML Input type attribute",
                  });
                }
              }
              return true;
            },
          ),
        isRequired: yup
          .boolean()
          .required("The element optionality is required"),
      }),
    )
    .required("There should be at least one element"),
});

const FormGenerator = () => {
  const [elementIds, setElementIds] = useState<number[]>([]);
  const addForm = useForms((state) => state.addForm);
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const submit = methods.handleSubmit((data) => {
    setElementIds([]);
    methods.reset();
    addForm(data);
  });

  const elementsError = methods.formState.errors.elements?.message;

  const addElement = (id: number) => {
    setElementIds((prev) => [...prev, id]);
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

        {elementIds.map((id) => (
          <ElementGenerator id={id} key={id} />
        ))}
        <Visible when={!!elementsError}>
          <FormHelperText error>{elementsError}</FormHelperText>
        </Visible>

        <Button variant="outlined" onClick={() => addElement(counter++)}>
          Add another element
        </Button>

        <Button variant="contained" onClick={submit}>
          Create
        </Button>
      </StyledCard>
    </FormProvider>
  );
};

export { FormGenerator };
