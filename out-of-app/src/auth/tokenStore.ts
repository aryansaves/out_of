import * as SecureStore from "expo-secure-store"


const TOKEN_KEY = "outof_token"

export async function saveToken(token: string) {
    await SecureStore.setItemAsync(TOKEN_KEY, token)
}
export async function getToken() {
    return await SecureStore.getItemAsync(TOKEN_KEY)
}
export async function deleteToken() {
    await SecureStore.deleteItemAsync(TOKEN_KEY)
}