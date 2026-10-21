import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { TargetAudienceSection } from "./TargetAudienceSection";

describe("TargetAudienceSection", () => {
  it("renders target audience content and checklist", () => {
    const dictionary = getDictionary("es");
    render(<TargetAudienceSection dictionary={dictionary} />);

    expect(
      screen.getByText(dictionary.home.targetAudience.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.targetAudience.checklistTitle),
    ).toBeInTheDocument();
  });
});
