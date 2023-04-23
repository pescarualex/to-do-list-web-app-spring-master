(function() {    
    var dialog = document.getElementById('create-task-dialog');    
    document.getElementById('show-create-task-dialog').onclick = function() {    
        dialog.show();    
    };    
    document.getElementById('close').onclick = function() {    
        dialog.close();    
    };
    document.getElementById('create').onclick = function() {    
        dialog.close();    
    };
})();   


let currentDate = new Date().toJSON().slice(0, 10);
const dateControl = document.querySelector('input[type="date"]');
dateControl.value = currentDate;


function openEntirelyTask() {
    const dialog = document.getElementById('expanded-task-dialog'); 
    dialog.show();
}

function closeExpandedTaskDialog() {
    const dialog = document.getElementById('expanded-task-dialog'); 
        dialog.close();
        window.history.pushState({}, document.title, window.location.pathname);
}


// Count characters in Create a new Task dialog
function countCharactersTitle() {
    var count = document.getElementById("countCharactersTitle");

    let title = document.getElementById("title-c");
    var titleText = title.value;
    var titleLength = titleText.length;

    count.innerHTML = "Characters left: " + (250 - titleLength);
  }

  function countCharactersDescription() {
    var count = document.getElementById("countCharactersDescription");

    var descriptionC = document.getElementById("task-description");
    var descriptioneTextC = descriptionC.value;
    var descriptionLengthC = descriptioneTextC.length;

    count.innerHTML = "Characters left: " + (2000 - descriptionLengthC);
  }
//--------------------------------------------------------

//Count characters in Edit Task dialog
function titleLengthCheck() {
    var count = document.getElementById('remainingCharactTitle');

    let title = document.getElementById("title-characters");
    var titleText = title.value.trim();
    var titleLength = titleText.length;

    count.innerHTML = "Characters left: " + (250 - titleLength);
  }

  function descriptionLengthCheck() {
    var count = document.getElementById('remainingCharactDescription');

    let description = document.getElementById("description-characters");
    var descriptionText = description.value.trim();
    var descriptionLength = descriptionText.length;
    
    count.innerHTML = "Characters left: " + (2000 - descriptionLength);
  }
// --------------------------------


