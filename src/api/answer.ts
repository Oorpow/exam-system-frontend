import { answerReq } from "@/utils/request"

export const addAnswer = (data: Dto.CreateAnswerDto) => {
    return answerReq.request({
        url: '/answer',
        method: 'POST',
        data
    })
}