var url = window.location.origin;

function CreateR() {
  var rd = $('#rewardordis').val()
  var desc = $('#desc').val()
  var rid = $('#rid').val()

  if (!(rid)) {
    alert("The restaurant must be picked to create a new customer reward");
    return;
  }

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
      alert("Customer reward was succesfully created.");
      $('#rewardordis').val("");
      $('#desc').val("");
      $('#rid').val("");
    },
    error: () => {
      console.log("Failed to send data");
      alert("Failed to create customer reward.");
    }
  });
}

function searchR() {
  var rid = $('#srid').val()

  if (!(rid)) {
    alert("The restaurant must be picked to search customer rewards");
    return;
  }

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
      alert("Failed to search customer rewards.");
    }
  });
}

$('#rewardcreate').click(CreateR);
$('#searchr').click(searchR);
