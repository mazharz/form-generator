import * as yup from "yup";
import { HTML_INPUT_TYPES } from "../../constants/form";

export const schema = yup.object({
  id: yup.string().trim().required("The form ID is required"),
  name: yup.string().trim().required("The form name is required"),
  elements: yup
    .array(
      yup.object({
        id: yup.string().trim().required("The element id is required"),
        label: yup.string().trim().required("The element label is required"),
        type: yup
          .string()
          .oneOf(["text", "checkbox"])
          .required("The element type is required"),
        textType: yup
          .string()
          .test(
            "is-text-type-valid",
            "The element text type is required",
            function (value) {
              const { type } = this.parent;
              if (type === "text") {
                if (!value) {
                  return this.createError({
                    message: "The element text type is required",
                  });
                }
                if (!HTML_INPUT_TYPES.includes(value)) {
                  return this.createError({
                    message:
                      "The element text type is should be an HTML Input type attribute",
                  });
                }
              }
              return true;
            },
          ),
        isRequired: yup
          .boolean()
          .required("The element optionality is required"),
      }),
    )
    .required("There should be at least one element"),
});
