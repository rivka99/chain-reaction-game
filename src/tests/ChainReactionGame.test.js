import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ChainReactionGame from "../ChainReactionGame";
import { differenceInHours, parseISO } from "date-fns";

afterEach(cleanup);
describe("Chain Reaction Game Component", () => {
  it("Renders game part of the component when lastPlayed is null", () => {
    render(<ChainReactionGame />);
    localStorage.setItem("lastPlayed", null);
    expect(screen.getByTestId("title-header")).toBeInTheDocument();
    expect(screen.getByTestId("game-status-div")).toBeInTheDocument();
    expect(screen.queryByText("That's it for today")).not.toBeInTheDocument();
    // fireEvent.click(getByLabelText(/off/i));

    // expect(queryByLabelText(/on/i)).toBeTruthy();
  });
  // it("Renders -new game in _ hours- if lastPlayed is under 24 hours ago", () => {
  //   render(<ChainReactionGame />);
  //   let date = new Date();
  //   date.setHours(date.getHours() - 12);
  //   console.log(date);
  //   localStorage.setItem("lastPlayed", date);
  //   expect(screen.queryByTestId("title-header")).not.toBeInTheDocument();
  // });
});
