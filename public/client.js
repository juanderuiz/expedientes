$(function(){

  $.get('/expedientes', appendToList);

  $('form').on('submit', function(event) {
    event.preventDefault();

    var form = $(this);
    var expedientesData = form.serialize();

    $('.alert').hide();

    $.ajax({
      type: 'POST', url: '/expedientes', data: expedientesData
    })
    .error(function() {
      $('.alert').show();
    })
    .success(function(expNum){
      appendToList([expNum]);
      form.trigger('reset');
    });
  });

  function appendToList(expedientes) {
    //expedientes sólo contiene el campo "numero" de cada registro
    var list = [];
    var content, expediente;
    for(var i in expedientes){
      expediente = expedientes[i];
      content = '<a href="/expedientes/'+expediente+'">'+expediente+'</a>'+
        ' <a href="#" data-expediente="'+expediente+'">'+
        '<img src="delete.png" width="15px"></a>';
      list.push($('<li>', { html: content }));
    }

    $('.expedientes-list').append(list)
  }


  $('.expedientes-list').on('click', 'a[data-expediente]', function (event) {
    if(!confirm('Are you sure ?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE',
      url: '/expedientes/' + target.data('expediente')
    }).done(function () {
      target.parents('li').remove();
    });
  });

});
