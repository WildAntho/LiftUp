import { User } from "../../entities/user";
import { mockAndWhere, mockGetMany, mockLeftJoinAndSelect, mockOrderBy, mockWhere } from "../../factory/queryBuilderMock";
import { StudentResolver } from "../studentResolver";


// Mocks pour la sous-requête
const mockSubQueryBuilder = {
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  leftJoin: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  orWhere: jest.fn().mockReturnThis(),
  getQuery: jest.fn(() => "(SELECT id FROM user)"),
};

const mockQueryBuilder = {
  leftJoinAndSelect: mockLeftJoinAndSelect,
  where: mockWhere,
  andWhere: mockAndWhere,
  subQuery: jest.fn(() => mockSubQueryBuilder),
  orderBy: mockOrderBy,
  getMany: mockGetMany,
};

jest
  .spyOn(User, "createQueryBuilder")
  .mockImplementation(() => mockQueryBuilder as any);

describe("StudentResolver", () => {
  const resolver = new StudentResolver();
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("selectCoach", () => {
    it("should return coaches filtered by name", async () => {
      const expectedUsers = [{ id: "1" }, { id: "2" }];
      mockGetMany.mockResolvedValue(expectedUsers);

      const result = await resolver.selectCoach("123", "john");

      expect(mockWhere).toHaveBeenCalledWith("user.roles = :role", {
        role: "COACH",
      });
      expect(mockAndWhere).toHaveBeenCalledWith(
        "(user.firstname ILIKE :input OR user.lastname ILIKE :input)",
        { input: "%john%" }
      );
      expect(result).toEqual(expectedUsers);
    });

    it("should filter by price range", async () => {
      mockGetMany.mockResolvedValue([{ id: "1" }]);

      await resolver.selectCoach("123", undefined, [10, 50]);

      expect(mockAndWhere).toHaveBeenCalledWith(
        "offers.price BETWEEN :minPrice AND :maxPrice",
        { minPrice: 10, maxPrice: 50 }
      );
    });

    it("should filter by category", async () => {
      mockGetMany.mockResolvedValue([{ id: "1" }]);

      await resolver.selectCoach("123", undefined, undefined, "cat123");

      expect(mockAndWhere).toHaveBeenCalledWith(
        "offers.category.id = :categorie",
        {
          categorie: "cat123",
        }
      );
    });

    it("should exclude users with pending requests", async () => {
      mockGetMany.mockResolvedValue([{ id: "3" }]);

      await resolver.selectCoach("999");

      const andWhereArg = mockAndWhere.mock.calls.find(
        ([arg]) => typeof arg === "function"
      );

      expect(andWhereArg).toBeDefined();

      const queryString = andWhereArg?.[0]({
        subQuery: mockQueryBuilder.subQuery,
      });

      expect(queryString).toContain("user.id NOT IN (SELECT id FROM user)");
    });
  });

  describe("getChatUsers", () => {
    it("should return users from crew and coach", async () => {
      const userData = {
        id: "1",
        crew: {
          students: [{ id: "2" }, { id: "1" }],
        },
        coach: { id: "99" },
      };

      jest.spyOn(User, "findOne").mockResolvedValue(userData as any);

      const context = { user: { id: "1" } as User };
      const result = await resolver.getChatUsers(context);

      expect(result).toEqual([{ id: "2" }, { id: "99" }]);
    });

    it("should throw an error if user is not found", async () => {
      jest.spyOn(User, "findOne").mockResolvedValue(null);

      await expect(
        resolver.getChatUsers({ user: { id: "999" } as User })
      ).rejects.toThrow("Aucun utilisateur trouvé");
    });
  });
});
