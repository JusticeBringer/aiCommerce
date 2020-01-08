function sortAfterDate(vectorProd) {
    return vectorProd.sort(function (a, b) {
        if (a.dataInreg < b.dataInreg)
            return 1;
        return -1;
    });
}

function makeList(vecProd, idList) {
    var undePun = document.getElementById(idList);

    for(let ind = 0; ind < vecProd.length; ind ++){
        var unli = document.createElement("LI");
        unli.innerText = vecProd[ind].nume + " " + vecProd[ind].prenume;
        undePun.appendChild(unli);
    }
}

function showNoiProd(vectorProd) {
    //sort dupa data
    var vectorProducatori = sortAfterDate(vectorProd);
    //facem lista
    makeList(vectorProducatori, "listaDeProd");
}

window.onload = function () {
    showNoiProd(test);
};