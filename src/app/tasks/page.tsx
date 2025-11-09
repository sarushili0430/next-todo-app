import { TodoScreen } from "./TodoScreen"
import { fetchTodos } from "./actions"

export default async function TodosPage() {
  const todos = await fetchTodos()
  return <TodoScreen todos={todos} />
}
