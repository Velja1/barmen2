//Funkcija koja povecava prvo slovo
function povecajPrvoSlovo(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Ispis tabele i ispis slika
try{
        $.ajax({
        url :"assets/data/plovila.json",
        method: "GET",
        dataType: "json",
        success: function(data,status,xhr){
            var tabela=document.getElementById("tabela");
            var divImage=document.getElementById("divImage");
            var ispisImage="";
            var ispisTabela="<thead><tr>";
            var thElementi=["Ime", "Tip", "Cena"];

            thElementi.forEach(el=>{
                ispisTabela+=`<th>${el}</th>`;
            });

            ispisTabela+="</tr></thead><tbody><tr>";

            data.forEach(el=>{
                ispisTabela+=`<td>${el.proizvodjac.naziv} ${el.model}</td><td>${povecajPrvoSlovo(el.tip.naziv)}</td><td>${el.cena}€</td></tr></tbody>`;
                if(el.tip.id==1){
                    ispisImage+=`<span class="fader">
                            <img src="${el.slika.putanja}" alt=""/>
                            <img class="to" src="${el.slikaInterior.putanja}"/>
                        </span>`;
                }
            });

            tabela.innerHTML=ispisTabela;
            divImage.innerHTML=ispisImage;

            //Efekat zebre na tabeli
            $(document).ready(function(){
                $('#tabela tbody tr:even').css('background-color','#dddddd');
                
                $('#tabela tbody tr:odd').hover(function(){
                    $(this).css('background-color','#f0f0f0');
                },
                function(){
                    $(this).css('background-color','#fff');
                });
                
                //Efekat slika
                $('.fader').hover(function() {
                    $(this).find('img:eq(1)').stop(true,true).fadeIn();
                }, function() {
                    $(this).find('img:eq(1)').fadeOut();
                });
            });
        },
        error:function(xhr,status,error){
            console.log(error);
        }
    });
}
catch(error){
    console.log("Ajax zahtev nije uspeo zbog: "+error);
}

var ddlTip="";

try{
        $.ajax({
        url :"assets/data/tipovi.json",
        method: "GET",
        dataType: "json",
        success: function(data,status,xhr){
            //Ispis dropdown liste tip
            var divSelectTip=document.getElementById("divSelectTip");
            var ispisSelectTip=`<select name="selectTip" id="selectTip"><option value="0">- Izaberite tip - </option>`;

            data.forEach(el=>{
                ispisSelectTip+=`<option value="${el.id}">${el.naziv}</option>`;
            });
            
            ispisSelectTip+="</select>";
            
            divSelectTip.innerHTML=ispisSelectTip;

            ddlTip=document.getElementById("selectTip");
            ddlTip.addEventListener("change", proveraTipa);
        },
        error:function(xhr,status,error){
            console.log(error);
        }
    });
}
catch(error){
    console.log("Ajax zahtev nije uspeo zbog: "+error);
}

//Ispis dropdown liste plovilo
var divSelectPlovilo=document.getElementById("divSelectPlovilo");
divSelectPlovilo.innerHTML=`<select name="selectPlovilo" id="selectPlovilo"></select>`;
divSelectPlovilo.style.display="none";

function proveraTipa(){
    var vrednost=ddlTip.options[ddlTip.selectedIndex].value;
    try{
            $.ajax({
            url :"assets/data/plovila.json",
            method: "GET",
            dataType: "json",
            success: function(data,status,xhr){
                if(vrednost==1){
                    let ispisSelectPlovilo=`<select name="selectPlovilo" id="selectPlovilo"><option value="0">- Izaberite jahtu -</option>`;
                    data.forEach(el=>{
                        if(el.tip.id==1){
                            ispisSelectPlovilo+=`<option value="${el.id}">${el.proizvodjac.naziv} ${el.model}</option>`;
                        }
                    });
                    ispisSelectPlovilo+="</select>";
                    divSelectPlovilo.innerHTML=ispisSelectPlovilo;
                    divSelectPlovilo.style.display="block";
                
                }
                else if(vrednost==2){
                    let ispisSelectPlovilo=`<select name="selectPlovilo" id="selectPlovilo"><option value="0">- Izaberite gliser -</option>`;
                    data.forEach(el=>{
                        if(el.tip.id==2){
                            ispisSelectPlovilo+=`<option value="${el.id}">${el.proizvodjac.naziv} ${el.model}</option>`;
                        }
                    });
                    ispisSelectPlovilo+="</select>";
                    divSelectPlovilo.innerHTML=ispisSelectPlovilo;
                    divSelectPlovilo.style.display="block";
                }
                else{
                    divSelectPlovilo.innerHTML=`<select name="selectPlovilo" id="selectPlovilo"></select>`;
                    divSelectPlovilo.style.display="none";
                }
            },
            error:function(xhr,status,error){
                console.log(error);
            }
        });
    }
    catch(error){
        console.log("Ajax zahtev nije uspeo zbog: "+error);
    }
}

//Provera forme
document.getElementById("btnPosalji").addEventListener("click", provera);

function provera(){
    let validno=true;
    
    let ime, prezime, brojTelefona, email, datum, tipPlovila, plovilo, novosti, dodatniZahtevi, uslovi;
    ime=document.getElementById("tbIme").value.trim();
    prezime=document.getElementById("tbPrezime").value.trim();
    brojTelefona=document.getElementById("tbBroj").value.trim();
    email=document.getElementById("tbEmail").value.trim();
    datum=document.getElementById("tbDatum").value.trim();
    tipPlovila=document.getElementById("selectTip").value;
    plovilo=document.getElementById("selectPlovilo").value;
    novosti=document.getElementsByName("rbNovosti");
    dodatniZahtevi=document.getElementById("tbDodatni").value.trim();
    uslovi=document.getElementById("cbUslovi");

    let reImePrezime, reBroj, reEmail, reDatum;
    reImePrezime=/^[A-Z][a-z]{2,14}(\s[A-Z][a-z]{2,14})*$/;
    reBroj=/^06[01234569]\/[\d]{3}\-[\d]{3,4}$/;
    reEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    reDatum=/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;

    let imeGreska, prezimeGreska, brojGreska, emailGreska, datumGreska, tipPlovilaGreska, ploviloGreska, novostiGreska, dodatniZahteviGreska, usloviGreska, uspesnoP;
    imeGreska=document.getElementById("imeGreska");
    prezimeGreska=document.getElementById("prezimeGreska");
    brojGreska=document.getElementById("brojGreska");
    emailGreska=document.getElementById("emailGreska");
    datumGreska=document.getElementById("datumGreska");
    tipPlovilaGreska=document.getElementById("tipGreska");
    ploviloGreska=document.getElementById("ploviloGreska");
    novostiGreska=document.getElementById("novostiGreska");
    dodatniZahteviGreska=document.getElementById("dodatniGreska");
    usloviGreska=document.getElementById("usloviGreska");
    uspesnoP=document.getElementById("uspesno");

    if (ime == ""){
        validno = false;
        imeGreska.innerHTML = "Molimo unesite ime";
    }
    else if (!reImePrezime.test(ime)){
            validno = false;
            imeGreska.innerHTML = "Ime nije u ispravnom formatu";
    }
    else{
            imeGreska.innerHTML = "";
    }

    if (prezime == ""){
        validno = false;
        prezimeGreska.innerHTML = "Molimo unesite prezime";
    }
    else if (!reImePrezime.test(prezime)){
            validno = false;
            prezimeGreska.innerHTML = "Prezime nije u ispravnom formatu";
    }
    else{
        prezimeGreska.innerHTML = "";
    }

    if (brojTelefona == ""){
        validno = false;
        brojGreska.innerHTML = "Molimo unesite broj telefona";
    }
    else if (!reBroj.test(brojTelefona)){
            validno = false;
            brojGreska.innerHTML = "Broj telefona nije u ispravnom formatu";
    }
    else{
        brojGreska.innerHTML = "";
    }

    if (email == ""){
        validno = false;
        emailGreska.innerHTML = "Molimo unesite email";
    }
    else if (!reEmail.test(email)){
            validno = false;
            emailGreska.innerHTML = "Email nije u ispravnom formatu";
    }
    else{
        emailGreska.innerHTML = "";
    }

    if (datum == ""){
        validno = false;
        datumGreska.innerHTML = "Molimo unesite datum posete";
    }
    else if (!reDatum.test(datum)){
            validno = false;
            datumGreska.innerHTML = "Datum posete nije u ispravnom formatu";
    }
    else{
        datumGreska.innerHTML = "";
    }

    if(tipPlovila == "0"){
        validno = false;
        tipPlovilaGreska.innerHTML = "Niste izabrali tip plovila";
    }
    else{
        tipPlovilaGreska.innerHTML = "";
    }

    if(plovilo == "0"){
        validno = false;
        ploviloGreska.innerHTML = "Niste izabrali model plovila";
    }
    else{
        ploviloGreska.innerHTML = "";
    }

    let novostiIzbor = "";
    for(let i=0;i<novosti.length;i++){
        if(novosti[i].checked){
            novostiIzbor = novosti[i].value;
            break;
        }
    }

    if(novostiIzbor == ""){
        validno = false;
        novostiGreska.innerHTML = "Niste izabrali novosti";
    }
    else{
        novostiGreska.innerHTML = "";
    }

    if (dodatniZahtevi.length>1000){
        validno = false;
        dodatniZahteviGreska.innerHTML = "Maksimalan broj karaktera je 1000";
    }
    else{
        dodatniZahteviGreska.innerHTML = "";
    }

    if(!uslovi.checked){
        validno = false;
        usloviGreska.innerHTML = "Morate čekirati uslove korišćenja";
    }
    else{
        usloviGreska.innerHTML = "";
    }
    if(validno){
        uspesnoP.innerHTML="Uspesno ste poslali zahtev";
    }
    else{
        uspesnoP.innerHTML="";
    }
}