import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config.js';
let {sign, verify} = jwt




export default {
    sign: (payload) => sign(payload, PRIVATE_KEY),
    verify: (token) => verify(token, PRIVATE_KEY)
}


