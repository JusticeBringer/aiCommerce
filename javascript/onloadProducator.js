function showEmail() {
    var nume = document.getElementById("firstNumeHeading");
    var theText = document.querySelector("#utilizatorEmail");
    var h = document.createElement("p");
    var t = document.createTextNode(nume.innerHTML);
    h.appendChild(t);

    if(xTimes == 0){
        theText.appendChild(h);
        xTimes = 1;
    }

    var idUtilizator = document.getElementById("utilizatorEmail");

    if(idUtilizator.style.display === "none")
        idUtilizator.style.display = "block";
    else{
        idUtilizator.style.display = "none";
    }
}

function writeTop(topNewest) {
    let ind = 0;
    for(ind = 0; ind < topNewest.length; ind ++){
        if(userName && userName.nume === topNewest[ind].nume &&userName.prenume === topNewest[ind].prenume)
            break;
    }
    var undeScriu = document.getElementById("esteTop");
    undeScriu.innerHTML = "Producatorul este pe locul " + ind + " in topul producatorilor noi";
}

function makeBorder(){
    var facBorder = document.getElementById("pozaUtilizator");
    var isOnATop = false;
    var topNewest = returnNewestProd();

    for(let ind = 0; ind < topNewest.length; ind ++){
        if(userName && userName.nume === topNewest[ind].nume &&userName.prenume === topNewest[ind].prenume)
            isOnATop = true;
    }

    if(isOnATop){
        facBorder.classList.add("borderUser");
        writeTop(topNewest);
    }
}

function returnNewestProd() {
    return sortAfterDate(test);
}

function returnProduse() {
    return userName.produse;
}

function showProduse() {
    var produseProd = returnProduse();
    var undePun = document.getElementById("produseUtilizator");

    var lir = document.createElement("LI");
    var text = document.createTextNode(produseProd);
    lir.appendChild(text);
    undePun.classList.add("forMouse");
    undePun.appendChild(lir);
}

var cpText;
function mouseCoord(){
    var undePun = document.getElementById("produseUtilizator");
    cpText = undePun.innerText;

    var facDiv = document.createElement("p");
    var text = document.createTextNode(userName.nume + " este din " + userName.localitate);
    facDiv.appendChild(text);
    undePun.classList.add("toDelete");
    undePun.appendChild(facDiv);
}

function mousePleaca(){
    var undePun = document.getElementById("produseUtilizator");

    undePun.innerHTML = "<li>" + cpText + " </li>";
    undePun.classList.remove("toDelete");
}

function writeSmth() {
    var undeS = document.getElementById("divtoshow");
    undeS.innerText = "";
    undeS.innerText = userName.prenume + " este din judetul " + userName.oras;
}

function hoverdiv(e, divid){

    var left  = e.clientX  + "px";
    var top  = e.clientY  + "px";

    var div = document.getElementById(divid);
    div.classList.add("toDelete");

    div.style.left = left;
    div.style.top = top;

    $("#"+divid).toggle();
    return false;
}

function eraseOferta() {
    var getTheId = document.getElementById("punOferte");

    while (getTheId.firstChild){
        getTheId.removeChild(getTheId.firstChild);
    }
}

var starting;
function stopOferta() {
    clearInterval(starting);
}

function startOferta(){
    starting = setInterval(putOferta, 3000);
}

function generateOferta(){
    var cantitate = Math.floor(Math.random() * (1000 - 100) + 100) / 100;

    return cantitate;
}

function generateProdus() {
    var myArray = JSON.stringify(userName.produse);
    var rand = myArray[Math.floor(Math.random() * myArray.length)];

    return myArray;
}

function putOferta(){
    var undePun = document.getElementById("punOferte");

    var dv = document.createElement("div");
    dv.classList.add("card");

    var ce = document.createElement("h3");
    ce.innerHTML = generateProdus();

    var tx = document.createElement("p");
    tx.innerHTML = "Cantitate: " + generateOferta() + " kg";

    dv.appendChild(ce);
    dv.appendChild(tx);

    undePun.appendChild(dv);
}

function makeCastravete(){
    var undePun = document.getElementById("animatieId");

    var fndCstrv = document.createElement("div");
    fndCstrv.classList.add("fundalCastravete");

    var cdt = document.createElement("div");
    cdt.classList.add("codita");

    var cstrv = document.createElement("div");
    cstrv.classList.add("castravete");

    //cdt.appendChild(cstrv);

    //fndCstrv.appendChild(cdt);

    var nouDiv = document.createElement("div");
    nouDiv.classList.add("toMove");
    nouDiv.id = "obiectCastravete";
    nouDiv.appendChild(cdt);
    nouDiv.appendChild(cstrv);
    fndCstrv.appendChild(nouDiv);
    undePun.appendChild(fndCstrv);

    moveCastravete();
}

var mkObj;
function moveCastravete(){
    var cstr = document.getElementById("obiectCastravete");

    var pos = 0;
    var posTop = 0;

    mkObj = setInterval(frame, 2);
    function frame() {
        if(pos < 450 && posTop === 0){
            pos++;
            cstr.style.left = pos + "px";
        }
        else if (pos === 450 && posTop < 120) {
            posTop++;
            cstr.style.top = posTop + "px";
            //pos = 0;
            //clearInterval(mkObj);
        }
        else if(pos <= 450 && pos >= 0 && posTop === 120){
            pos--;
            cstr.style.left = pos + "px";
        }
        else if(pos <= 0 && posTop <= 120){
            posTop--;
            cstr.style.top = posTop + "px";
        }
        else {
            clearInterval(mkObj);
        }
    }
}

function stopAnim(){
    clearInterval(mkObj);
}

function makeTomato(){
    var undePun = document.getElementById("animatieId");

    var fndTomato = document.createElement("div");
    fndTomato.classList.add("fundalTomato");

    var cdt = document.createElement("div");
    cdt.classList.add("codita");

    var tmto = document.createElement("div");
    tmto.classList.add("tomato");

    var nouDiv = document.createElement("div");
    nouDiv.classList.add("toMove");
    nouDiv.id = "obiectRosie";
    nouDiv.appendChild(cdt);
    nouDiv.appendChild(tmto);
    fndTomato.appendChild(nouDiv);
    undePun.appendChild(fndTomato);

    moveTomato();
}

var mkTom;
function moveTomato(){
    var tmto = document.getElementById("obiectRosie");

    var pos = 0;
    var posTop = 0;
    var aux = 0;

    mkTom = setInterval(frame, 15);
    function frame() {
        if(pos < 850 && pos >= 0 && posTop < 100 && aux === 0){
            pos +=5;
            posTop++;
            tmto.style.left = pos + "px";
            tmto.style.top = posTop + "px";
        }
        else{
            aux = 1;
            pos -=5;
            posTop--;
            if(pos === 0)
                aux = 0;
            tmto.style.left = pos + "px";
            tmto.style.top = posTop + "px";
        }
    }
}

function stopTomato(){
    clearInterval(mkTom);
}



let last_known_scroll_position = 0;
let ticking = false;

window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;
    if (last_known_scroll_position >= 1200 && ticking === false){
        ticking = true;
        makeTomato();
    }
});

let x = document.getElementById("myAudio");

function playAudio() {
    x.play();
}

function pauseAudio() {
    x.pause();
}

let vid = document.getElementById("myVideo");

function playVid() {
    vid.play();
}

function pauseVid() {
    vid.pause();
}

window.onload = function () {
    makeBorder();
    showProduse();
    writeSmth();
    //makeCastravete();
};