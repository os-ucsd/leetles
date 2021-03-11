let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) :[];

const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];

function initCal(){
    let name = prompt('Enter Calendar Name:');
    insertNewCalendar(name).then((res) => {
        document.cookie = `calendarId=${res.result.id}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
    });
}

function getFormValues(formId){
    var formRes = [];
    var form = document.getElementById(formId);
    for(let i = 0; i < form.length - 1; i++){
        formRes[i] = form.elements[i].value;
    }
    return formRes;
}

function createEvent(){
    var formVal = getFormValues('add-event');
    const start = ApiHandler.ISODateString(new Date(formVal[1]));
    const end = ApiHandler.ISODateString(new Date(formVal[2]));
    const calendarId = ApiHandler.getCookie(document.cookie, 'calendarId');

    insertNewEvent(calendarId, formVal[0], start, end);
    document.getElementById('addEvent').style.display = 'none';
}

function getFirstDay(month, year){
    return new Date(year, month, 1);
}

function getDaysInMonth(month, year){
    return new Date(year, month+1, 0).getDate();   
}

function getDateString(date){
    return date.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
}

function getPaddingDays(ds){
    return weekdays.indexOf(ds.split(', ')[0]);
}

function load(){
    const dt = new Date();

    if (nav!=0){
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = getFirstDay(month, year);
    const daysInMonth = getDaysInMonth(month, year);

    const dateString = getDateString(firstDayOfMonth);

    const paddingDays = getPaddingDays(dateString);
    
    let header = document.getElementById('monthDisplay');
    header.innerText = `${dt.toLocaleDateString('en-us', {month:'long'})} ${year}`;
    header.setAttribute('data-monthId', month);
    header.setAttribute('data-yearId', year);

    calendar.innerHTML = '';

    for(let i = 1; i <= paddingDays + daysInMonth; i++){
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
        
        if (i > paddingDays){
            daySquare.setAttribute('data-dayID', i - paddingDays);
            daySquare.innerText = i - paddingDays;

            if(i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }
        }else{
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

async function updateCalendar(){
    var month = Number(document.getElementById('monthDisplay').attributes[1].value);
    var year = document.getElementById('monthDisplay').attributes['data-yearId'].value;
    console.log(month + "     " + year);

    var firstDay = getFirstDay(month, year);
    var paddingDays = getPaddingDays(getDateString(firstDay));

    var calId = ApiHandler.getCookie(document.cookie, 'calendarId');
    // asyncronicity of getEventsFromDay is the problem
    for(let i = 1; i <= getDaysInMonth(month, year); i++){
        var dayDiv = ApiHandler.getDayDiv(i, paddingDays);
        await getEventsFromDay(calId, i, month, year).then((res) => {
            console.log(i);
            console.log(res);
            var events = res.result.items;
            if(events.length == 0){
                ApiHandler.appendText(dayDiv, "None!");
            }else{
                for(let j = 0; j < res.result.items.length; j++){
                    ApiHandler.appendText(dayDiv, `\n${events[j].summary}\n`);
                }
            }
        });
    }
    console.log('finished?');
}

function initButtons(){
    document.getElementById("front-btn").addEventListener('click', ()=>{
        nav++;
        load();
        // updateCalendar();
    });

    document.getElementById("back-btn").addEventListener('click', ()=>{
        nav--;
        load();
        // updateCalendar();
    });
}

document.getElementById('ins-cal').setAttribute('onclick', "initCal();");
document.getElementById('update').setAttribute('onclick', "updateCalendar();");
document.getElementById('submitEvent').addEventListener('click', (e) => {e.preventDefault(); createEvent();});

initButtons();
load();

