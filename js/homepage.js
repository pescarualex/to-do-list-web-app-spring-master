import { createTask } from "/js/tasks.js";
// import {  }


let API_URL = "http://localhost:8089/homepage";

// getTotalNumberOfTasks: function() {

// };

$(document).ready(function() {
  $.ajax({
    url: API_URL + "/total-tasks-number",
    type: 'GET',
    success: function(data) {
      $('.all-tasks-card #total-tasks-number').text(data);
      //createTask();
    },
    error: function(xhr, textStatus, errorThrown) {
      console.log('Error:', textStatus);
    }
  });
});



  $.ajax({
    url: API_URL + '/total-task-number/tasks-titles',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      for (let i = 0; i < data.length; i++){
        $(".table-body").append(`
        <span class="title-tr">
          <p>&#8226; ${data[i]}</p>
        </span>
    `);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error('Error:', textStatus, errorThrown);
    }
  });

