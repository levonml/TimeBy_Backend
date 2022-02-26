const unknownEndpoint = async (req, res) =>{
await res.send({error:"unknownEndpoint"})
}
export default unknownEndpoint