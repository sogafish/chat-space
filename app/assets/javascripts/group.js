$(function(e) {
  var list = $(".chat-group-users");

  function appendList(user) {
    var user = $(`<li class="chat-group-user" data-id=${ user.id } data-name=${ user.name }>${ user.name }</li>`).append(`<button type="button"class="chat-group-user__btn chat-group-user__btn--add">追加</button>`);
    list.append(user);
  }


  function addName(parent) {
    var memberList = $(".current-users");
    var userId = parent.data('id');
    var userName = parent.data('name');
    memberList.append(`
      <div class="current-user">
      <input type="hidden" name="group[user_ids][]" value="${userId}">
      <p>${userName}
      <button type="button"class="chat-group-user__btn chat-group-user__btn--remove">削除</button></p></div>
      `)
    $(parent).remove();
  }


  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {
        user: input
      },
      dataType: 'json'
    })

    .done(function(data) {
      $(".chat-group-user").remove();
      if (input.length !== 0) {
        $.each(data.users, function(i, user) {
          appendList(user);
        });
      }
      if (data.users.length === 0) {
        list.append(`<li class="chat-group-user">一致するユーザーはいません。</li>`);
      }
    })

    .fail(function(data) {
      $(".alert").hide();
      $("#flash-message").append('<div class="alert alert-danger">検索に失敗しました。</div>');
    });
  });



  $(".chat-group-users").on("click", ".chat-group-user__btn--add", function(e) {
    e.preventDefault();
    var parent = $(this).parent()
    addName(parent)
  });


  $(".current-users").on("click", ".chat-group-user__btn--remove", function() {
    var parent = $(this).parent('.current-user')
    $(parent).remove();
  });





});
