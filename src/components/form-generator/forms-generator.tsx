import { Form } from "../../types/form";
import { FormGenerator } from "./form-generator";

type Props = {
  forms: Form[];
};

const FormsGenerator = ({ forms }: Props) => {
  return forms.map((form) => <FormGenerator key={form.id} form={form} />);
};

export { FormsGenerator };
