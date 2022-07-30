import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ChainReactionGame from "../ChainReactionGame";
import { differenceInHours, parseISO } from "date-fns";

// let mockStorage = {};

// beforeAll(() => {
//   global.Storage.prototype.setItem = jest.fn((key, value) => {
//     mockStorage[key] = value;
//   });
//   global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key] ?? null);
// });

// beforeEach(() => {
//   mockStorage = {};
// });

// afterAll(() => {
//   global.Storage.prototype.setItem.mockReset();
//   global.Storage.prototype.getItem.mockReset();
// });

afterEach(cleanup);

describe("Chain Reaction Game Component", () => {
  // jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");
  // Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
  // jest.spyOn(Object.getPrototypeOf(window.localStorage), "getItem");
  // Object.setPrototypeOf(window.localStorage.getItem, jest.fn());
  it("Renders game", () => {
    render(<ChainReactionGame />);

    //localStorage.setItem("lastplayed", null);

    expect(screen.getByTestId("full-game-div")).toBeInTheDocument;
    //   expect(screen.getByTestId("game-status-div")).toBeInTheDocument;
    //   expect(screen.queryByText("That's it for today")).not.toBeInTheDocument;
    //   expect(global.Storage.prototype.setItem).toHaveBeenCalledOnce;
    //   expect(localStorage.getItem("lastplayed")).toEqual(null);
    // });
  });
  // it("Renders -new game in _ hours- if lastPlayed is under 24 hours ago", () => {
  //   render(<ChainReactionGame />);
  //   let date = new Date();
  //   date.setHours(date.getHours() - 12);
  //   console.log(date);
  //   localStorage.setItem("lastPlayed", date);
  //   expect(screen.queryByTestId("title-header")).not.toBeInTheDocument();
});
