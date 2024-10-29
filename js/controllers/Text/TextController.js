
$('#text1').divText({
    placeHolder:'Hola Mundo',
    change:function(){
        var t = $("#text1").data('divText');
        console.log(t.text);
    }//,
    //keyup:function(r){ var t = $("#text1").data('divText'); console.log(t.text); }
    //keydown:function(){ var t = $("#text1").data('divText'); console.log(t.text); }
});
$('#text2').divText({
    placeHolder:'area de texto',
    multiple:{
        row:10,
        col:30,
        resize:false
    }
});
$('#text3').divText({
    placeHolder:'55',
    type:'number',
    step:5,
    min:0,
    max:100
});

