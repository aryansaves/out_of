import {api} from "./client"

export async function getMyProfile(){
    const res = await api.get("user/me/profile")
    return res.data
}