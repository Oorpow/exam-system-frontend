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

    type UserLoginRes = {
        token: string
    }
}