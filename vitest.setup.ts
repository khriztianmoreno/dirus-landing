import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Vitest does not unmount React trees between tests on its own, so without
// this every render leaks into the next test's queries.
afterEach(() => {
  cleanup();
});
