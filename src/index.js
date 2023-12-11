import app from './app.js'
import { sequelize } from './db/dataBase.js'
const port = process.env.PORT || 4080

import './models/permissionModule.model.js'
import './models/losses.model.js'

async function main() {
    try{
        await sequelize.sync({force: false})
        app.listen(port);
        console.log('Server on port ', port);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();