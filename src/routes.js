/* Este arquivo corresponde ao controller da nossa aplicação. Ele é responsável por fazer a ponte entre a requisição do usuário (representado pelo Insomnia) e a lógica de negócio/banco de dados 

Ele recebe as requisições HTTP, valida os dados de entrada e envia para o arquivo database.js(correspondente ao Service) para processar os dados e retornar respostas para o cliente.
*/
import { Database } from './database.js'

const database = new Database()

export const routes = [


]