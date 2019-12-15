
$(document).ready(function() {
  $.getJSON('/api/todos').then(addTodos);

  //event listener on inputline enter key
  $('#todoInput').keypress(function(event){
    if(event.which===13){
      createTodo();
    }
  })

  //event listner for completing
  $('.list').on('click', 'li', function(){
    updateTodo($(this))
  })

  //event listener on x button
  //event delegation - looking for span inside of .list
  $('.list').on('click','span', function(e){
    e.stopPropagation(); //prevents event bubbling 
    removeTodo($(this).parent());
  })
});

function addTodos(todos) {
	//add todos
	todos.forEach(function(todo) {
		addTodo(todo);
	});
};

function addTodo(todo){
  var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
  //store mongo _id attributes for delete method
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if (todo.completed) {
    newTodo.addClass('done');
  }
  $('.list').append(newTodo);
}

function createTodo(){
  //get user input value
  var usrInput = $('#todoInput').val();
  $.post('/api/todos',{name: usrInput})
  .then(function(newTodo){
    //clean input after post request
    $('#todoInput').val('')
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err);
  })
};

function removeTodo(todo){
  var clickedId = todo.data('id');
  var deleteUrl = '/api/todos/' + clickedId;
  $(this).parent().remove();
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data){
    todo.remove();
  })
}

function updateTodo(todo){
  var updateUrl = 'api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone}
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedTodo){
    todo.toggleClass("done");
    todo.data('completed',isDone)
  })
}