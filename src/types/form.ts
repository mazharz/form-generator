import { HTMLInputTypeAttribute } from "react";

export type Form<T> = {
  id: string;
  name: string;
  elements: Element<T>[];
};

export type Element<T> = GenericElement<T> & (TextElement | CheckboxElement);

export type GenericElement<T> = {
  id: string;
  label: string;
  isRequired: boolean;
  conditions?: Condition<T>[];
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

export type Condition<T> = {
  targetElementId: string;
  valueToMatch: T;
};
