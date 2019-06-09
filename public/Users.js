var url = window.location.origin;

function createUser() {
  var name = $('#Customer-name').val()
  var data = {
    name: name,
  };
  console.log("data:");
  console.log(data);

  $.ajax({
    url: url + "/createuser",
    method: "post",
    data: data,
    success: () => {
      console.log("Sent data");
    },
    error: () => {
      console.log("Failed to send data");
    }
  });
}

function searchUser() {
  var name = $('#Customer-nameS').val()
  var data = {
    name: name,
  };
  console.log("data:");
  console.log(data);

  $.ajax({
    url: url + "/searchuser",
    method: "post",
    data: data,
    success: (data) => {
      console.log("Sent data");
      console.log(data);
      $("body").html(data);
    },
    error: () => {
      console.log("Failed to send data");
    }
  });
}

$('#Customer-create').click(createUser);
$('#User-Search').click(searchUser);
