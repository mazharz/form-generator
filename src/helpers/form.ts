import { Form } from "../types/form";

// helper function to make sure typescript picks up T
// automatically
export function createForm<T>(form: Form<T>): Form<T> {
  return form;
}
