import "./App.css";
import { Grid2 as Grid } from "@mui/material";
import { Forms } from "./components/form/forms";
import { useForms } from "./state/forms";
import { FormGenerator } from "./components/form-generator/form-generator";

function App() {
  const forms = useForms((state) => state.forms);

  return (
    <>
      <Grid container spacing={4}>
        <Grid size={4}>
          <FormGenerator />
        </Grid>
        <Grid size={8}>
          <Forms forms={forms} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
