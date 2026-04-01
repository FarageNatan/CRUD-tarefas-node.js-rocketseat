export async function json(req, res) {
    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }

}