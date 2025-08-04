import React from "react";
import {screen } from "@testing-library/react";
import LoginPage from "../Auth/LoginPage";
import SignIn from "../Auth/SignIn";
import {it,expect,describe} from "vitest";
import '@testing-library/jest-dom/vitest';
import { render } from "./test.util";

describe("LoginPage Component", () => {
    it("render LoginPage component", () => {
        render(<LoginPage />);
        const loginHeading = screen.getByText(/Please enter your login details/i);
        expect(loginHeading).toBeInTheDocument();
    });
    // it('render signin component',()=>{
    //     render(<SignIn/>);
    //     const heading = screen.getByText(/Sign In/i);
    //     expect(heading).toBeInTheDocument();
    // })
});