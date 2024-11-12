import CryotoJS from 'crypto-js'

export default function generateToken() {
    const baseString = '!UVv+4nMXTUc%KWMR(G#2)Rb2yYNc6$2-'
    const date = new Date()
    date.setHours(date.getHours() + 7)

    const formattedDate = date.toISOString().split('T')[0]

    const tokenString = baseString + formattedDate
    return CryotoJS.MD5(tokenString).toString()
}
