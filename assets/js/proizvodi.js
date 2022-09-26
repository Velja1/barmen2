$(document).ready(function(){
    document.getElementById("btnPretraga").addEventListener("click",filtriraj);

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

    try{
            $.ajax({
            url :"assets/data/tipovi.json",
            method: "GET",
            dataType: "json",
            success: function(data,status,xhr){
                ispisiTipove(data);
            },
            error:function(xhr,status,error){
                console.log(error);
            }
        });
    }
    catch(error){
        console.log("Ajax zahtev nije uspeo zbog: "+error);
    }

    try{
            $.ajax({
            url :"assets/data/proizvodjaci.json",
            method: "GET",
            dataType: "json",
            success: function(data,status,xhr){
                ispisiModel(data);
            },
            error:function(xhr,status,error){
                console.log(error);
            }
        });
    }
    catch(error){
        console.log("Ajax zahtev nije uspeo zbog: "+error);
    }

    try{
            $.ajax({
            url :"assets/data/sortiranje.json",
            method: "GET",
            dataType: "json",
            success: function(data,status,xhr){
                ispisiSortiranje(data);
            },
            error:function(xhr,status,error){
                console.log(error);
            }
        });
    }
    catch(error){
        console.log("Ajax zahtev nije uspeo zbog: "+error);
    }

    function ispisiPlovila(data){
        let divProizvodi=document.getElementById("proizvodi");
        let ispis="";
        data.forEach(el=>{
            ispis+=`<div class="proizvod" data-id="${el.id}">
                        <p class="nazivMasine">${el.proizvodjac.naziv} ${el.model}</p>
                        <img src="${el.slika.putanja}" alt="${el.slika.alt}"/>
                        <div class="item"><div>Dužina</div><div>${el.duzina}m</div></div>
                        <div class="item"><div>Širina</div><div>${el.sirina}m</div></div>
                        <div class="item"><div>Težina</div><div>${el.tezina}kg</div></div>
                        <div class="item"><div>Tip</div><div>${el.tip.naziv}</div></div>
                        <div class="item"><div>Cena</div><div>${el.cena}€</div></div>
                        <div class="item"><div>Kapacitet rezervoara</div><div>${el.kapacitetRezervoara}l</div></div>
                        <div class="align-center"><input type="button" class="btnPoredjenje special align-center" value="Uporedi" /></div>
                    </div>`;
        });
        divProizvodi.innerHTML=ispis;
        
        $(".proizvod .item:even").css("backgroundColor","#aaa");
        $(".btnPoredjenje").parent().parent().click(function(){
            var datai=$(this).data("id");
            localStorage.setItem("Plovilo"+datai,datai);
            if(localStorage.length!=0){
                document.getElementById("btnPoredjenjehtml").value=`Poređenje (${localStorage.length})`;
                document.getElementById("btnPoredjenjehtml").style.display="";
            }
            else{
                document.getElementById("btnPoredjenjehtml").style.display="none";
            }
        });
    }
    if(localStorage.length!=0){
        document.getElementById("btnPoredjenjehtml").value=`Poređenje (${localStorage.length})`;
        document.getElementById("btnPoredjenjehtml").style.display="";
    }
    else{
        document.getElementById("btnPoredjenjehtml").style.display="none";
    }

    function ispisiTipove(data){
        let divTip=document.getElementById("divSelectTipPlovila");
        let ispis=`<select id="ddlTip"><option value="0">- Izaberite tip plovila -</option>`;
        data.forEach(el=>{
            ispis+=`<option value="${el.id}">${el.naziv}</option>`;
        });
        ispis+="</select>";
        divTip.innerHTML=ispis;
    }

    function ispisiModel(data){
        let divModel=document.getElementById("divSelectModelPlovila");
        let ispis=`<select id="ddlModel"><option value="0">- Izaberite model -</option>`;
        data.forEach(el=>{
            ispis+=`<option value="${el.id}">${el.naziv}</option>`;
        });
        ispis+="</select>";
        divModel.innerHTML=ispis;
    }

    function ispisiSortiranje(data){
        let divSortiranje=document.getElementById("divSelectSortirajPlovila");
        let ispis=`<select id="ddlSortiranje"><option value="0">- Sortiraj po -</option>`;
        data.forEach(el=>{
            ispis+=`<option value="${el.id}">${el.naziv}</option>`;
        });
        ispis+="</select>";
        divSortiranje.innerHTML=ispis;
    }
    
    function filtriraj(){
        let izabraniTip=document.getElementById("ddlTip").options[document.getElementById("ddlTip").selectedIndex].value;
        let izabraniModel=document.getElementById("ddlModel").options[document.getElementById("ddlModel").selectedIndex].value;
        let izabraniNacin=document.getElementById("ddlSortiranje").options[document.getElementById("ddlSortiranje").selectedIndex].value;
        let filtriranaPlovila=[];
        $.ajax({
            url :"assets/data/plovila.json",
            method: "GET",
            dataType: "json",
            success: function(data,status,xhr){
                filtriranaPlovila=data;
                if(izabraniTip!="0"){
                    filtriranaPlovila=filtriranaPlovila.filter(plovilo=>plovilo.tip.id==izabraniTip);
                }
                if(izabraniModel!="0"){
                    filtriranaPlovila=filtriranaPlovila.filter(plovilo=>plovilo.proizvodjac.id==izabraniModel);
                }
                if(izabraniNacin==1){
                    filtriranaPlovila=filtriranaPlovila.sort((a,b)=>{
                        if(a.duzina<b.duzina){
                            return -1;
                        }
                        else if(a.duzina>b.duzina){
                            return 1;
                        }
                        else{
                            return 0;
                        }
                    });
                }
                if(izabraniNacin==2){
                    filtriranaPlovila=filtriranaPlovila.sort((a,b)=>{
                        if(a.duzina<b.duzina){
                            return 1;
                        }
                        else if(a.duzina>b.duzina){
                            return -1;
                        }
                        else{
                            return 0;
                        }
                    });
                }
                if(izabraniNacin==3){
                    filtriranaPlovila=filtriranaPlovila.sort((a,b)=>{
                        if(a.cena<b.cena){
                            return -1;
                        }
                        else if(a.cena>b.cena){
                            return 1;
                        }
                        else{
                            return 0;
                        }
                    });
                }
                if(izabraniNacin==4){
                    filtriranaPlovila=filtriranaPlovila.sort((a,b)=>{
                        if(a.cena>b.cena){
                            return -1;
                        }
                        else if(a.cena<b.cena){
                            return 1;
                        }
                        else{
                            return 0;
                        }
                    });
                }
                ispisiPlovila(filtriranaPlovila);

                if(filtriranaPlovila.length==0){
                    document.getElementById("proizvodi").innerHTML=`<header class="major">
                                                                        <p>Nema plovila za izabrani kriterijum</p>
                                                                    </header>`;
                }
                else{
                    ispisiPlovila(filtriranaPlovila);
                }
            },
            error:function(xhr,status,error){
                console.log(error);
            }
        });
    }
});