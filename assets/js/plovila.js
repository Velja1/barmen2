//Ispis plovila
try{
        $.ajax({
        url :"assets/data/plovila.json",
        method: "GET",
        dataType: "json",
        success: function(data,status,xhr){
            let divJahte=document.getElementById("jahte");
            let divGliseri=document.getElementById("gliseri");
            let ispisJahte="";
            let ispisGliseri="";
            data.forEach(el=>{
                if(el.tip.id==1){
                    ispisJahte+=`<div class="plovilo">
                                <h4 class="align-center">${el.proizvodjac.naziv} ${el.model}</h4>
                                <a href="${el.slika.putanja}" class="group1" title="${el.proizvodjac.naziv} ${el.model}"><img src="${el.slika.putanja}" alt="${el.slika.alt}"/></a>
                                <p>${el.opis}</p>
                            </div>`;
                }
                else if(el.tip.id==2){
                    ispisGliseri+=`<div class="plovilo">
                                <h4 class="align-center">${el.proizvodjac.naziv} ${el.model}</h4>
                                <a href="${el.slika.putanja}" class="group2" title="${el.proizvodjac.naziv} ${el.model}"><img src="${el.slika.putanja}" alt="${el.slika.alt}"/></a>
                                <p>${el.opis}</p>
                            </div>`;
                }
            });
            divJahte.innerHTML=ispisJahte;
            divGliseri.innerHTML=ispisGliseri;
        },
        error:function(xhr,status,error){
            console.log(error);
        }
    });
}
catch(error){
    console.log("Ajax zahtev nije uspeo zbog: "+error);
}

//Dodavanje jQuery Plugin-a Colorbox
$(document).ready(function(){
    try{
        $(".plovilo .group1").colorbox({rel:'group1',transition:'fade'});
        $(".plovilo .group2").colorbox({rel:'group2',transition:'fade'});
    }
    catch(error){
        console.log("Efekat nad galerijom nije dostupan zbog: "+error);
    }
});