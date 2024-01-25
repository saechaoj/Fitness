// Get the objects we need to modify
let editForm = document.getElementById('edit-form');

// Modify the objects we need
editForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();
    
    // map input key/value pairs to data
    let data = {};

    // get all select tag inputs
    let select_tags = editForm.getElementsByTagName('select');
    for (let tag of select_tags) {
        if (tag.multiple) {
            let options = [];
            for (let option of tag.selectedOptions) {
                options.push(option.value);
            };
            data[tag.name] = options;
        } else {
            data[tag.name] = tag.value;
        };
    };

    // get all input tags in form
    let input_tags = editForm.getElementsByTagName('input');

    for (let tag of input_tags) {
        // ignore submit tag
        if (tag.type !== "submit") {
            // create end time based on start time
            if (tag.name == 'start_time') {
                // addMinutes(timeString, minutesNumber)
                let end_time = addMinutes(tag.value, 50);
                data['end_time'] = end_time;
            }
            data[tag.name] = tag.value
        };
    };

    // Setup our AJAX request
    // first get the name attribute of body tag
    let pageName = document.getElementsByTagName('body')[0].getAttribute('name');
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `/${pageName}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table (alternative to page reload)
            // updateRow(xhttp.response);

            // reset form and reload page to display updated data
            // editForm.reset();
            window.location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log(`There was an error with the input: ${xhttp.response}`);
            alert("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// optional function to update table without reloading page
function updateRow(data){
    let parsedData = JSON.parse(data);
    parsedData = parsedData[0];
    let editID = Object.values(parsedData)[0]; // assumes first element of response is the id
    let editRow = document.getElementById(`row${editID}`);
    let columns = editRow.getElementsByClassName('data-col');
    for (let i = 0; i < columns.length; i++) {
        key = Object.keys(parsedData)[i];
        columns[i].innerHTML = parsedData[key];
    };
};

// takes time string 't' in "hh:mm" format
// adds 'm' minutes to time
// returns time in new format
function addMinutes(t, m) {

    // split string in "hh:mm" format
    let hh_mm = t.split(':');

    // save numbers
    let hh = Number(hh_mm[0]);
    let mm = Number(hh_mm[1]);
    mm += m;

    // adjust hours and minutes if minutes > 60
    if (mm > 59) {
        hh_mm[0] = (hh + 1).toString();
        hh_mm[1] = (mm - 60).toString();
    } else {
        hh_mm[1] = mm.toString();
    };

    // pad string with leading zero if needed
    for (let i in hh_mm) {
        if (hh_mm[i].length < 2) {
            hh_mm[i] = "0" + hh_mm[i];
        };
    };
    
    // convert array back to string
    hh_mm = hh_mm.join(':');

    // return time string
    return hh_mm
};