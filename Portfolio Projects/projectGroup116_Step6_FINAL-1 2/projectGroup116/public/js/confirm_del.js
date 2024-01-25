// code for deleteRow using regular javascript/xhttp
function deleteConfirm(deleteID, elementName='') {
  let confirmed = confirm(`Are you sure you want to delete${elementName}?`);

  // execute deletion if confirmed
  if (confirmed) {
    // Put our data we want to send in a javascript object
    let data = {
      id: deleteID
    };

    // Setup our AJAX request
    // get name set in body tag
    let pageName = document.getElementsByTagName('body')[0].getAttribute('name');
    let path = `/${pageName}`;
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", path, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 204) {

          // Add the new data to the table (alternative to reloading page)
          // deleteRow(deleteID);
          
          // reload page
          window.location.reload();
      }
      else if (xhttp.readyState == 4 && xhttp.status != 204) {
          console.log("There was an error with the input.");
          alert('Error occured trying to delete this row');
      }
    }

    // Send request
    xhttp.send(JSON.stringify(data));
  }
};

// optional function used as an alternative to reloading page
function deleteRow(deleteID) {
  let table = document.getElementById('data-table');
  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == deleteID) {
      table.deleteRow(i);
      break;
    }
  }
};