import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "../Components/Counter";

describe("Counter Component Tests", () => {
  it("should display the correct initial count", () => {
    render(<Counter initialCount={3} />);
    const countElement = screen.getByTestId("count");
    expect(countElement).toHaveTextContent("3");
  });

  it("should increment the count by 1 when the increment button is clicked", () => {
    render(<Counter initialCount={0} />);
    const countElement = screen.getByTestId("count");
    const incrementButton = screen.getByTestId("increment");

    fireEvent.click(incrementButton);

    expect(countElement).toHaveTextContent("1");
  });

  it("should decrement the count by 1 when the decrement button is clicked", () => {
    render(<Counter initialCount={2} />);
    const countElement = screen.getByTestId("count");
    const decrementButton = screen.getByTestId("decrement");

    fireEvent.click(decrementButton);

    expect(countElement).toHaveTextContent("1");
  });

  it("should not decrement below 0", () => {
    render(<Counter initialCount={0} />);
    const countElement = screen.getByTestId("count");
    const decrementButton = screen.getByTestId("decrement");

    fireEvent.click(decrementButton);

    expect(countElement).toHaveTextContent("0");
  });

  it("should reset the count to 0 when the reset button is clicked", () => {
    render(<Counter initialCount={5} />);
    const countElement = screen.getByTestId("count");
    const resetButton = screen.getByTestId("reset");

    fireEvent.click(resetButton);

    expect(countElement).toHaveTextContent("0");
  });

  it("should display a message when count is more than 2", () => {
    render(<Counter initialCount={3} />);
    const messageElement = screen.getByText(
      "Please, it's not enough for you to take. Let others also get it."
    );
    expect(messageElement).toBeInTheDocument();
  });

  it("should display a message when count is 1", () => {
    render(<Counter initialCount={1} />);
    const messageElement = screen.getByText(
      "You don't want to order another one? :("
    );
    expect(messageElement).toBeInTheDocument();
  });

  it("should not display a message when count is 0", () => {
    render(<Counter initialCount={0} />);
    const messageElement = screen.queryByText(/Please, it's not enough/i);
    expect(messageElement).toBeNull();
  });

  it("should call the onQuantityChange callback with the new count", () => {
    const mockOnQuantityChange = jest.fn();
    render(<Counter initialCount={0} onQuantityChange={mockOnQuantityChange} />);

    const incrementButton = screen.getByTestId("increment");
    fireEvent.click(incrementButton);

    expect(mockOnQuantityChange).toHaveBeenCalledWith(1);
  });

  it("should not increment beyond the maximum quantity", () => {
    render(<Counter initialCount={5} maxQuantity={5} />);
    const countElement = screen.getByTestId("count");
    const incrementButton = screen.getByTestId("increment");

    fireEvent.click(incrementButton);

    expect(countElement).toHaveTextContent("5");
  });
});












