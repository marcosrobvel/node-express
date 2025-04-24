import { User } from "../interfaces/userInterface";
import { validateUserData } from "../validators/userValidator";
import fs from "fs";

const users: User[] = require("../data/users.json");

export class UserService {
  private users: User[];
  private usersFilePath = "./data/users.json";

  constructor() {
    this.users = users;
  }

  private writeUsersFile(users: User[]): void {
    fs.writeFileSync(this.usersFilePath, JSON.stringify(users, null, 2));
  }

  public getAllUsers(): User[] {
    return this.users;
  }

  public getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public createUser(userData: Omit<User, "id">): User {
    validateUserData(userData);

    const newId =
      this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;

    const newUser: User = { id: newId, ...userData };

    this.users.push(newUser);

    this.writeUsersFile(this.users);

    return newUser;
  }

  public updateUser(id: number, userData: Partial<Omit<User, "id">>): User {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    validateUserData(userData as Omit<User, "id">);

    const updatedUser: User = { ...this.users[userIndex], ...userData };

    this.users[userIndex] = updatedUser;

    this.writeUsersFile(this.users);

    return updatedUser;
  }

  public deleteUser(id: number): User {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const [deletedUser] = this.users.splice(userIndex, 1);

    this.writeUsersFile(this.users);

    return deletedUser;
  }
}
