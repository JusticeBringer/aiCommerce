function creeazaInput(numePlace, i){
    var idFormular = document.getElementById("contactForm");
    var inp = document.createElement("input");
    inp.placeholder = numePlace;

    var cevaIdFormular = idFormular.getElementsByTagName("label")[i];
    var inpText = cevaIdFormular.insertBefore(inp, cevaIdFormular.firstChild.nextSibling);

    switch (i) {
        case 0:
            inpText.id="fname";
            inpText.className="pentruNouInput";
            break;
        case 1:
            inpText.id="lname";
            inpText.className="pentruNouInput";
            break;
        case 5:
            inpText.type="textarea";
            inpText.id="subject";
            inpText.name="subject";
            inpText.className="description";
            break;
        default:
            break;
    }

    // console.log(idFormular.firstChild.nextSibling);
    // console.log(cevaIdFormular);
    // console.log(inpText);
}

function creeazaTextNodePrenume(){
    var h = document.createElement("H1");
    var t = document.createTextNode("Așteptăm vești de la tine");
    h.appendChild(t);
    h.className = "universalHeading";

    document.body.firstChild.nextSibling.appendChild(h);
}

function makeText(){
    var x = document.getElementsByClassName("textHarta");
    x[0].innerHTML = "Locatia";
}

function makeRadio(){
    var prim = document.getElementById("primRadio");
    var doi = document.getElementById("doiRadio");

    var unR = document.createElement("INPUT");
    unR.value = "problema";
    unR.name = "subiect";
    unR.type = "radio";
    prim.appendChild(unR);

    var cevaText = document.createElement("span");
    cevaText.innerHTML = "Problemă";
    prim.appendChild(cevaText);

    var altR = document.createElement("INPUT");
    altR.value = "problema";
    altR.name = "subiect";
    altR.type = "radio";
    doi.appendChild(altR);

    var altText = document.createElement("span");
    altText.innerHTML = "Feedback";
    doi.appendChild(altText);
}

function butonSend(){
    var undePun = document.getElementById("submitForm");
    var inpText = document.createElement("input");
    inpText.id="submitButton";
    inpText.type="submit";
    inpText.value="Trimite";

    undePun.appendChild(inpText);
}

function generateEmail(){
    var undePun = document.getElementById("punEmail");
    var inpText = document.createElement("input");
    inpText.id = "emailId";
    inpText.placeholder = "exemplu@gmail.com";
    inpText.className="pentruNouInput";

    undePun.appendChild(inpText);
}

var theSelect = document.createElement("select");
function makeOption(numele) {
    var opt = document.createElement("OPTION");
    opt.value = numele;
    opt.innerText = numele;

    theSelect.appendChild(opt);
}

function putSimpleSelect(){
    var undePun = document.getElementById("gravitate");

    makeOption("Usor");
    makeOption("Mediu");
    makeOption("Important");

    undePun.appendChild(theSelect);
}

window.onload = function () {
    creeazaTextNodePrenume();

     creeazaInput("Ion",  0);
     creeazaInput("Dinescu",  1);
     creeazaInput("Descrierea problemei...", 5);

    makeText();
    makeRadio();
    butonSend();
    generateEmail();
    putSimpleSelect();
};