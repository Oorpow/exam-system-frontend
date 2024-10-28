declare namespace Dto {
    type UserLoginDto = {
        username: string
        password: string
        email: string
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