import { answerReq } from "@/utils/request"

export const addAnswer = (data: Dto.CreateAnswerDto) => {
    return answerReq.request<Res.CommonRes>({
        url: '/answer',
        method: 'POST',
        data
    })
}

export const findAnswerById = (id: number) => {
    return answerReq.request<Res.CommonRes>({
        url: `/answer/${id}`
    })
}