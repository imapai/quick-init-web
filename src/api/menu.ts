// 发送验证码
import request from "../http"

export function menuPage(menuQuery: any) {
    return request({
        url: 'menus/p',
        method: 'post',
        data: menuQuery
    })
}