$(document).ready(function () {
  $("body").tooltip({ selector: "[data-toggle=tooltip]" });
});

window.ToDoList = {
  API_URL: "http://localhost:8089/tasks",

  // Creaza un obiect XMLHttpRequest

  createTask: function () {
    const titleValue = $(".task-title-field").val();
    const descriptionValue = $("#task-description").val();
    const deadlineValue = $("#task-deadline").val();

    let body = {
      title: titleValue,
      description: descriptionValue,
      deadline: deadlineValue,
    };

    $.ajax({
      url: ToDoList.API_URL,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(body),
    }).done(function () {
      ToDoList.displayPage(0);
      window.location.reload();
    });
  },

  displayPage: async function (page, title = "") {
    let currentPage = 0;
    let pageSize = 20;

    try {
      const requestData = {
        page: page,
        size: pageSize,
        title: title,
      };

      const response = await $.ajax({
        url: ToDoList.API_URL + "/any/",
        method: "GET",
        dataType: "json",
        data: requestData,
      });

      // + "?page=" + page + "&size=" + pageSize + "&searchTitle=" + searchTitle

      $("#all-content #existing-tasks-fluid").empty();
      $.each(response.content, function (index, task) {
        $("#existing-tasks-fluid").append(ToDoList.getTaskRow(task));
      });

      // afișează butoanele de paginare
      var totalPages = response.totalPages;
      $("#pagination-marks").empty();
      for (let i = 0; i < totalPages; i++) {
        const pageIndex = i + 1;
        $("#pagination-marks").append(`
                    <a href="#" class="_1" id="page-btn" data-page-index='${pageIndex}'>${pageIndex}</a>
                `);
      }
    } catch (error) {
      console.log(error);
    }
  },

  displayThisDayTasks: async function (page, title = "") {
    let currentPage = 0;
    let pageSize = 20;

    try {
      const requestData = {
        page: page,
        size: pageSize,
        title: title,
      };

      const response = await $.ajax({
        url: ToDoList.API_URL + "/this-day-tasks/",
        method: "GET",
        dataType: "json",
        data: requestData,
      });

      $("#this-day-tasks-content #all-tasks-this-day").empty();
      $.each(response.content, function (index, task) {
        $("#all-tasks-this-day").append(ToDoList.getTaskRow(task));
      });

      // afișează butoanele de paginare
      var totalPages = response.totalPages;
      $("#this-day-pag-num").empty();
      for (let i = 0; i < totalPages; i++) {
        const pageIndex = i + 1;
        $("#this-day-pag-num").append(`
                    <a href="#" class="_1" id="page-btn" data-page-index='${pageIndex}'>${pageIndex}</a>
                `);
      }
    } catch (error) {
      console.log(error);
    }
  },

  displayOverdueTasks: async function (page, title = "") {
    let currentPage = 0;
    let pageSize = 20;

    try {
      const requestData = {
        page: page,
        size: pageSize,
        title: title,
      };

      const response = await $.ajax({
        url: ToDoList.API_URL + "/overdue-tasks/",
        method: "GET",
        dataType: "json",
        data: requestData,
      });

      $("#overdue-content #overdue-tasks").empty();
      $.each(response.content, function (index, task) {
        $("#overdue-tasks").append(ToDoList.getTaskRow(task));
      });

      // afișează butoanele de paginare
      var totalPages = response.totalPages;
      $("#this-day-pag-num").empty();
      for (let i = 0; i < totalPages; i++) {
        const pageIndex = i + 1;
        $("#this-day-pag-num").append(`
                    <a href="#" class="_1" id="page-btn" data-page-index='${pageIndex}'>${pageIndex}</a>
                `);
      }
    } catch (error) {
      console.log(error);
    }
  },

  getTask: function (id) {
    $.ajax({
      url: ToDoList.API_URL + "/dialog/" + id,
      method: "GET",
    }).done(function (response) {
      ToDoList.displayedClikedTask(response);
    });
  },

  updateTask: function (id, done) {
    let body = {
      done: done,
    };

    $.ajax({
      url: ToDoList.API_URL + "/" + id,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(body),
    }).done(function () {
      ToDoList.displayPage(0);
    });
  },

  updateTaskContent: function (id, title, description) {
    let body = {
      title: title,
      description: description,
    };

    $.ajax({
      url: ToDoList.API_URL + "/dialog/" + id,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(body),
    }).done(function () {
      ToDoList.displayPage(0);
      window.location.reload();
    });
  },

  deleteTask: function (id) {
    $.ajax({
      url: ToDoList.API_URL + "/" + id,
      method: "DELETE",
    }).done(function () {
      ToDoList.displayPage(0);
      window.location.reload();
    });
  },

  getClickedTask: function (task) {
    let formatedDeadline = new Date(task.deadline).toLocaleDateString("ro");

    return `

            <div class="modal-content" id="task-modal-content">
                        <!-- Modal Header -->
                    <div class="modal-header">
                        <h3>Edit Task</h3>
                        <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="entirely-task-title-countainer">
                            <label for="title-characters">Title:</label>
                            <textarea class="entirely-task-title" id="title-characters" onkeyup="titleLengthCheck()" onkeydown="titleLengthCheck()" onclick="titleLengthCheck()" maxlength="250">${task.title}</textarea>
                            <span id="remainingCharactTitle"></span>
                        </div>

                        <div class="entirely-task-description-countainer">
                            <label for="description-characters">Description:</label>
                            <textarea class="entirely-task-description" id="description-characters" onkeyup="descriptionLengthCheck()" onkeydown="descriptionLengthCheck()" onclick="descriptionLengthCheck()" maxlength="2000">${task.description}</textarea>
                            <span id="remainingCharactDescription"></span>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <div class="entirely-task-deadline">
                            <p>
                            Deadline: ${formatedDeadline}
                            </p>
                        </div>

                        <button type="button" id="save-task" class="btn btn-secondary save-task" data-id="${task.id}" data-bs-dismiss="modal">Save Task</button>
                    </div>
                </div>
        `;
  },

  displayedClikedTask: function (task) {
    $(".tasks-content #expanded-task-dialog #expand-task .modal-dialog").html(
      ToDoList.getClickedTask(task),
    );
  },

  getTaskRow: function (task) {
    let formatedDeadline = new Date(task.deadline).toLocaleDateString("ro");
    let checkedAtribute = task.done ? "checked" : "";

    return `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title card-header">${task.title}</h5>
                <p class="card-text card-description">${task.description}</p>

            <div class="card-deadline">
                <p class="card-text">
                    Deadline: ${formatedDeadline}
                </p>
            </div>

            <div class="task-options">
                <div>
                    <input type="checkbox" class="mark-done" data-id=${task.id} ${checkedAtribute}
                            data-toggle="tooltip" data-placement="top" title="Mark Done?">
                </div>

                <div>
                    <a href="#" class="delete-link" data-id=${task.id} data-toggle="tooltip" data-placement="top" title="Delete"><i class="fas fa-trash-alt"></i></a>
                </div>

                <div>
                    <button id="expand-task-icon" data-id="${task.id}" aria-hidden="true" data-bs-toggle="modal" data-bs-target="#expand-task" data-toggle="tooltip" data-placement="top" title="Click to see all content" data-delay: { "show": 500, "hide": 100 }>
                    <i class="fa fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            </div>


        </div>
            `;
  },

  bindEvents: function () {
    $(".modal-content").delegate("#create", "click", function (event) {
      event.preventDefault();
      ToDoList.createTask();
    });

    $("#existing-tasks-fluid").delegate(
      ".mark-done",
      "change",
      function (event) {
        event.preventDefault();

        const id = $(this).data("id");
        const checkboxChecked = $(this).is(":checked");

        ToDoList.updateTask(id, checkboxChecked);
      },
    );

    $("#overdue-tasks").delegate(".mark-done", "change", function (event) {
      event.preventDefault();

      const id = $(this).data("id");
      const checkboxChecked = $(this).is(":checked");

      ToDoList.updateTask(id, checkboxChecked);
    });

    $("#all-tasks-this-day").delegate(".mark-done", "change", function (event) {
      event.preventDefault();

      const id = $(this).data("id");
      const checkboxChecked = $(this).is(":checked");

      ToDoList.updateTask(id, checkboxChecked);
    });

    let title = "";
    let description = "";

    $("#expanded-task-dialog").delegate(
      ".save-task",
      "click",
      function (event) {
        event.preventDefault();

        const id = $(this).data("id");
        title = $(".entirely-task-title").val();
        description = $(".entirely-task-description").val();

        const trimedTitle = title.trim();
        const trimedDescription = description.trim();

        ToDoList.updateTaskContent(id, trimedTitle, trimedDescription);
      },
    );

    $("#existing-tasks-fluid").delegate(
      ".delete-link",
      "click",
      function (event) {
        event.preventDefault();

        const id = $(this).data("id");
        ToDoList.deleteTask(id);
      },
    );

    $("#all-tasks-this-day").delegate(
      ".delete-link",
      "click",
      function (event) {
        event.preventDefault();

        const id = $(this).data("id");
        ToDoList.deleteTask(id);
      },
    );

    $("#overdue-tasks").delegate(".delete-link", "click", function (event) {
      event.preventDefault();

      const id = $(this).data("id");
      ToDoList.deleteTask(id);
    });

    $("#existing-tasks-fluid").delegate(
      "#expand-task-icon",
      "click",
      function (event) {
        event.preventDefault;

        const id = $(this).data("id");
        ToDoList.getTask(id);
      },
    );

    $("#all-tasks-this-day").delegate(
      "#expand-task-icon",
      "click",
      function (event) {
        event.preventDefault;

        const id = $(this).data("id");
        ToDoList.getTask(id);
      },
    );

    $("#overdue-tasks").delegate(
      "#expand-task-icon",
      "click",
      function (event) {
        event.preventDefault;

        const id = $(this).data("id");
        ToDoList.getTask(id);
      },
    );

    //move pages
    // $("#pagination").on("click", "#page-btn", function() {
    //     let page = $(this).index();
    //     let currentPage = page;
    //     ToDoList.displayPage(currentPage);
    // });

    $("#search-all-tasks").on("input", function () {
      // Obține valoarea introdusă în input-ul de căutare
      const searchKeyword = $(this).val();

      // Verifică dacă input-ul este gol
      if (searchKeyword.trim() === "") {
        // Dacă input-ul este gol, efectuează o căutare automată
        ToDoList.displayPage(0, "");
      }
    });

    $("#search-all-tasks").on("input", function () {
      const searchKeyword = $(this).val();

      ToDoList.displayPage(0, searchKeyword);
    });

    $("#search-overdue-tasks").on("input", function () {
      // Obține valoarea introdusă în input-ul de căutare
      const searchKeyword = $(this).val();

      // Verifică dacă input-ul este gol
      if (searchKeyword.trim() === "") {
        // Dacă input-ul este gol, efectuează o căutare automată
        ToDoList.displayOverdueTasks(0, "");
      }
    });

    $("#search-overdue-tasks").on("input", function () {
      const searchKeyword = $(this).val();

      ToDoList.displayOverdueTasks(0, searchKeyword);
    });

    $("#search-this-day-tasks").on("input", function () {
      // Obține valoarea introdusă în input-ul de căutare
      const searchKeyword = $(this).val();

      // Verifică dacă input-ul este gol
      if (searchKeyword.trim() === "") {
        // Dacă input-ul este gol, efectuează o căutare automată
        ToDoList.displayThisDayTasks(0, "");
      }
    });

    $("#search-this-day-tasks").on("input", function () {
      const searchKeyword = $(this).val();

      ToDoList.displayThisDayTasks(0, searchKeyword);
    });
  },
};

export function createTask() {
  ToDoList.createTask();
}

ToDoList.displayPage(0, "");
ToDoList.displayThisDayTasks(0);
ToDoList.displayOverdueTasks(0);
ToDoList.bindEvents();
