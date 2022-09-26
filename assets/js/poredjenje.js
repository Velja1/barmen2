try{
    $.ajax({
        url :"assets/data/plovila.json",
        method: "GET",
        dataType: "json",
        success: function(data,status,xhr){
            ispisiPlovila(data);
        },
        error:function(xhr,status,error){
            console.log(error);
        }
    });
}
catch(error){
    console.log("Ajax zahtev nije uspeo zbog: "+error);
}

$(document).ready(function(){
    if(localStorage){
        $(".btnPoredjenje").parent().parent().click(function(){
            var datai=$(this).data("id");
            localStorage.setItem("Plovilo"+datai,datai);
        });
    }
    else{
        console.log("Vaš browser ne podržava rad sa local storage, poređenje nije moguće");
    }
});

function ispisiPlovila(data){
    let divProizvodi=document.getElementById("proizvodi");
    let ispis="";
    var nizPlovilaLokal=[];
    for(var i=0;i<localStorage.length;i++){
        nizPlovilaLokal.push(localStorage.getItem(localStorage.key(i)));
    }
    if(nizPlovilaLokal.length!=0){
        $("#listaPoredjenje").css("display","none");
        data.forEach(el=>{
            nizPlovilaLokal.forEach(elData=>{    
                if(el.id==elData){
                    ispis+=`<div class="proizvod" data-id="${el.id}">
                        <p class="nazivMasine">${el.proizvodjac.naziv} ${el.model}</p>
                        <img src="${el.slika.putanja}" alt="${el.slika.alt}"/>
                        <div class="item"><div>Dužina</div><div>${el.duzina}m</div></div>
                        <div class="item"><div>Širina</div><div>${el.sirina}m</div></div>
                        <div class="item"><div>Težina</div><div>${el.tezina}kg</div></div>
                        <div class="item"><div>Tip</div><div>${el.tip.naziv}</div></div>
                        <div class="item"><div>Cena</div><div>${el.cena}€</div></div>
                        <div class="item"><div>Kapacitet rezervoara</div><div>${el.kapacitetRezervoara}l</div></div>
                    </div>`;
                }
            });
        })
        divProizvodi.innerHTML=ispis;
        $(".proizvod .item:even").css("backgroundColor","#aaa");
    }
    else{
        $("#listaPoredjenje").css("display","");
        $("#dugmePonisti").css("display","none");
    }
}
try{
    document.getElementById("dugmePonisti").addEventListener("click", izbrisiLokal);
}
catch(error){
    console.log("Nije moguće izbrisati local storage zbog greške: "+error);
}

function izbrisiLokal(){
    localStorage.clear();
    location.reload();
}