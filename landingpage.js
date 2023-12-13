function vaiAlCatalogo() {

    let nome = document.getElementById("inputNome").value;
    let prezzo = document.getElementById("inputPrezzo").value;
    let categoria = document.getElementById("inputCategoria").value;

    window.location.href =`catalogo.html?prezzo=${prezzo}&nome=${nome}&categoria=${categoria}`;
}

window.addEventListener("load", function(){

    console.log("sono in una nuova pagina");

    if (window.location.href.includes("catalogo.html")) {
        console.log("Sono nel catalogo");
        let url = new URL(window.location.href);

        let prezzo = url.searchParams.get("prezzo");
        let nome = url.searchParams.get("nome");
        let categoria = url.searchParams.get("categoria");
        
        let limiteMinimo;
        let limiteMassimo;
    
        if(prezzo == "0-100"){
            limiteMinimo = 0;
            limiteMassimo = 100;

        }else if(prezzo == "100-200") {
            limiteMinimo = 100;
            limiteMassimo = 200;

        }else if(prezzo == "200-500") {
            limiteMinimo = 200;
            limiteMassimo = 500;

        }else if(prezzo == "500") {
            limiteMinimo = 500;

        }    
            
        filtraProdottiCatalogo(nome, limiteMinimo, limiteMassimo, categoria);

    } else {
        console.log("Sono nella landingpage");
        
    }

});

function filtraProdottiCatalogo(nome, limiteMinimo, limiteMassimo, categoria){

    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {

            console.log("sono la lista originaria")

            let prodotti = data;



            console.log("Sononla lista filtrata")



            for (let i = 0; i < prodotti.length; i++) {
                 let prodotto = prodotti[i];

                 document.getElementById("containerProdotti").innerHTML += `
                    <div id="cardProdotto" class="card">
                        <img src="${prodotti[i].image}" alt="Prodotto">
                        <div class="info">
                             <h2>${prodotti[i].title}</h2>
                             <p>${prodotti[i].description}</p>
                             <p>${prodotti[i].price}</p>
                             <button type="button">Aggiungi al Carrello</button>
                        </div>
                    </div>` 
                
            }

    })
    .catch ((error) => console.log(error));
}