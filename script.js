// SVG Link
const SVG_LINK = "http://www.w3.org/2000/svg";
// Get info for this moment
const CURRENT = moment();
// Schedule length
const WORK_HOURS = 9;
// Start Schedule at 9:00
const START_AT = 9;

// Size for all columns
const HOUR_COL_SIZE = 2;
const CONTENT_COL_SIZE = 9;
const BTN_COL_SIZE = 1;

const svgIcons = {
    // Found in: https://icons.getbootstrap.com/icons/calendar-plus/
    "calendar-plus": {
        properties: {
            "width": "1em",
            "height": "1em",
            "viewBox": "0 0 16 16",
            "class": "bi bi-calendar-plus",
            "fill": "currentColor",
            "xmlns": SVG_LINK
        },
        paths: [
            "M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z",
            "M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"
        ]
    }
}

const initSchedule = () => {
    return ["", "", "", "", "", "", "", "", ""];
}

const createIcon = (iconType) => {
    const svg = document.createElementNS(SVG_LINK, "svg");

    const {properties, paths} = svgIcons[iconType];

    // Add all SVG properties
    const keys = Object.keys(properties);
    keys.forEach((key)=> {
        svg.setAttribute(key, properties[key])
    })

    // Add all paths
    paths.forEach((path) => {
        const p = document.createElementNS(SVG_LINK, "path");
        p.setAttribute("fill-rule", "evenodd");
        p.setAttribute("d", path);
        svg.append(p);
    })
    
    return svg;
}

const createCol = (size, style) => {
    const col = document.createElement("div");
    col.classList.add(`col-${size}`);
    col.classList.add(style);
    return col;
}

const createHourCol = (hour) => {
    const col = createCol(HOUR_COL_SIZE, "hour");
    col.classList.add("text-right");
    col.textContent = hour === 12 ? `12 PM` : hour < 12 ? `${hour} AM` : `${hour-12} PM`;
    return col;
}

const createContentCol = (content, currentHour, hour) => {
    const col = createCol(CONTENT_COL_SIZE, "textarea");
    col.classList.add("content");

    if (currentHour === hour)
        col.classList.add("present");
    else if (currentHour < hour)
        col.classList.add("future");
    else
        col.classList.add("past");

    col.textContent = content;
    return col;
}

const createBtnCol = (hour) => {
    const col = createCol(BTN_COL_SIZE, "saveBtn");
    col.classList.add("d-flex", "justify-content-center");

    const icon = createIcon("calendar-plus");
    icon.classList.add("m-auto");
    icon.addEventListener("click", (event) => {
        console.log("HI");
    });
    
    col.append(icon);
    
    return col;
}

const createRow = (currentHour, hour, content) => {
    // Add three col for the row
    const hourCol = createHourCol(hour);
    const contentCol = createContentCol(content, currentHour, hour);
    const btnCol = createBtnCol(hour);

    // Create the current row
    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("time-block");
    
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