function toggleDisplay(elementID, hideButtonID=null, buttonClass=null){
    // https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
    let element = document.getElementById(elementID)
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    };

    if (hideButtonID !== null && buttonClass !== null) {
        let edit_button = document.getElementById(hideButtonID);
        let buttons = document.getElementsByClassName(buttonClass);
        if (edit_button.innerHTML !== 'Hide Form') {
            edit_button.innerHTML = 'Hide Form'
            for (b of buttons) {
                if (b.id !== edit_button.id) {
                    b.disabled = true;
                };
            };
        } else {
            edit_button.innerHTML = edit_button.name;
            for (b of buttons) {
                b.disabled = false;
            };
        };
    } else if (hideButtonID !== null) {
        let button = document.getElementById(hideButtonID);
        if (button.innerHTML !== 'Hide Form') {
            button.innerHTML = 'Hide Form';
        } else {
            button.innerHTML = button.name;
        };
    };
};

// event listner for