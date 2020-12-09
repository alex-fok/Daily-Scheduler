// Get info for this moment
const CURRENT = moment();
// Schedule length
const WORK_HOURS = 9;
// Start Schedule at 9:00
const START_AT = 9;

// Size for all columns
const HOUR_COL_SIZE = 2;
const CONTENT_COL_SIZE = 8;
const BTN_COL_SIZE = 2;

const initSchedule = () => {
    return ["", "", "", "", "", "", "", "", ""];
};

const createCol = (size, style) => {
}

const createHourCol = (hour) => {
}

const createContentCol = (content, currentHour, hour) => {

}

const createBtnCol = (hour) => {

}

const createRow = (currentHour, hour, content) => {
    // Add three col for the row
    const hourCol = createHourCol(hour);
    const contentCol = createContentCol(content, currentHour, hour);
    const btnCol = createBtnCol(hour);

    // Create the current row
    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("jumbotron");
    
    row.id = hour;
    row.append(hourCol, contentCol, btnCol);  
    
    return row;
}

(() => {
    // initialize current day
    const currentDay = document.getElementById("currentDay");
    currentDay.textContent = CURRENT.format("dddd, MMMM Do");
    currentDay.classList.add("time-block");

    // Get schedule from local storage
    const scheduleInStr = localStorage.getItem("schedule");
    // Make schedule into array
    let schedule = scheduleInStr ? scheduleInStr.split() : initSchedule();

    const container = document.getElementsByClassName("container")[0];
   
    currentHour = parseInt(CURRENT.toObject().hours);
    schedule.forEach((content, i) => {
        const hour = i + START_AT;
        const row = createRow(currentHour, hour, content);
        container.append(row);       
    })
})();