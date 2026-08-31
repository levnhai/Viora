import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ForgotPasswordForm as EmailForm } from "./ForgotPasswordForm";


describe("EmailForm Component Tests", () => {
  it("renders correctly with labels and inputs", () => {
    const setEmailMock = vi.fn();
    const onSubmitMock = vi.fn((e) => e.preventDefault());

    render(
      <EmailForm
        email=""
        setEmail={setEmailMock}
        onSubmit={onSubmitMock}
        loading={false}
      />
    );

    expect(screen.getByText("Nhập email của bạn")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("ten@example.com") as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it("calls setEmail on text change", () => {
    const setEmailMock = vi.fn();
    const onSubmitMock = vi.fn((e) => e.preventDefault());

    render(
      <EmailForm
        email=""
        setEmail={setEmailMock}
        onSubmit={onSubmitMock}
        loading={false}
      />
    );

    const input = screen.getByPlaceholderText("ten@example.com");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(setEmailMock).toHaveBeenCalledWith("test@example.com");
  });

  it("triggers onSubmit callback when submitted", () => {
    const onSubmitMock = vi.fn((e) => e.preventDefault());

    render(
      <EmailForm
        email="test@example.com"
        setEmail={() => {}}
        onSubmit={onSubmitMock}
        loading={false}
      />
    );

    const submitBtn = screen.getByRole("button", { name: "Gửi mã xác nhận" });
    fireEvent.click(submitBtn);

    expect(onSubmitMock).toHaveBeenCalled();
  });
});
