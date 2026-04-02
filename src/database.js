/* Como dito anteriormente no arquivo routes.js (nosso Controler) esse arquivo corresponde ao Service da nossa aplicação, ou seja, ele que é responsável por centralizar toda a lógica de comunicação com o banco de dados.

Nele que vão ser "implementadas" a lógica para as operações de CRUD(Create, Read, Update e Delete). 
*/
import fs from 'node:fs/promises'

const caminhoBD = new URL('db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(caminhoBD, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(caminhoBD, JSON.stringify(this.#database))
    }

    select(table){
        return this.#database[table] ?? []
    }

    insert(table, data) {
        if(!this.#database[table]) {
            this.#database[table] = []
        }
        this.#database[table].push(data)
        this.#persist()
        return data
    }

}
