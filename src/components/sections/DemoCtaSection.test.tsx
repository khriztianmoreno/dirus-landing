import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { DemoCtaSection } from "./DemoCtaSection";

describe("DemoCtaSection", () => {
  it("renders lead demo form and handles submission state", () => {
    const dictionary = getDictionary("es");
    render(<DemoCtaSection dictionary={dictionary} />);

    const nameInput = screen.getByLabelText(
      dictionary.home.demoCta.form.nameLabel,
    );
    const phoneInput = screen.getByLabelText(
      dictionary.home.demoCta.form.phoneLabel,
    );
    const emailInput = screen.getByLabelText(
      dictionary.home.demoCta.form.emailLabel,
    );

    fireEvent.change(nameInput, { target: { value: "Carlos Mendoza" } });
    fireEvent.change(phoneInput, { target: { value: "+573000000000" } });
    fireEvent.change(emailInput, { target: { value: "carlos@test.com" } });

    const submitButton = screen.getByRole("button", {
      name: dictionary.home.demoCta.form.submitButton,
    });
    fireEvent.click(submitButton);

    expect(
      screen.getByText(dictionary.home.demoCta.form.alertSuccess),
    ).toBeInTheDocument();
  });
});
