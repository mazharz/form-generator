import { useFormContext } from "react-hook-form";
import { Element as TElement } from "../../types/form";
import { Checkbox } from "../check-box/check-box";
import { TextField } from "../text-field/text-field";
import { allConditionsPass } from "../../helpers/yup";

type Props<T> = {
  element: TElement<T>;
};

const Element = <T,>({ element }: Props<T>) => {
  const { watch } = useFormContext();
  const fields = watch();

  if (!allConditionsPass(element, Object.values(fields))) {
    return <></>;
  }

  if (element.type === "text") {
    return (
      <TextField
        name={element.id}
        label={element.label}
        type={element.textType}
        required={element.isRequired}
      />
    );
  }
  if (element.type === "checkbox") {
    return (
      <Checkbox
        name={element.id}
        label={element.label}
        required={element.isRequired}
      />
    );
  }

  console.error("An unknown form element was generated:", element);
  return <></>;
};

export { Element };
