//Uređivanje bannera
$(document).ready(function(){
    $('#slikaBanner').css({'borderRadius':'100%', 'display':'none'});
    $('#slikaBanner').slideDown(1000);

    $('#bannerPocetna p').css({'display':'none'}).delay(1000).slideDown(2000);
});

function slideShow(){
    var current = $('#slide .show');
    var next = current.next().length ? current.next() : current.parent().children(':first');
    
    current.hide().removeClass('show');
    next.fadeIn().addClass('show');
    
    setTimeout(slideShow, 3000);
}

//Ispis slajdera
try{
    $.ajax({
        url :"assets/data/slajder.json",
        method: "GET",
        dataType: "json",
        success: function(data,status,xhr){
            var divSlide=document.getElementById("slide");
            var ispisSlide="";
            data.forEach(el=>{
                ispisSlide+=`<img src="${el.src}" alt="${el.alt}"/>`;
            });
            divSlide.innerHTML=ispisSlide;

            //Pokretanje slajdera
            $("#slide img:first").addClass("show");
            slideShow();
        },
        error:function(xhr,status,error){
            console.log(error);
        }
    });
}
catch(error){
    console.log("Ajax zahtev nije uspeo zbog: "+error);
}

//Ispis div-a features
try{
        $.ajax({
        url :"assets/data/features.json",
        method: "GET",
        dataType: "json",
        success: function(data,status,xhr){
            let divFeatures=document.getElementById("features");
            let ispisFeatures="";
            data.forEach(el=>{
                ispisFeatures+=`<div class="feature">
                            <div class="image rounded"><img src="${el.src}" alt="${el.alt}"/></div>
                            <div class="content">
                                <header>
                                    <h4>${el.h4}</h4>
                                    <p>${el.pHeader}</p>
                                </header>
                                <p>${el.pFeatures}</p>
                            </div>
                        </div>`;
            });
            divFeatures.innerHTML=ispisFeatures;
        },
        error:function(xhr,status,error){
            console.log(error);
        }
    });
}
catch(error){
    console.log("Ajax zahtev nije uspeo zbog: "+error);
}