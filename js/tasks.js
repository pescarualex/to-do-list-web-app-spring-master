

window.ToDoList = {

    API_URL: "http://localhost:8089/tasks",

    createTask: function () {

        const titleValue = $('.task-title-field').val();
        const descriptionValue = $('#task-description').val();
        const deadlineValue = $("#task-deadline").val();

        let body = {
            title: titleValue,
            description: descriptionValue,
            deadline: deadlineValue
        };

        $.ajax({
            url: ToDoList.API_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(body)

        }).done(function (){
            ToDoList.getTasks();
        });
    },

    getTasks: function () {
        $.ajax({
            url: ToDoList.API_URL,
            method: "GET",
        }).done(function (response) {
            ToDoList.displayTasks(response);
        });
    },


    
    getTask: function(id) {
        $.ajax({
            url: ToDoList.API_URL + "/dialog/" + id,
            method: "GET"
        }).done(function(response) {
            ToDoList.displayedClikedTask(response);
        });
    },
    

    updateTask: function (id, done) {
        let body = {
            "done": done
        };

        $.ajax({
            url:ToDoList.API_URL + '/' + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(body)
        }).done(function(){
                ToDoList.getTasks();
        })
    },

    updateTaskContent: function(id, title, description) {
        let body = {
            "title": title,
            "description": description
        };

        $.ajax({
            url:ToDoList.API_URL + '/dialog/' + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(body)
        }).done(function(){
                ToDoList.getTasks();
                ToDoList.getTask(id)
        })
    },


    deleteTask: function (id) {
        $.ajax({
            url:ToDoList.API_URL + '/' + id,
            method: 'DELETE'
        }).done(function (){
            ToDoList.getTasks();
        })
    },
    

    getClickedTask: function(task) {
        let formatedDeadline = new Date(task.deadline).toLocaleDateString("ro");

        return `
        <span class="close" id="close-expanded-task-dialog" onclick="closeExpandedTaskDialog()">&times;</span>
        <h3>Edit Task</h3>

        <div>
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

            <div class="entirely-task-deadline">
                <p>
                Deadline: ${formatedDeadline}
                </p>
            </div>

            <button id="save-task" class="save-task" data-id="${task.id}" onclick="closeExpandedTaskDialog()">Save Task</button>
        </div>
        `
    },

    displayedClikedTask: function(task) {
        $('#expanded-task-dialog').html(this.getClickedTask(task));
    },


    getTaskRow: function (task) {
        let formatedDeadline = new Date(task.deadline).toLocaleDateString("ro");
        let checkedAtribute = task.done ? "checked" : "";

        return `
            <div class="task-card" id="task-card-id">
                <div class="tasks-countainer">

                    <div class="task-title">
                        <h4>
                            ${task.title}
                        </h4>
                    </div>

                    <div class="task-description">
                        <p>
                            ${task.description}
                        </p>
                    </div>

                    <div class="task-deadline">
                        <p>
                            Deadline: ${formatedDeadline}
                        </p>
                    </div>

                    <div class="task-options">
                        <div>
                            <input type="checkbox" class="mark-done" data-id=${task.id} ${checkedAtribute}>
                        </div>

                        <div>
                            <a href="#" class="delete-link" data-id=${task.id}><i class="fas fa-trash-alt"></i></a>
                        </div>

                        <div>
                            <button id="expand-task-icon" data-id="${task.id}" onclick="openEntirelyTask()"> <i class="fa fa-chevron-right" aria-hidden="true"></i></button>
                                
                            <span id="tooltiptext">Click to see all content</span>
                        </div>
                    </div>


                </div>
            </div>
            `
        },
    
    displayTasks: function (tasks) {
        let tasksHtml = '';

        tasks.forEach(task => tasksHtml += ToDoList.getTaskRow(task));

        $('#existing-tasks-fluid').html(tasksHtml);
    },



    bindEvents: function () {
        $('#create-task-form').submit(function (event) {
            event.preventDefault();

            ToDoList.createTask();
        });

        $('#existing-tasks-fluid').delegate('.mark-done', 'change', function (event) {
            event.preventDefault();

            const id = $(this).data('id');
            const checkboxChecked = $(this).is(':checked');

            ToDoList.updateTask(id, checkboxChecked);
        });


        let title = "";
        let description = "";

        $('#expanded-task-dialog').delegate('.save-task', 'click', function (event) {
            event.preventDefault();

            const id = $(this).data('id');
            title = $(".entirely-task-title").val();
            description = $(".entirely-task-description").val();

            const trimedTitle = title.trim();
            const trimedDescription = description.trim();

            ToDoList.updateTaskContent(id, trimedTitle, trimedDescription);
        });



        $('#existing-tasks-fluid').delegate('.delete-link', 'click', function (event) {
            event.preventDefault();

            const id = $(this).data('id');

            ToDoList.deleteTask(id);
        });


        $('#existing-tasks-fluid').delegate('#expand-task-icon', 'click', function (event){
            event.preventDefault;

            const id = $(this).data('id');
            ToDoList.getTask(id);
        });

    }
};



ToDoList.getTasks();
ToDoList.bindEvents();



