import 'dotenv/config'
import { tokens } from './tokens'
import 'whatwg-fetch'
// import cloudinary from 'cloudinary'
// const client = cloudinary.v2
// client.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// })
interface Token {
    id: string
    address: string
    chainId: number
    name: string
    symbol: string
}

async function main() {
    const missingTokens: Token[] = []
    for (const token of tokens) {
        const isImageUploaded = await existOnCloudinary(token)
        if (!isImageUploaded) {
            missingTokens.push(token as Token)
        }
    }
    console.log( 'Missing tokens: \n', missingTokens.map((token) => `${token.id} ~ ${token.symbol} ~ ${token.name}`).join('\n'))
}

async function existOnCloudinary(token: Token) {
    const result = await fetch(`https://cdn.sushi.com/tokens/${token.chainId}/${token.address}.jpg`)
    return result.status === 200
}


main()