let CURRENT = moment();
let WORK_HOURS = 9;

initSchedule = () => Array(9);

(() => {
    // initialize current day
    let today = CURRENT.format("dddd, MMMM Do");
    document.getElementById("currentDay").textContent = today;

})();