import { getMockUser } from "@/test/testData";
import { setup } from "@/test/utils";
import { screen, waitFor } from "@testing-library/react";
import { UserTableContainer } from "./UserTableContainer";

const getUserMock = jest.fn();
jest.mock("@/api/users", () => {
  return {
    getUsers: (val: any) => getUserMock(val),
  };
});

describe("UserTableContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should load users on initial render", async () => {
    const mockUser1 = getMockUser();
    getUserMock.mockResolvedValueOnce([mockUser1]);

    const { queryByText } = setup(<UserTableContainer />);

    expect(getUserMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(queryByText(mockUser1.name)).not.toBeNull();
    });
  });

  it("Should show a warning when trying to get users when there are still users in the table", async () => {
    const mockUser1 = getMockUser();
    getUserMock.mockResolvedValueOnce([mockUser1]);

    const { user, getByText, queryByText } = setup(<UserTableContainer />);

    expect(getUserMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(queryByText(mockUser1.name)).not.toBeNull();
    });

    await user.click(getByText("Get users"));

    expect(
      screen.queryByText("There must be 0 users before you can get more users.")
    ).not.toBeNull();
  });

  it("Should remove all users from table when clicking on clear all users button", async () => {
    const mockUser1 = getMockUser();
    getUserMock.mockResolvedValueOnce([mockUser1]);

    const { queryByText, user, getByText } = setup(<UserTableContainer />);

    expect(getUserMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(queryByText(mockUser1.name)).not.toBeNull();
    });

    expect(queryByText("User Data (1)")).not.toBeNull();
    await user.click(getByText("Clear all users"));

    expect(queryByText("User Data (0)")).not.toBeNull();
    expect(queryByText("Looks like there are no users!"));
    expect(queryByText(mockUser1.name)).toBeNull();
  });

  it("Should retrieve users when pressing get users when the table is empty", async () => {
    const mockUser1 = getMockUser();
    getUserMock.mockResolvedValueOnce([]).mockResolvedValueOnce([mockUser1]);

    const { queryByText, user, getByText } = setup(<UserTableContainer />);

    expect(getUserMock).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(queryByText("User Data (0)")).not.toBeNull());

    await user.click(getByText("Get users"));

    await waitFor(() => expect(queryByText(mockUser1.name)).not.toBeNull());
    expect(queryByText("User Data (1)")).not.toBeNull();
  });

  it("Should remove a user from the table when clicking on remove user button", async () => {
    const mockUser1 = getMockUser();
    getUserMock.mockResolvedValueOnce([mockUser1]);

    const { queryByText, user, getByText } = setup(<UserTableContainer />);

    expect(getUserMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(queryByText(mockUser1.name)).not.toBeNull();
    });

    expect(queryByText("User Data (1)")).not.toBeNull();
    await user.click(getByText("X"));

    expect(queryByText("User Data (0)")).not.toBeNull();
    expect(queryByText("Looks like there are no users!"));
    expect(queryByText(mockUser1.name)).toBeNull();
  });
  it("Should display error state when get users fails", async () => {
    const mockUser1 = getMockUser();
    getUserMock
      .mockRejectedValueOnce(new Error("Woops"))
      .mockResolvedValueOnce([mockUser1]);

    const { queryByText, user, getByText } = setup(<UserTableContainer />);

    expect(getUserMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(queryByText("An error occurred loading the users :(")).not.toBeNull();
    });
    expect(queryByText(mockUser1.name)).toBeNull();

    await user.click(getByText("Get users"));

    await waitFor(() => expect(queryByText(mockUser1.name)).not.toBeNull());
    expect(queryByText("An error occurred loading the users")).toBeNull();
  });
});
