$('#previo').click(function(){
    var cnt = $( this ).parent().find('div[class*=d-article]');
    $.each(cnt,function(i,v){
        if($(v).attr('id')!='previo'){
            $(v).toggle('hidden');
        }
    });
});
/*botones*
    $('#btn1').divButton({
        text:'primary',type:'primary'
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
*/
/*
$('#configButton').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'Text',href:'/pages/Button/Config/creacion.html'},
            {text:'Type',href:'/pages/Button/Config/type.html'},
            {text:'Icono',href:'/pages/Button/Config/icon.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Click',href:'/pages/Button/Config/click.html'}
            ]},
        {text:'Methods',elements:[
            {text:'Destroy',href:'/pages/Button/Config/destroy.html'},
            {text:'Enabled',href:'/pages/Button/Config/enabled.html'},
            {text:'setText',href:'/pages/Button/Config/settext.html'}
        ]}
    ],
    openTo:'#salidaCofigButton',
    class:'list-group-flush',
    click:function(){
        var d = $('#configButton').data('divListView');
        var c = d.selected;
        $.each(d.items,function(i,v){
            $(v).removeClass('list-group-item-info');
        });
        $(this).addClass('list-group-item-info');
        if(d.openTo!=null){
             $( d.openTo ).load(
                (c.href.startsWith('http')?
                c.href:
                (window.location.href.replace('index.html','').replace(/\#$/gm,'')) + c.href
                )
            );
        }
    }
});
*/
var dts = new diving.data.DataSource({
     data:[
        {text:'Configuracion',elements:[
            {text:'Text',href:'/pages/Button/Config/creacion.html'},
            {text:'Type',href:'/pages/Button/Config/type.html'},
            {text:'Icono',href:'/pages/Button/Config/icon.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Click',href:'/pages/Button/Config/click.html'}
            ]},
        {text:'Methods',elements:[
            {text:'Destroy',href:'/pages/Button/Config/destroy.html'},
            {text:'Enabled',href:'/pages/Button/Config/enabled.html'},
            {text:'setText',href:'/pages/Button/Config/settext.html'}
        ]}
    ]
});

var g = $('#configButton').divListView({
     dataSource:dts,
     textField:'text',
     valueField:'href',
     class:'list-group-flush',
     click:function(){
          var _lv = $('#configButton').data('divListView');
          var href = _lv.selected[0].value;
          $( '#salidaCofigButton' ).load(
                (href.startsWith('http')?
                href:
                (window.location.href.replace('index.html','').replace(/\#$/gm,'')) + href
                )
            );
     }
}).data('divListView');
$('#salidaCofigButton').load('pages/Button/Config/creacion.html');



//multas 272