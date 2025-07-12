import { faker } from "@faker-js/faker";
import { UserRole } from "../InputType/userType";

export const createMockUserInput = () => ({
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  email: faker.internet.email(),
  password: "Password123!",
  confirmedPassword: "Password123!",
  roles: UserRole.STUDENT,
});

export const createMockUserEntity = (overrides = {}) => ({
  id: faker.string.uuid(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  email: faker.internet.email(),
  password: "hashedPassword",
  roles: UserRole.STUDENT,
  avatar: null,
  ...overrides,
});

export const mockResponse = () => {
  const res: any = {};
  res.cookie = jest.fn();
  return res;
};
