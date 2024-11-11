declare namespace Dto {
    type UserLoginDto = {
        username: string
        password: string
        email: string
    }

    type CreateExamDto = {
        name: string
    }

    type PublishOrNotExamDto = {
        id: number
        isPublish: boolean
    }

    type RemoveExamDto = {
        id: number
    }

    type SaveExamDto = {
        id: number
        content: string
    }
}

declare namespace Res {
    type CommonRes<T = any> = {
        code: number
        msg: string
        data: T
    }

    type DateFields = {
        createTime: string
        updateTime: string
    }

    type UserLoginRes = {
        token: string
    }

    type ExamItem = {
        id: number
        name: string
        isPublish: boolean
        isDelete: boolean
        content: string
        createUserId: number
    } & DateFields
}