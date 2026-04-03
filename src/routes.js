/* Este arquivo corresponde ao controller da nossa aplicação. Ele é responsável por fazer a ponte entre a requisição do usuário (representado pelo Insomnia) e a lógica de negócio/banco de dados 

Ele recebe as requisições HTTP, valida os dados de entrada e envia para o arquivo database.js(correspondente ao Service) para processar os dados e retornar respostas para o cliente.
*/
import { randomUUID } from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks')
            console.log(`GET /tasks → ${tasks.length} tarefas retornadas`)
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const body = req.body || {}
            const { title, description } = body
            console.log("Body recebido no handler:", body)

            if(!title || !description) {
                console.log("Validação falhou: title ou description ausente")
                return res.writeHead(400).end('Title e descricao sao obrigatorios')
            }

            const task = {
                id: randomUUID(),
                title: title.trim(),
                description: description.trim(),
                completed_at: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }

            database.insert('tasks', task)
            console.log(`Tarefa criada com sucesso: "${title}"`)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body || {}

            const taskExists = database.select('tasks').some(t => t.id === id)
            if(!taskExists) {
                return res.writeHead(404).end('Tarefa nao encontrada')
            }

            database.update('tasks', id, { title, description })
            return res.writeHead(204).end('Tafera Atualizada')
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            const taskExists = database.select('tasks').some(t => t.id === id)
            if(!taskExists) {
                return res.writeHead(404).end('Tarefa nao encontrada')
            }

            database.delete('tasks', id)
            return res.writeHead(204).end('Tarefa excluida')
        }
    }
]