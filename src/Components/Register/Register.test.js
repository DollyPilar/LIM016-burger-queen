import React from "react";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register.jsx";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
});

test("should render the form elements", () => {
  const inputEl = screen.getByPlaceholderText(/nombre completo/i);
  const btnEl = screen.getByRole("button", { name: /registrar/i });
  const imgEl = screen.getByAltText("logo");

  expect(inputEl).toBeInTheDocument();
  expect(btnEl).toBeInTheDocument();
  expect(imgEl).toBeInTheDocument();
});

// sí sirve
// describe("Register", () => {
//     it("must display elements", () => {
//       render(
//         <BrowserRouter>
//           <Register />
//         </BrowserRouter>
//       );
//       expect(screen.queryByRole("button", { name: /registrar/i})).toBeInTheDocument();
//     });
//   });

//sirve2
// describe("Register", () => {
//     it("must display an input", () => {
//       render(
//         <BrowserRouter>
//           <Register />
//         </BrowserRouter>
//       );
//       expect(screen.getByPlaceholderText(/nombre completo/i)).toBeInTheDocument();
//     });
//   });

// import React from "react";
// import { screen, render } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import { Register } from "./Register.jsx";

// describe("Register", () => {
//     it("must show a button", () => {
//       render(
//           <Register />
//       );
//       expect(screen.queryByRole(/registrar/i)).toBeInTheDocument();
//     });
//   });
