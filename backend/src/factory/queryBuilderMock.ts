// Mocks du QueryBuilder principal
export const mockGetMany = jest.fn();
export const mockAndWhere = jest.fn().mockReturnThis();
export const mockWhere = jest.fn().mockReturnThis();
export const mockLeftJoinAndSelect = jest.fn().mockReturnThis();
export const mockOrderBy = jest.fn().mockReturnThis();