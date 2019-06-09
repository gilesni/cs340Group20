var url = window.location.origin;

function CreateR() {
  var rd = $('#rewardordis').val()
  var desc = $('#desc').val()
  var rid = $('#rid').val()
  var data = {
    rd: rd,
    rid: rid,
    desc: desc
  };
  console.log("data:");
  console.log(data);

  $.ajax({
    url: url + "/createreward",
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

function searchR() {
  var rid = $('#srid').val()
  var data = {
    rid: rid
  };
  console.log("data:");
  console.log(data);

  $.ajax({
    url: url + "/searchreward",
    method: "post",
    data: data,
    success: (data) => {
      $('body').html(data);
      console.log("Sent data");
    },
    error: () => {
      console.log("Failed to send data");
    }
  });
}

$('#rewardcreate').click(CreateR);
$('#searchr').click(searchR);

