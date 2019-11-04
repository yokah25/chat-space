$(function(){
  
  function buildMessage(message){
    var addImage = (message.image !== null) ? `<img class = "lower-message__image", src="${ message.image }">` : ''

    var html =  `<div class="message" data-id="${ message.id }">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                    ${ message.name }
                    </div>
                    <div class="upper-message__date">
                    ${ message.date }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                    ${ message.content }
                    </p>
                    ${ addImage }
                  </div>
                </div>`
    return html
  };

  $(".new_message").on('submit', function(e){
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);

    $.ajax({
      url: url,
      type: 'POST',
      data: formData, 
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })

    .always(() => {
      $(".form__submit").removeAttr("disabled");
    })
  });

  var reloadMessages = function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message').last().data("id");

      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          inserHTML = buildMessage(message);
          $(".messages").append(insertHTML);
        });
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('error');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});