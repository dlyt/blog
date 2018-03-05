const format = (date, type) => {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    if (type === 1) {
        return year + '.' + month + '.' + day;
    } else if (type === 2) {
        return year + '-' + month + '-' + day;
    }
}

const getWeek = (date) => {
    const mydate = new Date(format(date, 2)); 
    const myday = mydate.getDay();
    let day;
    switch (myday) {
        case 0:
            day = "星期日";
            break;
        case 1:
            day = "星期一";
            break;
        case 2:
            day = "星期二";
            break;
        case 3:
            day = "星期三";
            break;
        case 4:
            day = "星期四";
            break;
        case 5:
            day = "星期五";
            break;
        case 6:
            day = "星期六";
            break;
        default:
            break;
    }
    
}
console.log(getWeek('20180102')) 