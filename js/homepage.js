import { createTask } from "/js/tasks.js";


let API_URL = "http://localhost:8089/homepage";

  $(document).ready(function() {
    $.ajax({
      url: API_URL + "/tasks-number",
      type: 'GET',
      success: function(data) {
        $('.all-tasks-card #tasks-number').text("Total Tasks: " + data);
        //createTask();
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log('Error:', textStatus);
      }
    });
  });

