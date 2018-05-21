import "./script.js";

// DATE FUNCTION
export const getFormattedDate= () => {
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
};

//TOGGLE PRELOADER
export const togglePreloader = () => {
    if (elements.preloaderContainer.classList != "") {
        elements.preloaderContainer.classList = "";
    } else {
        elements.preloaderContainer.classList = "content-hidden"
    }
};

// ADD ANIMATION
export const animate = (element, className, animationTime) => {
    element.className = className;
    setTimeout(function () {
        element.className = "";
    }, animationTime)
};

// SWITCH CONTENT
export function switchContent() {
    let direction, opposite;
    if (arguments[0] == "right") {
        direction = "Right";
        opposite = "Left";
    } else {
        direction = "Left";
        opposite = "Right";
    }

    if (!elements.overviewSection.classList.contains("content-hidden")) {
        elements.overviewSection.className = `bounceOut${opposite}`;
        setTimeout(function () {
            elements.overviewSection.className = "content-hidden";
            elements.detailsSection.className = `bounceIn${direction}`;
        }, 200);
    } else {
        elements.detailsSection.className = `bounceOut${opposite}`;
        setTimeout(function () {
            elements.detailsSection.className = "content-hidden";
            elements.overviewSection.className = `bounceIn${direction}`;
        }, 200);
    }
};
export const switchTitle = () => {
    elements.navTitle.classList.toggle("switchIn");
    setTimeout(function () {
        elements.navTitle.innerHTML == "Overview" ? elements.navTitle.innerHTML = "Details" : elements.navTitle.innerHTML = "Overview";
        elements.navTitle.classList.toggle("switchIn");
    }, 200);
};