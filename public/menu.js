var url = window.location.origin;

function CreateM() {
  var mid = $('#menu-id').val();
  var managerid = $('#mcreate').val();

  if (!(mid && managerid)) {
    alert("Please fill out all of the fields");
    return;
  }

  var data = {
    mid: mid,
    managerid: managerid
  };

  $.ajax({
    url: url + "/createmenu",
    method: "post",
    data: data,
    success: () => {
      console.log("Sent data");
      $('#menu-id').val();
      $('#mcreate').val();
      alert("Successfully create new menu.");
    },
    error: () => {
      console.log("Failed to send data");
      alert("Failed to create new menu.");
    }
  });
}

function madd() {
  var did = $('#did').val();
  var mid = $('#menu-dish').val();

  if (!(did && mid)) {
    alert("Please fill out all fields");
    return;
  }

  var data = {
    did: did,
    mid: mid
  };

  $.ajax({
    url: url + "/addtomenu",
    method: "post",
    data: data,
    success: () => {
      console.log("Sent data");
      alert("Dish successfully added to menu.");
      $('#did').val("");
      $('#menu-dish').val("");
    },
    error: () => {
      console.log("Failed to send data");
    }
  });
}

function smenu() {
  var rid = $('#rset').val();
  var mid = $('#menus-id').val();

  if (!(rid && mid)) {
    alert("Please fill out all fields.");
    return;
  }

  var data = {
    rid: rid,
    mid: mid
  };

  $.ajax({
    url: url + "/setrmenu",
    method: "post",
    data: data,
    success: () => {
      console.log("Sent data");
      alert("Menu successfully added to restaurant.");
      $('#rset').val("");
      $('#menus-id').val("");
    },
    error: () => {
      console.log("Failed to send data");
      alert("Failed to add menu to restaurant.");
    }
  });
}

$('#menu-create').click(CreateM);
$('#menud-add').click(madd);
$('#menu-set').click(smenu);
