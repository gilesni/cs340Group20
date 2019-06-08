var url = window.location.origin;

function sendData() {
  var name = $('#res-name').val()
  var open = $('#res-open').val()
  var close = $('#res-close').val()
  var man = $('#res-man').val()
  var data = {
    name: name,
    open: open,
    close: close,
    manager: man
  };
  console.log("data:");
  console.log(data);

  $.ajax({
    url: url + "/createrestaurant",
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

$('#res-create').click(sendData);
