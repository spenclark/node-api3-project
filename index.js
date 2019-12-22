// code away!
const server = require('./api/server')

const port = 4000;

server.listen(port, () => {
    console.log(`\n Server is @ port ${port} \n`)
})