import { commonOpReq } from "../utils/request"

export const userLogin = (data: Dto.UserLoginDto) => {
    return commonOpReq.request<Res.CommonRes<Res.UserLoginRes>>({
        method: 'POST',
        url: '/user/login',
        data
    })
}