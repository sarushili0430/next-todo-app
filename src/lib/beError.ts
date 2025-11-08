import { ErrorFactory } from "@praha/error-factory"

class ServerError extends ErrorFactory({
  name: "ServerError",
  message: "An error occurred while fetching data from the server.",
}) {}
class ClientError extends ErrorFactory({
  name: "ClientError",
  message: "A client error occurred while fetching data from the server.",
}) {}

export type FetchError = ServerError | ClientError
