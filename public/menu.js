var url = window.location.origin;

function CreateM() {
  var mid = $('#menu-id').val()
  var managerid = $('#mcreate').val()
  var data = {
    mid: mid,
    managerid: managerid
  };
  console.log("data:");
  console.log(data);

  $.ajax({
    url: url + "/createmenu",
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

function madd() {
  var did = $('#did').val()
  var mid = $('#menu-dish').val()
  var data = {
    did: did,
    mid: mid
  };
  console.log("data:");
  console.log(data);

  $.ajax({
    url: url + "/addtomenu",
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

function smenu() {
  var rid = $('#rset').val()
  var mid = $('#menus-id').val()
  var data = {
    rid: rid,
    mid: mid
  };
  console.log("data:");
  console.log(data);

  $.ajax({
    url: url + "/setrmenu",
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

$('#menu-create').click(CreateM);
$('#menud-add').click(madd);
$('#menu-set').click(smenu);
