import { User } from "@/interfaces/users";
import { Button } from "../Button";

type UserTableProps = {
  users: User[];
  handleDeleteUser: (id: number) => void;
};

export const UserTable: React.FC<UserTableProps> = ({
  users,
  handleDeleteUser,
}) => {
  return (
    <table className="w-full text-left">
      <thead className="m-12">
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Company</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="mt-4">
        {users.map((user) => (
          <tr key={user.id} className="h-12 border-b-2 border-b-gray-200">
            <td className="pr-4">{user.name}</td>
            <td className="pr-4">{user.username}</td>
            <td className="pr-4">{user.email}</td>
            <td className="pr-4">
              {user.address.street} - {user.address.city}
            </td>
            <td className="pr-4">{user.phone}</td>
            <td className="pr-4">{user.website}</td>
            <td className="pr-4">{user.company.name}</td>
            <td>
              <Button
                onClick={() => handleDeleteUser(user.id)}
                className="text-warning"
                text="X"
                action="warning"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
