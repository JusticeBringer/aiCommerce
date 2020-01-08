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

(function ( $ ) {

    $.fn.changeElem = function( options ) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            backgroundColor: "white",
        }, options );

        // Greenify the collection based on the settings variable.
        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });

    };

}( jQuery ));

$( "div" ).changeElem({
    color: "orange",
    backgroundColor: "#3884bc",
    outline: "2px solid red"
});

window.onload = function () {
    fillTheProd();
    putRanges();
    alertComanda();
};