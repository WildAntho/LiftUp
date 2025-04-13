import * as argon from "argon2";
import jwt from "jsonwebtoken";
import { User } from "../../entities/user";
import { UserResolver } from "../userResolver";
import {
  createMockUserEntity,
  createMockUserInput,
  mockResponse,
} from "../../factory/userFactory";

jest.mock("../../entities/user");
jest.mock("argon2");
jest.mock("jsonwebtoken");

describe("UserResolver", () => {
  let userResolver: UserResolver;
  const res = mockResponse();

  beforeEach(() => {
    process.env.APP_SECRET = "supersecretkey";
    userResolver = new UserResolver();
    jest.clearAllMocks();
  });

  describe("signUp resolver", () => {
    const mockUserInput = createMockUserInput();
    it("should create a new user and return a token", async () => {
      (User.findOneBy as jest.Mock).mockResolvedValue(undefined);
      (argon.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (jwt.sign as jest.Mock).mockReturnValue("mockedToken");
      (User.save as jest.Mock).mockResolvedValue(undefined);

      const result = await userResolver.signUp(mockUserInput, { res });

      expect(User.findOneBy).toHaveBeenCalledWith({
        email: mockUserInput.email,
      });
      expect(argon.hash).toHaveBeenCalledWith(mockUserInput.password);
      expect(res.cookie).toHaveBeenCalledWith(
        "token",
        "mockedToken",
        expect.any(Object)
      );
      expect(JSON.parse(result)).toMatchObject({
        email: mockUserInput.email,
        firstname: mockUserInput.firstname,
        lastname: mockUserInput.lastname,
        roles: mockUserInput.roles,
      });
    });

    it("should throw if APP_SECRET is missing", async () => {
      delete process.env.APP_SECRET;
      await expect(userResolver.signUp(mockUserInput, { res })).rejects.toThrow(
        "Missing environment variable"
      );
    });

    it("should throw if email is missing", async () => {
      const mockUserInputWithoutEmail = { ...mockUserInput, email: "" };
      await expect(
        userResolver.signUp(mockUserInputWithoutEmail, { res })
      ).rejects.toThrow();
    });

    it("should throw if user already exists", async () => {
      (User.findOneBy as jest.Mock).mockResolvedValue({});
      await expect(userResolver.signUp(mockUserInput, { res })).rejects.toThrow(
        "Un utilisateur existe déjà pour cette adresse mail"
      );
    });

    it("should throw if password is not strong enough", async () => {
      const mockUserInputWithBadPassword = {
        ...mockUserInput,
        password: "badpassword",
      };
      (User.findOneBy as jest.Mock).mockResolvedValue(undefined);
      await expect(
        userResolver.signUp(mockUserInputWithBadPassword, { res })
      ).rejects.toThrow("Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial");
    });

    it("should throw if passwords do not match", async () => {
      const mockUserInputWithBadPassword = {
        ...mockUserInput,
        confirmedPassword: "Different123!",
      };
      (User.findOneBy as jest.Mock).mockResolvedValue(undefined);
      await expect(
        userResolver.signUp(mockUserInputWithBadPassword, { res })
      ).rejects.toThrow("Les mots de passe doivent être identique");
    });
  });

  describe("login resolver", () => {
    const fakeUser = createMockUserEntity();
    it("should login a user and return a token", async () => {
      const userData = {
        email: fakeUser.email,
        password: "Password123!",
      };

      (User.findOneBy as jest.Mock).mockResolvedValue(fakeUser);
      (argon.verify as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mockedToken");

      const res = mockResponse();
      const result = await userResolver.login(userData, { res });

      expect(User.findOneBy).toHaveBeenCalledWith({ email: userData.email });
      expect(argon.verify).toHaveBeenCalledWith(
        fakeUser.password,
        userData.password
      );
      expect(res.cookie).toHaveBeenCalledWith(
        "token",
        "mockedToken",
        expect.any(Object)
      );

      expect(JSON.parse(result)).toMatchObject({
        id: fakeUser.id,
        email: fakeUser.email,
        firstname: fakeUser.firstname,
        lastname: fakeUser.lastname,
        roles: fakeUser.roles,
        avatar: null,
      });
    });

    it("should throw if user is not found", async () => {
      (User.findOneBy as jest.Mock).mockResolvedValue(undefined);
      const userData = { email: "notfound@test.com", password: "Password123!" };
      const res = mockResponse();
      await expect(userResolver.login(userData, { res })).rejects.toThrow(
        "Adresse e-mail ou mot de passe incorrect."
      );
    });

    it("should throw if password is incorrect", async () => {
      (User.findOneBy as jest.Mock).mockResolvedValue(fakeUser);
      (argon.verify as jest.Mock).mockResolvedValue(false);
      const userData = { email: fakeUser.email, password: "WrongPassword!" };
      const res = mockResponse();
      await expect(userResolver.login(userData, { res })).rejects.toThrow(
        "Adresse e-mail ou mot de passe incorrect."
      );
    });
  });
});
