import { Button } from "@mui/material";
import "./App.css";
import { TextField } from "./components/text-field/text-field";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Checkbox } from "./components/check-box/check-box";

const schema = yup.object({
  a: yup.string().required("a is a required field!"),
  b: yup.bool().required("b is required!"),
});

function App() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const submit = methods.handleSubmit((data) => console.log(data));

  return (
    <>
      <FormProvider {...methods}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20rem",
            gap: "1rem",
          }}
        >
          <TextField name="a" label="hi" required />
          <Checkbox name="b" label="sup" required />
          <Button variant="contained" onClick={submit}>
            submit
          </Button>
        </div>
      </FormProvider>
    </>
  );
}

export default App;
