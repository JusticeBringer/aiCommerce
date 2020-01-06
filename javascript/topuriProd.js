/* Vechea functie de creare a listei
function createList(vectorProducatori) {
    var idLista = document.getElementById("listaDeProd");

    for(var ind = 0; ind < vectorProducatori.length; ind ++){
        var nouLi = document.createElement("li");
        var textDePus = document.createTextNode(vectorProducatori[ind].nume + vectorProducatori[ind].prenume);
        nouLi.appendChild(textDePus);
        idLista.appendChild(nouLi);
    }
}

 */
function localStor( vectorProducatori, idButon) {
    const ol = document.querySelector("#listaDeProd");
    const button = document.querySelector("#"+idButon);
    const actualizeaza = document.querySelector("#actualizeazaProd");

    let itemsArray = localStorage.getItem('items') ?
    JSON.parse(localStorage.getItem('items')) : [];

    localStorage.setItem('items', JSON.stringify(itemsArray));
    const data = JSON.parse(localStorage.getItem('items'));

    const liMaker = text =>{
        const li = document.createElement('li');
        li.textContent = text;
        ol.appendChild(li);
    };

    for(let ind = 0; ind < vectorProducatori.length; ind ++){
        itemsArray.push(vectorProducatori[ind].nume + vectorProducatori[ind].prenume);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        liMaker(vectorProducatori[ind].nume + vectorProducatori[ind].prenume);
    }

    button.addEventListener('click', function (e) {
        e.preventDefault();

    });

    actualizeaza.addEventListener('click', function () {
        localStorage.clear();
        while (ol.firstChild) {
            ol.removeChild(ol.firstChild);
        }
        location.reload();
    });
}


function sortAfterDate(vectorProd) {
    const vectorProducatori = vectorProd.sort(function (a, b) {
        if (a.dataInreg < b.dataInreg)
            return 1;
        return -1;
    });
    return vectorProducatori;
}

function DomCerintaSase() {
    var c = document.getElementsByTagName("A")[12];
    var x = c.childNodes[0].nodeValue;

    var topNameTop = document.getElementById("topName");
    topNameTop.innerHTML = x;
}

function showNoiProd(vectorProd) {
    //sort dupa data

    clearCurrList(12);
    var vectorProducatori = sortAfterDate(vectorProd);

    //createList(vectorProducatori);
    localStor(vectorProducatori, "noiProd");
    //DomCerintaSase();
    writeTheHeader(12);
    showDetails();
}

function showDetails(){
    var idUndePunem = document.getElementById("detaliiPrimulProd");
    var firstPlace = document.querySelector("#listaDeProd > li:nth-child(1)");

    var p = document.createElement('p');
    var scriem = "";
    scriem += "Pe primul loc se află " + firstPlace.textContent + " care stă în localitatea " + userName.localitate;

    var text = document.createTextNode(scriem);
    p.appendChild(text);
    idUndePunem.appendChild(p);
}
function returnTopNewest(){
    var topNew = sortAfterDate(test);
    return topNew;
}

function showTopProd(vectorProd) {
    alert(vectorProd[0].nume);
}

function writeTheHeader(ind) {
    var c = document.getElementsByTagName("A")[ind];
    var x = c.childNodes[0].nodeValue;

    var topNameTop = document.getElementById("topName");
    topNameTop.innerHTML = x;
}

function clearCurrList() {
    const ol = document.querySelector("#listaDeProd");
    localStorage.clear();
    while (ol.firstChild) {
        ol.removeChild(ol.firstChild);
    }

    var idUndePunem = document.getElementById("detaliiPrimulProd");
    idUndePunem.innerText = "";
}

function returnNrProd(vectorProd) {
    const vectorProducatori = vectorProd.sort(function (a, b) {
        if (a.produse > b.produse)
            return 1;
        return -1;
    });
    return vectorProducatori;
}

function sortAfterNrProduse(e){
    //e.preventDefault();

    clearCurrList();
    writeTheHeader(13);
    const ol = document.querySelector("#listaDeProd");
    var vectorProducatori = returnNrProd(test);
    //localStor(vectorProducatori, "maiProd");

    for (ind = 0 ; ind < vectorProducatori.length; ind ++){
        let li = document.createElement('li');
        li.textContent = vectorProducatori[ind].nume + vectorProducatori[ind].prenume;
        ol.appendChild(li);
    }

}


window.onload = function (  ) {
     showNoiProd(test);
};