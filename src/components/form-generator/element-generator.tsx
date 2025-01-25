import { useFormContext } from "react-hook-form";
import { Element } from "../../types/form";
import { Checkbox } from "../check-box/check-box";
import { TextField } from "../text-field/text-field";

type Props<T> = {
  element: Element<T>;
};

const ElementGenerator = <T,>({ element }: Props<T>) => {
  const { watch } = useFormContext();
  const fields = watch();

  if (element.conditions && element.conditions.length > 0) {
    const allConditionsPass = element.conditions.every((condition) => {
      const target = condition.targetElementId;
      const value = fields[target];
      return value === condition.valueToMatch;
    });

    if (!allConditionsPass) return <></>;
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

export { ElementGenerator };
