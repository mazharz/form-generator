import { create } from "zustand";
import { Form } from "../types/form";

type GlobalForms = {
  forms: Form[];
  removeForm: (id: string) => void;
  addForm: (form: Form) => void;
};

const initForms: Form[] = [
  {
    id: "personal-info",
    name: "personal info",
    elements: [
      {
        id: "name",
        type: "text",
        label: "Name",
        isRequired: true,
      },
      {
        id: "age",
        type: "text",
        label: "Age",
        isRequired: false,
        textType: "number",
      },
    ],
  },
  {
    id: "interests",
    name: "interests",
    elements: [
      {
        id: "has-fav-tv-show",
        type: "checkbox",
        label: "Do you have a favorite tv show?",
        isRequired: false,
      },
      {
        id: "can-you-tell-us-what-show",
        type: "checkbox",
        label: "Can you tell us what show?",
        isRequired: true,
        conditions: [
          {
            targetElementId: "has-fav-tv-show",
            valueToMatch: "true",
          },
        ],
      },
      {
        id: "fav-tv-show",
        type: "text",
        label: "What is your favorite tv show?",
        isRequired: true,
        conditions: [
          {
            targetElementId: "has-fav-tv-show",
            valueToMatch: "true",
          },
          {
            targetElementId: "can-you-tell-us-what-show",
            valueToMatch: "true",
          },
        ],
      },
    ],
  },
  {
    id: "misc",
    name: "misc",
    elements: [
      {
        id: "type-of-os",
        label: "What is your OS?",
        isRequired: true,
        type: "text",
        choices: [
          {
            id: "windows",
            name: "Windows",
          },
          {
            id: "mac",
            name: "Mac",
          },
          {
            id: "linux",
            name: "Linux",
          },
        ],
      },
    ],
  },
];

export const useForms = create<GlobalForms>()((set) => ({
  forms: initForms,
  removeForm: (id: string) =>
    set((state) => ({ forms: state.forms.filter((f) => f.id !== id) })),
  addForm: (form: Form) => set((state) => ({ forms: [...state.forms, form] })),
}));
