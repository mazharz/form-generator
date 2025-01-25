import { Button } from "@mui/material";
import "./App.css";
import { TextField } from "./components/text-field/text-field";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  a: yup.string().required("a is a required field!"),
});

function App() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const submit = methods.handleSubmit((data) => console.log(data));

  return (
    <>
      <FormProvider {...methods}>
        <TextField name="a" label="hi" required />
        <Button variant="contained" onClick={submit}>
          submit
        </Button>
      </FormProvider>
    </>
  );
}

export default App;
