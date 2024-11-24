import { ValidationError } from 'yup';

export const isValidationError = (error: unknown): error is ValidationError => (error as ValidationError).name !== undefined;
