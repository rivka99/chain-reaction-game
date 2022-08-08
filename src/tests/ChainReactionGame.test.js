import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ChainReactionGame from "../ChainReactionGame";

afterEach(cleanup);

describe("Chain Reaction Game Component", () => {
  it("renders correctly", async () => {
    render(<ChainReactionGame />);
    expect(screen.getByTestId("loader-container").toBeTruthy);
    waitFor(() => expect(screen.getByTestId("full-game-div")).toBeTruthy());
  });
});
