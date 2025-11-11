import { ErrorFactory } from "@praha/error-factory"

export class FetchError extends ErrorFactory({
  name: "FetchError",
  message: "An error occurred while fetching todos.",
}) {}

export function isFetchError(value: unknown): value is FetchError {
  return value instanceof FetchError
}
