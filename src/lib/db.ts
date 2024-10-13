import postgres from 'postgres'

//const sql = postgres('postgres://marci:mostsecurepassword@localhosy:5432/marci')
const sql = postgres( {
    host                 : process.env.DB_HOST,
    port                 : process.env.DB_PORT,
    database             : process.env.DB_NAME,
    username             : process.env.DB_USER,
    password             : process.env.DB_PASSWORD})

export default sql