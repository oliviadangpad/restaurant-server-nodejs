import dotenv from 'dotenv-safe'
import { add } from './math/add'

dotenv.config()

console.log(add(1, 4))
console.log(process.env.MY_NAME)
