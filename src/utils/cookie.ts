import Cookie from 'js-cookie'
export const tokenName = 'basic_token';

export function setAccesssToken(token: string) {
    Cookie.set(tokenName,token)
}
export function getAccessToken() {
    return Cookie.get(tokenName)
}

export function removeAccessToken() {
    Cookie.remove(tokenName)
}