import { HTMLInputTypeAttribute } from "react";

export type Form = {
  id: string;
  name: string;
  elements: Element[];
};

export type Element = GenericElement & (TextElement | CheckboxElement);

export type GenericElement = {
  id: string;
  label: string;
  isRequired: boolean;
  conditions?: Condition[];
};

export type TextElement = {
  type: "text";
  textType?: HTMLInputTypeAttribute;
  choices?: Choice[];
};

export type CheckboxElement = {
  type: "checkbox";
};

export type Choice = {
  id: string;
  name: string;
};

export type Condition = {
  targetElementId: string;
  valueToMatch: string;
};
