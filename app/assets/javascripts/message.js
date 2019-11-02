$(function(){
  
  function buildMessage(message){
    var addImage = (message.image !== null) ? `<img class = "lower-message__image", src="${message.image}">` : ''

    var html =  `<div class="message">
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
});