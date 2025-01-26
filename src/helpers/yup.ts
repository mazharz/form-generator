import * as yup from "yup";
import {
  CheckboxElement,
  Element,
  Form,
  GenericElement,
  TextElement,
} from "../types/form";

type Shape = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const generateYupSchema = (form: Form) => {
  const shape: Shape = {};

  form.elements.forEach((element) => {
    if (element.type === "text") {
      shape[element.id] = generateTextValidation(element, form.elements);
    }

    if (element.type === "checkbox") {
      shape[element.id] = generateCheckboxValidation(element, form.elements);
    }
  });

  return yup.object(shape);
};

const generateTextValidation = (
  element: GenericElement & TextElement,
  allElements: Element[],
) => {
  let textValidation = yup.string().trim();

  if (element.isRequired) {
    textValidation = textValidation.when(
      getConditionPaths(element, allElements),
      {
        is: (...args: unknown[]) => allConditionsPass(element, args),
        then: (schema) => schema.required(`This field is required`),
        otherwise: (schema) => schema.notRequired(),
      },
    );
  }

  if (element.choices && element.choices.length > 0) {
    const validChoices = element.choices.map((choice) => choice.name);
    textValidation = textValidation.oneOf(
      validChoices,
      `Must be one of: ${validChoices.join(", ")}`,
    );
  }

  return textValidation;
};

const generateCheckboxValidation = (
  element: GenericElement & CheckboxElement,
  allElements: Element[],
) => {
  let checkboxValidation = yup.boolean();

  if (element.isRequired) {
    checkboxValidation = checkboxValidation.when(
      getConditionPaths(element, allElements),
      {
        is: (...args: unknown[]) => allConditionsPass(element, args),
        then: (schema) => schema.required(`This field is required`),
        otherwise: (schema) => schema.notRequired(),
      },
    );
  }

  return checkboxValidation;
};

const getConditionPaths = (element: GenericElement, allElements: Element[]) => {
  return (
    element.conditions?.map(
      (condition) =>
        allElements.find((el) => el?.id === condition.targetElementId)?.id ??
        "",
    ) ?? []
  );
};

export const allConditionsPass = (element: GenericElement, args: unknown[]) => {
  if (!element.conditions || element.conditions.length === 0) return true;

  return element.conditions.every((condition, index) => {
    const value = args[index];
    return String(value) === condition.valueToMatch;
  });
};
