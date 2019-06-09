var url = window.location.origin;

function createEmployee() {
  var name = $('#emp-name').val();
  var pos = $('#emp-pos').val();
  var man = $('#emp-man').val();
  var res = $('#emp-res').val();

  var data = {
    name: name,
    position: pos,
    managerid: man,
    rid: res
  };

  $.ajax({
    url: url + "/createemployee",
    method: "post",
    data: data,
    success: () => {
      console.log("Sent data");
      alert("Employee was succesfully created.");
    },
    error: () => {
      console.log("Failed to send data");
      alert("Failed to create employee.");
    }
  });
}

$('#emp-create').click(createEmployee);

function assignEmployee() {
  var res = $('#assign-res').val();
  var emp = $('#assign-emp').val();

  var data = {
    rid: res,
    eid: emp
  }

  $.ajax({
    url: url + '/assignemployee',
    method: 'put',
    data: data,
    success: (data) => {
      console.log("Sent data");
      alert("Employee was succesfully changed.");
    },
    error: () => {
      console.log("Failed to send data");
      alert("Failed to change employee.");
    }
  });
}

$("#assign-submit").click(assignEmployee);

function lookup() {
  var name = $('#lookup-name').val();
  var pos = $('#lookup-pos').val();

  var data = {
    name: name,
    pos: pos
  }

  $.ajax({
    url: url + '/searchemployee',
    method: 'post',
    data: data,
    success: (data) => {
      console.log("Sent data");
      $('body').html(data);
    },
    error: () => {
      console.log("Failed to send data");
      alert("Failed to change employee.");
    }
  });
}

$('#lookup-submit').click(lookup);
