var url = window.location.origin;

function CreateD() {
  var address = $('#D-Address').val()
  var rid = $('#rid').val()
  var distance = $('#D-Distance').val()
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
    success: () => {
      console.log("Sent data");
    },
    error: () => {
      console.log("Failed to send data");
    }
  });
}

function SearchD() {
  var address = $('#D-Address').val()
  var rid = $('#rid').val()
  var data = {
    address: address,
    rid: rid,
  };
  console.log("data:");
  console.log(data);

  $.ajax({
    url: url + "/searchdelivery",
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


$('#D-add').click(CreateD);
$('#D-search').click(SearchD);