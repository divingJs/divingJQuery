$('#previo').click(function(){
    var cnt = $( this ).parent().find('div[class*=d-article]');
    $.each(cnt,function(i,v){
        if($(v).attr('id')!='previo'){
            $(v).toggle('hidden');
        }
    });
});
/*botones*/
$('#btn1').divButton({
    text:'primary',type:'primary'/*,
    icon:{
        class:'icon-bite',
        pos:'before'
    }*/
    ,click:function(){
        $('#salidaButton').text('Dio click en primary');
    }
});
$('#btn2').divButton({
    text:'secondary',type:'secondary'
    ,click:function(){
        $('#salidaButton').text('Dio click en secondary');
    }
});
$('#btn3').divButton({
    text:'success',type:'success'
    ,click:function(){
        $('#salidaButton').text('Dio click en success');
    }
});
$('#btn4').divButton({
    text:'danger',type:'danger'
    ,click:function(){
        $('#salidaButton').text('Dio click en danger');
    }
});
$('#btn5').divButton({
    text:'warning',type:'warning'
    ,click:function(){
        $('#salidaButton').text('Dio click en warning');
    }
});
$('#btn6').divButton({
    text:'info',type:'info'
    ,click:function(){
        $('#salidaButton').text('Dio click en info');
    }
});
$('#btn7').divButton({
    text:'light',type:'light'
    ,click:function(){
        $('#salidaButton').text('Dio click en light');
    }
});
$('#btn8').divButton({
    text:'dark',type:'dark'
    ,click:function(){
        $('#salidaButton').text('Dio click en dark');
    }
});
$('#btn9').divButton({
    text:'link',type:'link'
    ,click:function(){
        $('#salidaButton').text('Dio click en link');
    }
});





$('#configButton').divListView({
    elements:[
        {text:'Creacion',href:'/pages/Button/Config/creacion.html'},
        {text:'Click',href:'/pages/Button/Config/click.html'},
        {text:'Icono',href:'/pages/Button/Config/icon.html'}
    ],
    openTo:'#salidaCofigButton',
    class:'list-group-flush'

});

$('#salidaCofigButton').load('pages/Button/Config/creacion.html');



//multas 272