function mobileView() {
    let x = document.getElementById("myTopNav");
    if (x.className === "menu") {
        x.className += " responsive";
    } else {
        x.className = "menu";
    }
}