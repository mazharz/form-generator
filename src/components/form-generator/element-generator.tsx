import { useFormContext } from "react-hook-form";
import { Checkbox } from "../check-box/check-box";
import { TextField } from "../text-field/text-field";
import { Visible } from "../visible/visible";
import { StyledElementWrapper } from "./styles";
import { useState } from "react";
import { ChoiceGenerator } from "./choice-generator";
import { Button } from "@mui/material";
import { ConditionGenerator } from "./condition-generator";

type Props = {
  id: number;
};

let choiceCounter = 0;
let conditionCounter = 0;

const ElementGenerator = ({ id }: Props) => {
  const [tempChoiceIds, setTempChoiceIds] = useState<number[]>([]);
  const [tempConditionIds, setTempConditionIds] = useState<number[]>([]);
  const methods = useFormContext();
  const type = methods.watch(`elements.${id}.type`);

  const addChoice = (id: number) => {
    setTempChoiceIds((prev) => [...prev, id]);
  };

  const addCondition = (id: number) => {
    setTempConditionIds((prev) => [...prev, id]);
  };

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

      {tempChoiceIds.map((cid) => (
        <ChoiceGenerator elementId={id} id={cid} key={id} />
      ))}
      <Button variant="outlined" onClick={() => addChoice(choiceCounter++)}>
        Add choice
      </Button>

      {tempConditionIds.map((cid) => (
        <ConditionGenerator elementId={id} id={cid} key={id} />
      ))}
      <Button
        variant="outlined"
        onClick={() => addCondition(conditionCounter++)}
      >
        Add condition
      </Button>
    </StyledElementWrapper>
  );
};

export { ElementGenerator };
