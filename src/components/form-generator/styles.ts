import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 2rem;

  .actions {
    display: flex;
    gap: 1rem;
  }
`;

export const StyledElementWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledChoiceWrapper = styled("div")`
  display: flex;
  gap: 1rem;
`;
