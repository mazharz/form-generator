import { useFormContext } from "react-hook-form";
import { Checkbox } from "../check-box/check-box";
import { TextField } from "../text-field/text-field";
import { Visible } from "../visible/visible";
import { StyledElementWrapper } from "./styles";

type Props = {
  id: number;
};

const ElementGenerator = ({ id }: Props) => {
  const methods = useFormContext();
  const type = methods.watch(`elements.${id}.type`);

  return (
    <StyledElementWrapper>
      <TextField name={`elements.${id}.id`} label="Element ID" required />
      <TextField name={`elements.${id}.label`} label="Element Label" required />
      <TextField
        name={`elements.${id}.type`}
        label="Type of element"
        required
      />
      <Visible when={type === "text"}>
        <TextField name={`elements.${id}.textType`} label="Text Type" />
      </Visible>
      <Checkbox name={`elements.${id}.isRequired`} label="Required" required />
    </StyledElementWrapper>
  );
};

// TODO
// conditions?: Condition<T>[];
// choices?: Choice[];
export { ElementGenerator };
