import React from "react";
import {
  screen,
  render,
  fireEvent,
  findByDisplayValue,
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

test("should show my input", () => {
  const input = screen.getByPlaceholderText(/correo/i);
  expect(input).toBeInTheDocument();
});
test("should input", async () => {
  const input = screen.getByPlaceholderText(/correo/i);
  const btn = screen.getByRole("button", { name: /INICIAR SESIÓN/i });
  fireEvent.change(input, { target: { value: "email@email.com" } });

  // expect(input.value).toMatch("email@email.com");
  fireEvent.click(btn);
  // const errMsg = screen.getByText(/No puedes dejar campos vacíos/i);
  // expect(errMsg).toBeInTheDocument();
  // fireEvent.change(input, { target: { value: "test" } });
  // expect(errMsg).not.toBeInTheDocument();
});
