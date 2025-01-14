/*$('#btn').divButton({
	text:'Launch demo',
	type:'primary',
	click:function(){
		var a = $('#salidaCofigura').divConfirmation({
			text:'hola que tal como estas',//$('#mensaje'),
			title:'TITULO CONFIRMACION',
			class:'personal',
			acept:function(){
				console.log( 'dio click en aceptar');
			},
			cancel:function(){
				console.log( 'dio click en cancelar');
				var m = $('#salidaCofigura').data('divConfirmation');
				m.close();
			}
		}).data('divConfirmation');

		a.open();
	}
});
*/


/*$('#configura').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'Text',href:'/pages/Confirmation/Config/text.html'},
            {text:'Title',href:'/pages/Confirmation/Config/title.html'},
            {text:'Class',href:'/pages/Confirmation/Config/class.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Destroy',href:'/pages/Confirmation/Config/destroy.html'},
            {text:'Cancel',href:'/pages/Confirmation/Config/cancel.html'},
            {text:'Aceptar',href:'/pages/Confirmation/Config/acept.html'}
        ]},
        {text:'Methodos',elements:[
            {text:'Open',href:'/pages/Confirmation/Config/open.html'},
            {text:'Close',href:'/pages/Confirmation/Config/close.html'}
        ]}
    ],
    openTo:'#salidaCofigura',
    class:'list-group-flush',
    click:function(){
        var d = $('#configura').data('divListView');
        var c = d.selected;
        $.each(d.items,function(i,v){
            $(v).removeClass('list-group-item-info');
        });
        $(this).addClass('list-group-item-info');
        if(d.openTo!=null){
             $( d.openTo ).load(
                (c.href.startsWith('http')?
                    c.href:
                    (window.location.href.replace('index.html','').replace(/\#$/gm,''))+c.href
                )
            );
        }
    }
});*/


var dts = new diving.data.DataSource({
     data:[
        {text:'Configuracion',elements:[
            {text:'Text',href:'/pages/Confirmation/Config/text.html'},
            {text:'Title',href:'/pages/Confirmation/Config/title.html'},
            {text:'Class',href:'/pages/Confirmation/Config/class.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Destroy',href:'/pages/Confirmation/Config/destroy.html'},
            {text:'Cancel',href:'/pages/Confirmation/Config/cancel.html'},
            {text:'Aceptar',href:'/pages/Confirmation/Config/acept.html'}
        ]},
        {text:'Methodos',elements:[
            {text:'Open',href:'/pages/Confirmation/Config/open.html'},
            {text:'Close',href:'/pages/Confirmation/Config/close.html'}
        ]}
    ]
});

var g = $('#configura').divListView({
     dataSource:dts,
     textField:'text',
     valueField:'href',
     class:'list-group-flush',
     click:function(){
          var _lv = $('#configura').data('divListView');
          var href = _lv.selected[0].value;
          $( '#salidaCofigura' ).load(
                (href.startsWith('http')?
                href:
                (window.location.href.replace('index.html','').replace(/\#$/gm,'')) + href
                )
            );
     }
}).data('divListView');



$('#salidaCofigura').load('pages/Confirmation/Config/text.html');

