export async function json(req, res) {
    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }

    const data = Buffer.concat(buffers).toString()

    try{
        if(data) {
            req.body = JSON.parse(data)
            console.log("Body recebido: ", req.body)
        } else{
            req.body = {}
        }
    } catch (error) {
        console.log("Erro ao fazer parse do JSON", error.message)
        req.body = null
    }

    res.setHeader('Content-type', 'application/json')
}