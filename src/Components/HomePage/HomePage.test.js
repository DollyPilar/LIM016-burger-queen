import React from "react";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
// import { Try } from "./Components/Try/Try.jsx";
import { HomePage } from "./HomePage.jsx";

describe("HomePage", () => {
  it("must display a title", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.queryByText(/pilar/i)).toBeInTheDocument();
  });
});
