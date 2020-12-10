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
const TEXT_COL_SIZE = 9;
const BTN_COL_SIZE = 1;

const svgIcons = {
    // SVG Icon found in Bootstrap: https://icons.getbootstrap.com/icons/calendar-plus/
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

const initSchedule = () => new Array(9).fill("");

const createIcon = (iconType) => {
    const svg = document.createElementNS(SVG_LINK, "svg");
    const {properties, paths} = svgIcons[iconType];

    // Add all SVG properties
    const attrs = Object.keys(properties);
    attrs.forEach((attr) => {
        svg.setAttribute(attr, properties[attr])
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

const createHourCol = (hour) => {
    const col = document.createElement("div");
    col.classList.add(`col-${HOUR_COL_SIZE}`, "hour", "text-right");
    col.textContent = hour === 12 ? `12 PM` : hour < 12 ? `${hour} AM` : `${hour-12} PM`;
    return col;
}

const createTextCol = (currentHour, hour, content="") => {
    const col = document.createElement("textarea");
    col.classList.add(`col-${TEXT_COL_SIZE}`, "text");

    // Class for color of textarea 
    col.classList.add(currentHour === hour ? "present" : currentHour < hour ? "future" : "past");    

    // Id for referencing textarea input
    col.id = `text-${hour}`;
    col.textContent = content;
    return col;
}

const createBtnCol = (hour, setSchedule) => {
    const col = document.createElement("div");
    col.classList.add(`col-${BTN_COL_SIZE}`, "saveBtn", "d-flex", "justify-content-center");

    // Create icon. Serves as button for saving schedule
    const icon = createIcon("calendar-plus");
    icon.classList.add("m-auto");
    icon.addEventListener("click", (event) => {
        setSchedule(document.getElementById(`text-${hour}`).value);
    });
    
    col.append(icon);
    return col;
}

const createRow = (currentHour, hour, content, setSchedule) => {
    // Add three col for the row
    const hourCol = createHourCol(hour);
    const textCol = createTextCol(currentHour, hour, content);
    const btnCol = createBtnCol(hour, setSchedule);

    // Create the current row
    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("time-block");
    
    row.append(hourCol, textCol, btnCol);  
    return row;
}

(() => {
    // Initialize current day
    const initCurrentDay = () => {
        const currentDay = document.getElementById("currentDay");
        currentDay.textContent = CURRENT.format("dddd, MMMM Do");
        currentDay.classList.add("time-block");
    }

    // Setter and Getter for schedule
    const getSchedule = () => {
        // Get schedule from local storage
        const scheduleInStr = localStorage.getItem("schedule");
        // Make schedule into array
        return scheduleInStr ? scheduleInStr.split(",") : initSchedule();
    } 
    const setSchedule = (schedule, i, entry) => {
        schedule[i] = entry;
        localStorage.setItem("schedule", schedule.toString());   
    }

    // Load Schedule
    const loadSchedule = () => {
        const container = document.querySelector(".container");
        const currentHour = parseInt(CURRENT.toObject().hours);
        const schedule = getSchedule();

        schedule.forEach((content, i) => {
            const row = createRow(currentHour, i + START_AT, content, entry => setSchedule(schedule, i, entry));
            container.append(row);       
        }) 
    }
    initCurrentDay();
    loadSchedule();
})();