// 发送验证码
import request from "../http"

function menuPage(menuQuery: any) {
    return request({
        url: 'menus/p',
        method: 'post',
        data: menuQuery
    })
}

function getMenuById(id: string) {
    return request({
        url: "menus/" + id,
        method: "get"
    })
}

function createMenu(menu: any) {
    return request({
        method: "post",
        url: "menus",
        data: menu
    })
}

function delMenu(id: string) {
    return request({
        method: "delete",
        url: "menus/" + id
    })
}

function updateMenu(menu: any) {
    return request({
        method: "put",
        url: "menus",
        data: menu
    })
}

export {menuPage, getMenuById, createMenu, delMenu, updateMenu}