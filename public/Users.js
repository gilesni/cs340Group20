var url = window.location.origin;

function CreateUser() {
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

function SearchUser() {
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
    success: () => {
      console.log("Sent data");
    },
    error: () => {
      console.log("Failed to send data");
    }
  });
}

$('#Customer-create').click(CreateUser);
$('#User-Search').click(SearchUser);