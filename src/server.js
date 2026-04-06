import http from 'node:http' // Modulo nativo que vem junto com a instalação do Node.js
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => { //Factory Function(retorna um objeto) -> server eh uma variavel do tipo objeto
    const {method, url} = req
    
    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {

        const routeParams = req.url.match(route.path)
        req.params = { ...routeParams.groups }

        return route.handler(req, res)
    }

    console.log(`Nenhuma rota encontrada para ${method} ${url}`)
    return res.writeHead(404).end('NOT FOUND')
}) 

server.listen(2608) //A funcao do nosso objeto server eh ouvir as requisições que chegam pela rede.