import { TextField } from "../text-field/text-field";
import { StyledChoiceWrapper } from "./styles";

type Props = {
  elementId: number;
  id: number;
};

const ChoiceGenerator = ({ elementId, id }: Props) => {
  return (
    <StyledChoiceWrapper>
      <TextField
        name={`elements.${elementId}.choices.${id}.id`}
        label="Choice ID"
        required
      />
      <TextField
        name={`elements.${elementId}.choices.${id}.name`}
        label="Choice Name"
        required
      />
    </StyledChoiceWrapper>
  );
};

export { ChoiceGenerator };
