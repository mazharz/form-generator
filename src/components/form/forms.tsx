import { Form as TForm } from "../../types/form";
import { Form } from "./form";

type Props = {
  forms: TForm[];
};

const Forms = ({ forms }: Props) => {
  return forms.map((form) => <Form key={form.id} form={form} />);
};

export { Forms };
