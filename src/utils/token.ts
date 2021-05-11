import jwt from 'jsonwebtoken'

export const tokenUtils = {
    encrypt (data: any, time: string) {
        return jwt.sign(data, 'token', { expiresIn: time })
    },
    decrypt (token: string) {
        try {
            let data: any = jwt.verify(token, 'token')
            return {
                token: true,
                id: data.id,
            }
        } catch (e) {
            return {
                token: false,
                data: e,
            }
        }
    },
}
