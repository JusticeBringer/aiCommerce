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

function forAjax() {
    var httpRequest;
    document.getElementById("ajaxButton").addEventListener('click', makeRequest);
    function makeRequest() {
        httpRequest = new XMLHttpRequest(); //creaza un obiect XMLHttpRequest
        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('GET', '/jsonFiles/producatori.json');
        httpRequest.send();
    }
    function alertContents() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                alert(httpRequest.responseText); //continutul fis. test.html
            } else {
                alert('There was a problem with the request.');
            }
        }
        else{
        }
    }
}
function sortAfterDate(vectorProd) {
    return vectorProd.sort(function (a, b) {
        if (a.dataInreg < b.dataInreg)
            return 1;
        return -1;
    });
}
function returnTopNewest(){
    var topNew = sortAfterDate(test);
    return topNew;
}

function deleteOldList(){
    var idS = document.getElementById("idSection");
    idS.style.display = "none";
    var second = document.getElementById("idSection2");
    second.style.display = "none";
    var third = document.getElementById("idSection3");
    third.style.display = "none";
}

function showN(){
    deleteOldList();
    var second = document.getElementById("idSection2");
    second.style.display = "block";

}

function showN2(){
    deleteOldList();
    var third = document.getElementById("idSection3");
    third.style.display = "block";
}

window.onload = function (  ) {
    coloreaza();
};