let calendarShow = 1;

function settingDate(date, day) {
   date = new Date(date);
   date.setDate(day);
   date.setHours(23);
   return date;

}

function getDatesBetween(date1 , date2) {
   let range1 = new Date(date1);
   let range2 = new Date(date2); 
   date1 = settingDate(date1, 31);
   date2 = settingDate(date2, 31);
   let temp;
   let dates = []
   while (date1 <= date2) {
      if (date1.getDate() !=31) {
         temp = settingDate(date1 , 0);
         if(temp >= range1 && temp<= range2) dates.push(temp);
         date1 = settingDate(date1, 31);

      } else {
         temp = new Date(date1);
         if (temp >= range1 && temp <= range2) dates.push(temp);
         date1.setMonth(date1.getMonth() + 1);
      }
   }
   
   let content = "<div class='calBtns'><button id='calPrev' class='prevBtn bg-gray-200 text-black font-medium rounded-sm p-0.5 w-16 my-8 shadow-md' onclick='callprev()' disabled>Prev</button> | <button id='calNext' class='nextBtn bg-gray-200 text-black font-medium rounded-sm p-0.5 w-16 my-8 shadow-md' onclick='callnext()'>Next</button></div>";
   let weekDays = [{shortDay: "Mon", fullDay: "Monday"}, 
   {shortDay: "Tue", fullDay: "Tuesday"}, 
   {shortDay: "Wed", fullDay: "Wednesday"}, 
   {shortDay: "Thu", fullDay: "Thursday"}, 
   {shortDay: "Fri", fullDay: "Friday"},
   {shortDay: "Sat", fullDay: "Saturday"},
   {shortDay: "Sun", fullDay: "Sunday"}
];
let lastDate, firstDate;
   for (let i = 0; i < dates.length; i++) {
      lastDate = dates [i];
      firstDate = new Date(dates [i].getFullYear(), dates[i].getMonth(), 1); 
      content += "<div id='calendarTable_"+ (i+1)+"' class='calendarDiv'>";
      content += "<h2>"+firstDate.toString().split(" ")[1]+"-"+firstDate.getFullYear()+"</h2>";
      
      content += "<table class='calendarTable'>";
      content += "<thead>";
      weekDays.map(item => {
         content += "<th>"+item.fullDay+"</th>";
      })
      content += "</thead>";
      content += "<tbody>";
         let j = 1;
         let displayNum, idMonth;
         while (j <= lastDate.getDate()) {
            content += "<tr>";
               for (let k = 0; k < 7; k++) {
                  displayNum = j < 10 ? "0" + j : j;
                  if (j == 1) {
                     if(firstDate.toString().split(" ")[0] == weekDays[k].shortDay) {
                           content += "<td>" + displayNum + "</td>";
                           j++;
                     } else {
                        content += "<td></td>";
                     }
                  } else if (j > lastDate.getDate()){
                     content += "<td></td>";
                  } else {
                     content += "<td>" + displayNum + "</td>";
                     j++;
                  } 
               }
            content += "</tr>";
         }
      content += "</tbody>";
      content += "</table>";
      content += "</div>";
   }
   return content;
}

function callprev() {
   let alltable = document.getElementsByClassName('calendarDiv');
   document.getElementById('calNext').disabled = false;
   calendarShow--;
   if (calendarShow >= 1) {
      for (let i=0; i < alltable.length; i++) {
         alltable[i].style.display="none";
      }
      document.getElementById('calendarTable_' + calendarShow).style.display = "block";
   
      if (calendarShow == 1) {
         document.getElementById('calPrev').disabled = true;
      }
   }

}

function callnext() {
   let alltable = document.getElementsByClassName('calendarDiv');
   document.getElementById('calPrev').disabled = false;
   calendarShow++;
   if (calendarShow <= alltable.length) {
      for (let i=0; i < alltable.length; i++) {
         alltable[i].style.display="none";
      }
      document.getElementById('calendarTable_' + calendarShow).style.display = "block";
   
      if (calendarShow == alltable.length) {
         document.getElementById('calNext').disabled = true;
      }
   }
}


let content = getDatesBetween("2021/02/01" , "2022/02/01");
document.getElementById("calendar").innerHTML = content; 


