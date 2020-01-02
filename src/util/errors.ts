import { app } from '../main'

export function networkError(e: any) {
    app.$message({
        message: `网络错误！${e}`,
        type: "error"
    })
}
