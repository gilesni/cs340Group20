var url = window.location.origin;

function createRestaurant() {
  var name = $('#res-name').val();
  var open = $('#res-open').val();
  var close = $('#res-close').val();
  var man = $('#res-man').val();

  if (!(name && open && close && man)) {
    alert("One of the required fields is not filled.");
    return;
  }
  if (!(parseInt(open) && parseInt(close))) {
    alert("The opening and closing time should be a whole number between 0 and 23");
    return;
  }
  if (parseInt(open) > 23 || parseInt(open) < 0 || parseInt(close) > 23 || parseInt(close) < 0) {
    alert("The opening and closing time should be a whole number between 0 and 23");
    return;
  }

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
    success: (data) => {
      console.log("Sent data");
      alert("Restaurant was succesfully created.");
      $(name).text("");
      $(open).text("");
      $(close).text("");
    },
    error: (data) => {
      console.log("Failed to send data");
      alert("Failed to create restaurant.");
    }
  });
}

$('#res-create').click(createRestaurant);

function changeManager() {
  var managerid = $('#manid').val();
  var rid = $('#rid').val();

  if (!(rid && managerid)) {
    alert("One of the required fields is not filled.");
    return;
  }

  var data = {
    managerid: managerid,
    rid: rid
  };
  console.log("data");
  console.log(data);

  $.ajax({
    url: url + "/changemanager",
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

$('#man-change').click(changeManager);
