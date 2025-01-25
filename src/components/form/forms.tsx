import { Form as TForm } from "../../types/form";
import { Form } from "./form";

type Props<T> = {
  forms: TForm<T>[];
};

const Forms = <T,>({ forms }: Props<T>) => {
  return forms.map((form) => <Form key={form.id} form={form} />);
};

export { Forms };
