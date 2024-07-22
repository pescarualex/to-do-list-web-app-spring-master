import { createTask } from "/js/tasks.js";

let API_URL = "http://localhost:8089/homepage";

//get all tasks number from API
$(document).ready(function () {
  $.ajax({
    url: API_URL + "/total-all-tasks-number",
    type: "GET",
    success: function (data) {
      $(".all-tasks-card #all-tasks-number").text(data);
      //createTask();
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("Error:", textStatus);
    },
  });
});

// get tasks title
$.ajax({
  url: API_URL + "/total-task-number/all-tasks-titles",
  method: "GET",
  dataType: "json",
  success: function (data) {
    for (let i = 0; i < data.length; i++) {
      $("#all-tasks-content").append(`
        <span class="title-tr">
          <p>&#8226; ${data[i]}</p>
        </span>
    `);
    }
  },
  error: function (jqXHR, textStatus, errorThrown) {
    console.error("Error:", textStatus, errorThrown);
  },
});

// get tasks number for this day
$(document).ready(function () {
  $.ajax({
    url: API_URL + "/total-this-day-tasks-number",
    type: "GET",
    success: function (data) {
      $(".all-tasks-card #nr-task-for-this-day").text(data);
      //createTask();
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("Error:", textStatus);
    },
  });
});

// get tasks title for this day
$.ajax({
  url: API_URL + "/total-task-number/this-day-tasks-titles",
  method: "GET",
  dataType: "json",
  success: function (data) {
    for (let i = 0; i < data.length; i++) {
      $("#task-for-this-day").append(`
        <span class="title-tr">
          <p>&#8226; ${data[i]}</p>
        </span>
    `);
    }
  },
  error: function (jqXHR, textStatus, errorThrown) {
    console.error("Error:", textStatus, errorThrown);
  },
});

//get overduew tasks number
$(document).ready(function () {
  $.ajax({
    url: API_URL + "/overdue-tasks-number",
    type: "GET",
    success: function (data) {
      $(".all-tasks-card .overdue-tasks").text(data);
      //createTask();
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("Error:", textStatus);
    },
  });
});

//get overduew tasks title
$.ajax({
  url: API_URL + "/overdue-tasks-number/tasks-title",
  method: "GET",
  dataType: "json",
  success: function (data) {
    for (let i = 0; i < data.length; i++) {
      $("#overdue-tasks-title").append(`
          <span class="title-tr">
            <p>&#8226; ${data[i]}</p>
          </span>
      `);
    }
  },
  error: function (jqXHR, textStatus, errorThrown) {
    console.error("Error:", textStatus, errorThrown);
  },
});
