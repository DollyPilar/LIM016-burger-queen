import React from "react";
import {
  screen,
  render,
  fireEvent,
  // findByDisplayValue,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LogIn from "./Login.jsx";

beforeEach(() => {
  render(
    <BrowserRouter>
      <LogIn />
    </BrowserRouter>
  );
});

test("should show my inputs", () => {
  const inputEmail = screen.getByPlaceholderText(/correo/i);
  const inputPassword = screen.getByPlaceholderText(/contraseña/i);
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
});
test("should accept a value in input email", async () => {
  const input = screen.getByPlaceholderText(/correo/i);
  const btn = screen.getByRole("button", { name: /INICIAR SESIÓN/i });
  fireEvent.change(input, { target: { value: "email@email.com" } });
  fireEvent.click(btn);
});
test("should accept a value in input password", async () => {
  const input = screen.getByPlaceholderText(/contraseña/i);
  const btn = screen.getByRole("button", { name: /INICIAR SESIÓN/i });
  fireEvent.change(input, { target: { value: "789456123" } });
  fireEvent.click(btn);
});
