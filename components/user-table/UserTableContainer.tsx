import { getUsers } from "@/api/users";
import { User } from "@/interfaces/users";
import { RequestState } from "@/interfaces/util";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "../Button";
import { LoadingIcon } from "../LoadingIcon";
import { UserTable } from "./UserTable";

type UserTableContainerProps = {};

export const UserTableContainer: React.FC<UserTableContainerProps> = ({}) => {
  const [users, setUsers] = useState<RequestState<User[]>>({
    isLoading: true,
    data: [],
  });

  useEffect(() => {
    // Request users on page load
    requestUsers();
  }, []);

  const requestUsers = () => {
    setUsers((currentVal) => ({
      ...currentVal,
      isLoading: true,
      error: undefined,
    }));

    getUsers()
      .then((res) => {
        setUsers({
          data: res,
          isLoading: false,
        });
      })
      .catch((err) => {
        setUsers({
          isLoading: false,
          data: [],
          error: err,
        });
      });
  };

  const handleGetUsersClick = () => {
    // Check if we already have existing users, in which case we should not continue.
    if (users.data.length) {
      toast.error("There must be 0 users before you can get more users.");
      return;
    }
    // Prevent multiple requests to retrieve users whilst it's still pending from occurring
    if (users.isLoading) return;

    requestUsers();
  };

  const handleClearUsers = () => {
    // Prevent some random race conditions (maybe we could even disable the button)
    if (users.isLoading) return;

    setUsers({
      isLoading: false,
      data: [],
    });
  };

  const handleDeleteUser = (userId: number) => {
    const newUsers = users.data.filter((user) => user.id !== userId);
    setUsers((currentVal) => ({
      ...currentVal,
      data: newUsers,
    }));
  };

  if (users.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingIcon />
      </div>
    );
  }

  if (users.error) {
    // TODO: handle error state some way
    return (
      <div className="flex justify-center items-center flex-col w-full h-full gap-4">
        <p className="text-black">An error occurred loading the users :(</p>
        <Button text="Get users" action="info" onClick={handleGetUsersClick} />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl p-8 overflow-x-auto text-gray-900">
        <h2 className="text-xl font-bold mb-4">
          User Data ({users.data.length})
        </h2>
        {users.data.length == 0 ? (
          <div className="flex justify-center align-center">
            <div className="text-center">
              <p>Looks like there are no users!</p>
              <Button
                text="Get users"
                action="info"
                onClick={handleGetUsersClick}
                className="mt-4"
              />
            </div>
          </div>
        ) : (
          <>
            <UserTable users={users.data} handleDeleteUser={handleDeleteUser} />
            <div className="flex w-full justify-end mt-4">
              <div className="flex-col">
                <div className="flex gap-4 justify-end">
                  <Button
                    text="Get users"
                    action="info"
                    onClick={handleGetUsersClick}
                  />
                  <Button
                    text="Clear all users"
                    action="warning"
                    onClick={handleClearUsers}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
};
