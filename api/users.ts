import { User } from "@/interfaces/users";
import axios from "axios";

export const 
getUsers = async (): Promise<User[]> => {
  try {
    // TODO: This should come from env var
    const response = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (err) {
    // TODO: Handle err
    throw err;
  }
};
