const WEEKARR = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function calcWeek(time) {
    let y = parseInt(time.split('-')[0])
    let m = parseInt(time.split('-')[1])
    let d = parseInt(time.split('-')[2])

    let w = parseInt((d + 2 * m + 3 * (m + 1) / 5 + y + y / 4 - y / 100 + y / 400) % 7)
    return WEEKARR[w]
}

export const NUMBERTOCHINESE = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
