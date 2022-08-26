import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { differenceInHours, parseISO } from "date-fns";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import ChainReactionGame from "../ChainReactionGame";

afterEach(cleanup);

configure({ adapter: new Adapter() });

describe("Chain Reaction Game Component once data is loaded", () => {
  it("renders correctly", async () => {
    render(<ChainReactionGame />);
    expect(screen.getByTestId("loader-container").toBeTruthy);
  });
  it("issue:renders the game only if date is more than 24 hours since lastplayed ls value", async () => {
    let currentDay = new Date("2022-06-08T23:38:56.409Z").toISOString();
    let prevPlay = new Date("2022-06-08T22:38:56.409Z").toISOString();
    let diff = differenceInHours(parseISO(currentDay), parseISO(prevPlay));

    localStorage.setItem(
      "lastplayed",
      JSON.stringify("2022-06-08T22:38:56.409Z")
    );

    render(<ChainReactionGame />);

    await waitFor(() =>
      expect(screen.getByTestId("game-status-div")).toBeTruthy()
    );
    await waitFor(() =>
      expect(screen.getByTestId("full-game-div")).toBeTruthy()
    );
  });
  it("should update state on click", () => {
    const setData = jest.fn();
    const wrapper = mount(<ChainReactionGame />);
    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation((data) => [data, setData]);
    waitFor(() => expect(setData).toBeCalled());
  });
});
