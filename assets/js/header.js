//Uređivanje dropdown menija
$(document).ready(function(){
    $('#hamburger').css({'width':'50px','padding-left':'8px'});
    $('#meni li ul').css({
        display:"none",
        left:"0"
    });
    $('#meni li').click(function(){
        $('#meni li ul').toggle("slow");
    });
    $('#meni ul li a').hover(function(){
        $(this).css({'paddingLeft':'6%', 'width':'94%'})},
        function(){
        $(this).css({'paddingLeft':'4%', 'width':'inherit'})}
    );
});