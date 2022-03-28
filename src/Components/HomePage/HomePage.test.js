import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
// import { Try } from "./Components/Try/Try.jsx";
import { HomePage } from "./HomePage.jsx";

beforeEach(() => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
});

test("should show elements in homepage", () => {
  expect(screen.getByText(/¡BIENVENIDX A HAPPY PAWS!/i)).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /compra ahora/i })
  ).toBeInTheDocument();
});

test("click btn", () => {
  const btn = screen.getByRole("button", { name: /compra ahora/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn)
  });
