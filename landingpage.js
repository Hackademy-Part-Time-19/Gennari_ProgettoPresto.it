let indiceimmagine = 2;
  setInterval(() => {

      if (indiceimmagine == 1) {

          document.getElementById("immagineCover").style.opacity = "0";

          setTimeout(() => {
              document.getElementById("immagineCover").src = "immagini/manìs clothing.png";
              document.getElementById("immagineCover").style.opacity = "1";
          }, 200);
          indiceimmagine++;                
      } else if (indiceimmagine == 2) {
          document.getElementById("immagineCover").style.opacity = "0";

          setTimeout(() => {
              document.getElementById("immagineCover").src = "immagini/woman clothing.png";
              document.getElementById("immagineCover").style.opacity = "1";
          }, 200);
          indiceimmagine++;     
      } else if (indiceimmagine == 3) {
          document.getElementById("immagineCover").style.opacity = "0";

          setTimeout(() => {
              document.getElementById("immagineCover").src = "immagini/jewerly.png";
              document.getElementById("immagineCover").style.opacity = "1";
          }, 200);
          indiceimmagine++;
      } else if (indiceimmagine == 4) {
          document.getElementById("immagineCover").style.opacity = "0";

          setTimeout(() => {
              document.getElementById("immagineCover").src = "immagini/electronics.png";
              document.getElementById("immagineCover").style.opacity = "1";
          }, 200);
          indiceimmagine = 1;   
      }

  }, 5000);

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

            prodotti = data.filter((prodotto) => {

                if (limiteMassimo != undefined && nome != "" && categoria != "") {
                    return prodotto.price >= limiteMinimo && prodotto.price <= limiteMassimo && prodotto.title.startsWith(nome) && prodotto.category == categoria;
                } else if (limiteMassimo == undefined && nome != "" && categoria != ""){
                    return prodotto.price >= limiteMinimo && prodotto.title.startsWith(nome) && prodotto.category == categoria;
                } else if (limiteMassimo == undefined && nome == "" && categoria != ""){
                    return prodotto.price >= limiteMinimo && prodotto.category == categoria;
                } else if (limiteMassimo == undefined && nome != "" && categoria == ""){
                    return prodotto.price >= limiteMinimo && prodotto.title.startsWith(nome); 
                } else if (limiteMassimo != undefined && nome == "" && categoria != ""){
                    return prodotto.price >= limiteMinimo && prodotto.price <= limiteMassimo && prodotto.category == categoria;   
                }        

            })

            for (let i = 0; i < prodotti.length; i++) {
                 let prodotto = prodotti[i];

                 document.getElementById("containerProdotti").innerHTML += `
                 
                <div class="card" style="width: 450px;height: 800px;border: 1px solid #ccc;border-radius: 5px;overflow: hidden;
                               box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);margin: 10px;background-color: #141c3a;display: flex;flex-direction: column;">

                    <div style="width: 100%; height: 70%; display: flex; justify-content: center; align-items: center;background-color: white;">

                        <img style="width: 90%; height: auto; object-fit: contain;" src="${prodotti[i].image}" alt="Prodotto">

                    </div>

                    <div class="info" style="padding: 20px;background-color: #141c3a;width: 100%;height: 200px;">
                        <div style="overflow: hidden;display: -webkit-box;-webkit-line-clamp: 1;line-clamp: 1;-webkit-box-orient: vertical;background-color: #141c3a;">  
                            <h3 style="margin-top: 0;color: white;background-color: #141c3a;margin-right:20px;">${prodotti[i].title}</h3>
                        </div>
                        <div style="overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;background-color: #141c3a;">  
                            <p style="margin-bottom: 8px;color: white;background-color: #141c3a;margin-right:40px;margin-top:30px;">${prodotti[i].description}</p>
                        </div>
                        <p style="color: white;background-color: #141c3a;"> € ${prodotti[i].price}</p>
                        <button style="padding: 8px 16px;background-color: #007bff;color: white;border: none;
                                        border-radius: 4px;cursor: pointer;transition: background-color 0.3s ease;">Aggiungi al Carrello</button>                         
                    </div>
                </div>` 
                
            }

    })
    .catch ((error) => console.log(error));
}