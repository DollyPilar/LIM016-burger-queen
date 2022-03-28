import React from "react";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddProducts from "./AddProducts";

beforeEach(() => {
  render(
    <BrowserRouter>
      <AddProducts />
    </BrowserRouter>
  );
});

test("should render AddProducts elements", () => {
  const inputProd = screen.getByPlaceholderText(/Imagen/i);
  const btnProd = screen.getByRole("button", { name: /subir productos/i });

  expect(inputProd).toBeInTheDocument();
  expect(btnProd).toBeInTheDocument();
});
