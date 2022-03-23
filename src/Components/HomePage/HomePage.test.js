import React from "react";
import { screen, render } from "@testing-library/react";
// import { Try } from "./Components/Try/Try.jsx";
import { HomePage } from "./HomePage.jsx";

describe("HomePage", () => {
  it("must display a title", () => {
    render(<HomePage />);
    expect(screen.queryByText(/pilar/i)).toBeInTheDocument();
  });
});
