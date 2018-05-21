export function getFormattedDate() {
    let date = new Date();
    let stringedDate = {
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dayOfTheWeek() {
            return this.days[date.getDay()];
        },
        monthName() {
            return this.months[date.getMonth()];
        },
    }
    return `<strong>${stringedDate.dayOfTheWeek()}</strong>, ${stringedDate.monthName()} ${date.getDate()}, ${date.getFullYear()}`
}