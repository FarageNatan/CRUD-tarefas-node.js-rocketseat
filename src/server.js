import http from 'node:http' // Modulo nativo que vem junto com a instalação do Node.js
import { json } from './middlewares/json.js'

const server = http.createServer(async (req, res) => { //Factory Function(retorna um objeto) -> server eh uma variavel do tipo objeto
    const {method, url} = req
    
    await json(req, res)

}) 

server.listen(2608) //A funcao do nosso objeto server eh ouvir as requisições que chegam pela rede.