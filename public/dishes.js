var url = window.location.origin;

function CreateDish() {
    var name = $('#Dish-name').val();
    var lunchprice = $('#Lunch-price').val();
    var dinnerprice = $('#Dinner-price').val();
    if(!(name && lunchprice && dinnerprice)){
        alert("One of the required fields is not filled.");
        return;
    }
    var data = {
        name : name,
        dinnerprice : dinnerprice,
        lunchprice : lunchprice,
    };
    console.log("data:")
    console.log(data);
    $.ajax({
        url: url + "/createdish",
        method: "post",
        data: data,
        success: () =>{
            console.log("Sent Data");
            alert("Dish was succesfully created.");
        },
        error: () => {
            console.log("Failed to send data");
            alert("Failed to create dish.");
        }
    });
}
$('#Dish-create').click(CreateDish);
function SearchDish() {
    var name = $('#Dish-nameS').val();
    var lunchprice = $('#Lunch-priceS').val();
    var dinnerprice = $('#Dinner-priceS').val();
    var data = {
        name: name,
        lunchprice: lunchprice,
        dinnerprice: dinnerprice
    };
    console.log(data);
    $.ajax({
        url: url + "/searchdish",
        method: "post",
        data : data,
        success: (data) => {
            console.log("Sent data");
            $("body").html(data);
        },
        error: () => {
            console.log("Failed to send data");
        }
    });

}
$('#Dish-search').click(SearchDish);