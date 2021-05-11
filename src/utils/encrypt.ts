import crypto = require('crypto')// 导入加密
import NodeRSA = require('node-rsa')

// eslint-disable-next-line max-len
let privateKey = 'MIIEogIBAAKCAQEAzXxP6OXJngn7swrIhdP4NGspsHGTsaorhGR9EktSCf+ekPrBvoDSbM5nJhKunXOy5RhjF9PzmpUk+gZYrj02X5xC+hnprZ3d3iRx9QOskrH9UAnc0BeeUb2mR0nimdAeAZx82dVKwK8A3UULdbPaE34xpmZ9uhvHkGQbDJVvZwDneZDrre/9D9WmFgqslE5VVqbpTW/T0CyNY6ZNENvvy+ZOLyz+SQ9ydFrKCc8n2JaGvrjwQlckm9hxbG2AnGC4pcG8jW9JbyZqUff9m/TyR31g834F0PMPFF34IMzQVVY05qAEpEAdIm6rt7sisKGf8MwByTck6ze1HUC8iUUzYQIDAQABAoIBAFtpuRbv2tCuukV9P5WhpeKT5djzvfOks3VTSvyve1CtYfo3Q6efIX18GREr8HhlNymJvtOj29RiEzATULI60wyXtIgUrQsqlsAzUGridoxQGFPZ/1ynlSviBa3jJaatmhu3ZSd3JqkvcV/+TknPd+2CD05qe/YmU5Jdplbjx8p3JPD2jLdCS7LImPiHcSQqK1dOQBIL1htVgZajA2sYWENzTAKmL38kbOkwJEFGR/o9o9A1brS2Wad6dG2Q0jTIqN4ceVKCC4RHfpZrQwx+s8SBPR56D46HSoy7jIw64XuAo/g9rsdjyv1mnl+e1ghb18JfzM5E1D6UNE9KemgXWAECgYEA9gT2cEzpx9m1voauk+8XytTspl4KNYUIvX/2aUebKVTZOhvotLUrYfMtjHzEFd8w3eE+5iABNiy7XWFCxdc8DtAi0SN4HBMcnrlaHKOuqFjIVXIVAOpiAvAIaZlKyl+CvnPbInErLAtI5EMBNhGhLFuJriJzPyTszYICo4GHgyECgYEA1dJio8oMsDgLhJwUTLxUbQshgEhxQFkIxvDPEcT82o6WTGdUvbdvhvNDaF7cbxamGbKo+1HkJf/hGTTa81aqi41PID9OTrJjGsEoh651MVhEp+Z3GCAHTfqkjcjwBWUaKQ6Bfex/dOCohCruioEdDs45GwG+qya+gMWVsj0n6EECgYAuUMzcY353o2L11YE0VITUKLXMtFOTs9HraxXGyDZL1691ox9yNdFPBWsD0dFQlM4sV2VyCYBw5Ib5k3/wow6pc0G6wcSw9GAk+ZwfXClbhCti+rE9lOKSzwGmb7eG1ehVVpZgq5GHHzC/2GV3+mWvZiRLZizwLFFwdxNsGMycQQKBgH3LFDT//Y7+qegOWvL6KUEttzvdYqNUvhEsQuZVWdzK3il88SHb9UUTgKi6hjzkujuMHFYey3Z/n1JRAi7+4b7QF6kFFXC/CgcHdGy+ejvZjiqpL4+F6EY8Gus/N9Y0sLtOyWfn5uQ/92QqTcQ2SX4YXQhCcoYGeTURCQyfZgcBAoGAZhKhomEagTmoP+Sbgp1J9cp+1eQMLY+YgfKZrOdOqjjMfpac8gFDabPayj86cHSE3RUPUyCIPQkziB5ai3ty5vOj+9PVvrvY8OVjqK1puf8mLDpwiErb8PDqhVST3S5MlgnTeXgvE4rGVzHdr6cY23SYCRhGTVifplGwIq3El6k='
privateKey = `-----BEGIN RSA PRIVATE KEY-----${privateKey}-----END RSA PRIVATE KEY-----`
export const decryptRSA = (encryptStr: any) => {
    let encrypter = new NodeRSA()
    encrypter.setOptions({ encryptionScheme: 'pkcs1' })
    encrypter.importKey(privateKey, 'pkcs1')
    let encryptRes = encrypter.decrypt(encryptStr, 'utf8')
    return encryptRes
}

/**
 * 生成md5加密字符串
 * @param {string} str
 */
export const md5 = (str: string) => {
    str = `${str}`
    const hash = crypto.createHash('md5')
    hash.update(str)
    return hash.digest('hex')
}
export const sha256 = (str: string) => {
    str = `${str}`
    const hash = crypto.createHash('sha256')
    hash.update(str)
    return hash.digest('hex')
}
/**
 * 生成sha512加密字符串
 * @param {string} str
 */
export const sha512 = (str: string) => {
    str = `${str}`
    const hash = crypto.createHash('sha512')
    hash.update(str)
    return hash.digest('hex')
}