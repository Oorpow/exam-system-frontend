import { userReq } from "@/utils/request"

export const userLogin = (data: Dto.UserLoginDto) => {
    return userReq.request<Res.CommonRes<Res.UserLoginRes>>({
        method: 'POST',
        url: '/user/login',
        data
    })
}