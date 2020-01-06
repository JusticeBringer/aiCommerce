function fillTheProd(){
    var idAllProd = document.getElementById("numeProdCom");

    for(let ind = 0; ind < test.length; ind ++){
        var opt = document.createElement("OPTION");
        opt.innerHTML = test[ind].nume + " " + test[ind].prenume;
        opt.nodeValue = opt.innerHTML;
        idAllProd.appendChild(opt);
    }

}

function putRanges(){
    var undePun = document.getElementById("inputCantitateUnu");
    var inp = document.createElement("INPUT");
    inp.type = "range";
    inp.name = "cantitate";
    inp.rangeMin = 0;
    inp.rangeMax = 100;
    undePun.appendChild(inp);

    undePun = document.getElementById("inputCantitateDoi");
    inp = document.createElement("INPUT");
    inp.type = "range";
    inp.name = "cantitate";
    inp.rangeMin = 0;
    inp.rangeMax = 100;
    undePun.appendChild(inp);

    undePun = document.getElementById("inputCantitateTrei");
    inp = document.createElement("INPUT");
    inp.type = "range";
    inp.name = "cantitate";
    inp.rangeMin = 0;
    inp.rangeMax = 100;
    undePun.appendChild(inp);
}

function alertComanda(){
    document.querySelector("#listenCom").addEventListener("click", function() {

        JSAlert.confirm("Sunteți siguri că vreți să efectuați comanda?").then(function(result) {
            var timer = setTimeout(function() {
                window.location='http://localhost:8080/utilizatorClient';
            }, 2000);

            // Check if pressed yes
            if (!result){
                clearTimeout(timer);
                window.location='http://localhost:8080/comanda';
                return;
            }

            // User pressed yes!
            JSAlert.alert("Redirectare în 2 secunde", "Comandă efectuată" );
            var timerDoi = setTimeout(function() {
                window.location='http://localhost:8080/utilizatorClient';
            }, 1000);

        });

    });




}

window.onload = function () {
    fillTheProd();
    putRanges();
    alertComanda();
};