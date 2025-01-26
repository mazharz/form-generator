import { TextField } from "../text-field/text-field";
import { StyledChoiceWrapper } from "./styles";

type Props = {
  elementId: number;
  id: number;
};

const ConditionGenerator = ({ elementId, id }: Props) => {
  return (
    <StyledChoiceWrapper>
      <TextField
        name={`elements.${elementId}.conditions.${id}.targetElementId`}
        label="Target element ID"
        required
      />
      <TextField
        name={`elements.${elementId}.conditions.${id}.valueToMatch`}
        label="Value to match"
        required
      />
    </StyledChoiceWrapper>
  );
};

export { ConditionGenerator };
