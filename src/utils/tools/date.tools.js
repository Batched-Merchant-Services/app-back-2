


export function getFirstDayYear(dateIn) {
    return new Date(dateIn.getFullYear(), 1, 1);
}
export function getFirstDayYearhNow() {
    return getFirstDayYear(new Date());
}


export function getLastDayMonth(dateIn) {
    let date = new Date(dateIn);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    return new Date(date.setDate(lastDay));
}
export function getLastDayMonthNow() {
    return getLastDayMonth(new Date());
}