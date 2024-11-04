import { examReq } from "@/utils/request"

export const findExamList = (bin = false) => {
    return examReq.request<Res.CommonRes<Res.ExamItem[]>>({
        url: `/exam/list?bin=${bin}`,
    })
}

export const createExam = (data: Dto.CreateExamDto) => {
    return examReq.request<Res.CommonRes>({
        url: '/exam',
        method: 'POST',
        data
    })
}

/**
 * 修改exam的publish状态
 * @param data 
 * @returns 
 */
export const publishExamOrNot = (data: Dto.PublishOrNotExamDto) => {
    return examReq.request({
        url: '/exam/publishOrNot',
        method: 'POST',
        data
    })
}

export const deleteExam = (data: Dto.RemoveExamDto) => {
    return examReq.request({
        url: `/exam/${data.id}`,
        method: 'DELETE'
    })
}