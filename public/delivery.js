var url = window.location.origin;

function CreateD() {
  var address = $('#D-Address').val();
  var rid = $('#rid').val();
  var distance = $('#D-Distance').val();

  if (!(address && rid && distance)) {
    alert("Address, Restaurant, and Distance must be picked for new delivery location.")
  }

  var data = {
    address: address,
    rid: rid,
    distance: distance
  };

  console.log("data:");
  console.log(data);

  $.ajax({
    url: url + "/createdelivery",
    method: "post",
    data: data,
    success: (data) => {
      console.log("Sent data");
      if (data.err == 1) {
        alert("Distance from restaurant was too far, did not create delivery location.");
        return;
      }
      alert("Delivery location was succesfully created.")
      $('#D-Address').val("");
      $('#rid').val("");
      $('#D-Distance').val("");
    },
    error: () => {
      console.log("Failed to send data");
      alert("Failed to create delivery location.")
    }
  });
}

$('#D-add').click(CreateD);
