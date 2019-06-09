var url = window.location.origin;

function createUser() {
  var name = $('#Customer-name').val();

  if (!name) {
    alert("Name must be filled out to create new user.");
    return;
  }

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
      alert("User was succesfully created.")
      $("#Customer-name").val("");
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
      $("body").html(data);
    },
    error: () => {
      console.log("Failed to send data");
    }
  });
}

$('#Customer-create').click(createUser);
$('#User-Search').click(searchUser);
