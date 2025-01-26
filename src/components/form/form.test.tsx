import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Form } from "./form";
import { Form as TForm } from "../../types/form";
import { ToastContainer } from "react-toastify";

const simpleForm: TForm = {
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
};

const complexForm: TForm = {
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
};

describe("Form", () => {
  describe("Simple form", () => {
    it("should be rendered", async () => {
      render(<Form form={simpleForm} />);
      expect(screen.getByText("personal info")).toBeInTheDocument();
    });

    it("should show error if submitting without required field", async () => {
      render(<Form form={simpleForm} />);
      fireEvent.click(screen.getByRole("button"));
      await screen.findByText("This field is required");
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("should submit form if all is well", async () => {
      render(
        <>
          <Form form={simpleForm} />
          <ToastContainer />
        </>,
      );
      const input = screen.getByLabelText("Name");
      fireEvent.change(input, { target: { value: "some" } });
      fireEvent.click(screen.getByRole("button"));
      await screen.findByRole("alert");
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  describe("Complex Form", async () => {
    it("should be rendered", async () => {
      render(<Form form={complexForm} />);
      expect(screen.getByText("interests")).toBeInTheDocument();
    });

    it("should submit form if nothing is changed", async () => {
      render(
        <>
          <Form form={complexForm} />
          <ToastContainer />
        </>,
      );
      fireEvent.click(screen.getByRole("button"));
      await screen.findByRole("alert");
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("should show error if visible fields are required", async () => {
      render(
        <>
          <Form form={complexForm} />
          <ToastContainer />
        </>,
      );
      const checkbox = screen.getByLabelText("Do you have a favorite tv show?");
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      fireEvent.click(screen.getByRole("button"));

      await screen.findByText("This field is required");
      await screen.findByText("Can you tell us what show?");
      expect(
        screen.getByText("Can you tell us what show?"),
      ).toBeInTheDocument();
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });
  });
});
