import { Exercice } from "../../entities/exercice";
import { Training } from "../../entities/training";
import { createMockExerciceInput } from "../../factory/exerciceFactory";
import { ScopeExercice } from "../../InputType/exerciceType";
import { CreateMultipleExercicesFromModel } from "../../services/exerciceService";
import { ExerciceResolver } from "../exerciceResolver";

jest.mock("../../entities/exercice");
jest.mock("../../entities/training");

describe("ExerciceResolver", () => {
  let exerciceResolver: ExerciceResolver;
  let mockExercice: Exercice;
  const data = createMockExerciceInput();
  beforeEach(() => {
    exerciceResolver = new ExerciceResolver();
    mockExercice = new Exercice();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getExercices", () => {
    it("should return exercices for a training", async () => {
      const mockExercices = [{ id: "1" }, { id: "2" }] as Exercice[];
      (Exercice.find as jest.Mock).mockResolvedValue(mockExercices);

      const result = await exerciceResolver.getExercices("training-id");
      expect(Exercice.find).toHaveBeenCalledWith({
        where: { training: { id: "training-id" } },
        relations: { training: true },
      });
      expect(result).toEqual(mockExercices);
    });
  });

  describe("updateExercice", () => {
    it("should update and return the exercice", async () => {
      mockExercice.id = "1";
      (Exercice.findOneBy as jest.Mock).mockResolvedValue(mockExercice);
      (Exercice.save as jest.Mock).mockResolvedValue(mockExercice);

      const result = await exerciceResolver.updateExercice("1", data);
      expect(result.title).toBe(data.title);
      expect(mockExercice.save).toHaveBeenCalled();
    });

    it("should throw if exercice not found", async () => {
      (Exercice.findOneBy as jest.Mock).mockResolvedValue(null);

      await expect(
        exerciceResolver.updateExercice("999", data)
      ).rejects.toThrow("Aucun exercice pour cet id");
    });
  });

  describe("deleteExercice", () => {
    it("should delete the exercice", async () => {
      mockExercice.remove = jest.fn().mockResolvedValue(null);
      (Exercice.findOneBy as jest.Mock).mockResolvedValue(mockExercice);

      const result = await exerciceResolver.deleteExercice("1");
      expect(mockExercice.remove).toHaveBeenCalled();
      expect(result).toBe("L'exercice a bien été supprimé");
    });

    it("should throw if exercice not found", async () => {
      (Exercice.findOneBy as jest.Mock).mockResolvedValue(null);

      await expect(exerciceResolver.deleteExercice("404")).rejects.toThrow(
        "Aucun exercice pour cet id"
      );
    });
  });

  describe("addExercice", () => {
    it("should create multiple exercices and return success message", async () => {
      // Mock de l'entité Training avec relation exercices
      const mockExerciceInput = createMockExerciceInput(); // doit retourner un AddExercicePlanInput
      const exercicesToAdd = [mockExerciceInput, mockExerciceInput];

      // Scope utilisé
      const scope = ScopeExercice.CALENDAR;

      // Mock de l'entité TrainingPlan avec relation exercices
      const mockTrainingPlan = new Training();
      mockTrainingPlan.id = "training-id";
      mockTrainingPlan.exercices = [];

      // Mock de TrainingPlan.findOne
      jest.spyOn(Training, "findOne").mockResolvedValue(mockTrainingPlan);

      // Spy sur CreateMultipleExercicesFromModel
      const mockCreateMultiple = jest.fn();
      (CreateMultipleExercicesFromModel as jest.Mock) = mockCreateMultiple;
      mockCreateMultiple.mockResolvedValue(undefined);

      // Appel du resolver
      const result = await exerciceResolver.addExercice(
        "training-id",
        exercicesToAdd,
        scope
      );

      // ✅ Assertions
      expect(result).toBe("Les exercices ont bien été ajoutés");

      expect(Training.findOne).toHaveBeenCalledWith({
        where: { id: "training-id" },
        relations: { exercices: true },
      });

      expect(CreateMultipleExercicesFromModel).toHaveBeenCalledWith(
        exercicesToAdd,
        mockTrainingPlan,
        scope
      );
    });

    it("should throw if training not found", async () => {
      // Mock de TrainingPlan.findOne qui renvoie null
      jest.spyOn(Training, "findOne").mockResolvedValue(null);

      await expect(
        exerciceResolver.addExercice("bad-id", [] as any, ScopeExercice.CALENDAR)
      ).rejects.toThrow("Aucun entraînement n'a été trouvé");
    });
  });
});
