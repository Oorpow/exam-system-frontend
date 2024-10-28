import { examReq } from "../utils/request"

export const findExamList = () => {
    return examReq.request<Res.CommonRes<Res.ExamItem[]>>({
        url: `/exam/list`,
    })
}

export const createExam = (data: Dto.CreateExamDto) => {
    return examReq.request<Res.CommonRes>({
        url: '/exam',
        method: 'POST',
        data
    })
}