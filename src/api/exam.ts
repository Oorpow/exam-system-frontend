import { examReq } from "../utils/request"

export const findExamList = () => {
    return examReq.request<Res.CommonRes<Res.ExamItem[]>>({
        url: `/exam/list`,
    })
}