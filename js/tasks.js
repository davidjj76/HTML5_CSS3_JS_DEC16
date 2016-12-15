$(document).ready(function() {
    var API_URL = "http://localhost:8000/api/";
    var tasks = [];
    var newTaskInput = $("#newTaskName");
    var tasksContainer = $("#tasksContainer");

    var drawTasks = function() {
        tasksContainer.empty();
        if (tasks.length == 0) {
            tasksContainer.append("<li class='task-item'>No tienes tareas pendientes</li>")
        } else {
            var contentToAdd = "";
            for (var i = 0; i < tasks.length; i++) {
                contentToAdd += "<li class='task-item'>" + tasks[i].name + "<button class='deleteTask' data-taskId='" + tasks[i].id + "'>Eliminar</button></li>";
            }
            tasksContainer.append(contentToAdd);
        }
    };

    var createTask = function(name) {
        var success = function(data) {
            newTaskInput.val("");
            tasks.push(data);
            drawTasks();
        };

        var data = { 'name': name };

        $.ajax({
                type: "POST",
                url: API_URL + "tasks",
                data: data,
                success: success
            })
            .fail(function(error) {
                console.error("Error creando tarea " + error);
            });
    };

    var getTasks = function() {
        var success = function(data) {
            tasks = data;
            drawTasks();
        };

        var error = function(error) {
            console.error("Error cargando tareas", error);
        };

        var complete = function(object, textStatus) {
            console.log(object, textStatus);
            if (textStatus == "error") {
                console.log("Ha habido un error");
            } else {
                console.log("Todo OK");
            }
        }

        $.ajax({
            type: "GET",
            url: API_URL + "tasks",
            success: success,
            error: error,
            complete: complete
        });
    };

    var deleteTask = function(id) {
        var success = function(data) {
            tasks = $.grep(tasks, function(item) {
                return item.id != id;
            });
            drawTasks();
        };

        $.ajax({
                type: "DELETE",
                url: API_URL + "tasks/" + id,
                success: success
            }).
            .fail(function(error) {
                console.error("Error borrando tarea " + error);
            })
            .always(function(object, status, error){
           		// Se ejcuta siempre
            });
    };

    $(document).on("click", ".deleteTask", function() {
        var id = $(this).data("taskid");
        deleteTask(id);
    });

    $("#sendNewTask").on("click", function(event) {
        if (newTaskInput.val() != "") {
            event.preventDefault();
            createTask(newTaskInput.val());
        }
    });

    getTasks();

});
