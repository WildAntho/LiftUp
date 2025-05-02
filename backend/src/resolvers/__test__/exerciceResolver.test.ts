import { Exercice } from "../../entities/exercice";
import { Training } from "../../entities/training";
import { createMockExerciceInput } from "../../factory/exerciceFactory";
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
      const mockTraining = new Training();
      mockTraining.id = "training-id";
      mockTraining.exercices = [];
      mockTraining.save = jest.fn();

      // Mock de Training.findOne
      (Training.findOne as jest.Mock).mockResolvedValue(mockTraining);

      // Mocks des exercices à ajouter
      const mockExerciceInput = createMockExerciceInput(); // doit retourner un AddExercicePlanInput
      const exercicesToAdd = [mockExerciceInput, mockExerciceInput]; // deux exercices

      // Mock de Exercice.create et .save
      const mockExerciceInstance = new Exercice();
      mockExerciceInstance.save = jest
        .fn()
        .mockResolvedValue(mockExerciceInstance);
      jest.spyOn(Exercice, "create").mockReturnValue(mockExerciceInstance);
      jest
        .spyOn(Exercice.prototype, "save")
        .mockResolvedValue(mockExerciceInstance);

      // Appel du resolver
      const result = await exerciceResolver.addExercice(
        "training-id",
        exercicesToAdd
      );

      // Vérification du résultat
      expect(result).toBe("Les exercices ont bien été ajouté");
      expect(Training.findOne).toHaveBeenCalledWith({
        where: { id: "training-id" },
        relations: { exercices: true },
      });
      expect(Exercice.create).toHaveBeenCalledTimes(2);
      expect(mockExerciceInstance.save).toHaveBeenCalledTimes(2);
    });

    it("should throw if training not found", async () => {
      (Training.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        exerciceResolver.addExercice("bad-id", {} as any)
      ).rejects.toThrow("Aucun entraînement n'a été trouvé");
    });
  });
});
