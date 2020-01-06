function showHide() {
        let x = document.getElementById("descopera1");
        let y = document.getElementById("descopera2");

        if(y.style.display === "none"){
            x.style.display = "none";
            y.style.display = "block";

            showHideAside();
        }
}

function showHideAside() {
    let x = document.getElementById("galleryLove");
    let y = document.getElementById("galleryVisited");

    if(x.style.display === "none"){
        y.style.display = "none";
        x.style.display = "block";
    }
}

function coloreaza(){
    var x, i;
    x = document.querySelectorAll(".showCard");
    for (i = 0; i < x.length; i++) {
        x[i].style.outline = "1px solid blue";
    }
}

window.onload = function (  ) {
    coloreaza();
};