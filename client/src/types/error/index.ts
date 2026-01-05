export type ErrorSource = "user" | "translation" | "languages" | "histories" | "network";

export interface AppError {
  id: string;
  source: ErrorSource;
  message: string;
}
