/*
$('#salidaCofigura').divAlert({
	text:$('#mensaje'),
	class:'personal'
});
$('#not1').divAlert({
	text:'Lorem ipsum dolor sit amet.<br/>'+
		 'Eum numquam eaque voluptates quibusdam.<br/>'+
		 'Quam tempora iusto architecto ipsam!',
	type:'success',
	icon:{
		class:'icon-flashed-face-glasses1',
		dir:'left'
	}
});
$('#not2').divAlert({
	text:'Lorem ipsum dolor sit amet.<br/>'+
		 'Eum numquam eaque voluptates quibusdam.<br/>'+
		 'Quam tempora iusto architecto ipsam!',
	icon:{
		class:'icon-alert-triangle',
		dir:'right'
	}
});
$('#not3').divAlert({
	text:'Lorem ipsum dolor sit amet.<br/>'+
		 'Eum numquam eaque voluptates quibusdam.<br/>'+
		 'Quam tempora iusto architecto ipsam!',
	close:true
});
$('#not4').divAlert({
	text:'Lorem ipsum dolor sit amet.<br/>'+
		 'Eum numquam eaque voluptates quibusdam.<br/>'+
		 'Quam tempora iusto architecto ipsam!'
}).data('divAlert').closeTime(1000);
*/



$('#config').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'Text',href:'/pages/Alert/Config/text.html'},
            {text:'Type',href:'/pages/Alert/Config/type.html'},
            {text:'Class',href:'/pages/Alert/Config/class.html'},
            {text:'Icon',href:'/pages/Alert/Config/icon.html'},
            {text:'Float',href:'/pages/Alert/Config/float.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Close',href:'/pages/Alert/Config/close.html'}/*,
            {text:'Open',href:'/pages/Alert/Config/methodOpen.html'},
            {text:'Remove',href:'/pages/Alert/Config/remove.html'},
            {text:'selected',href:'/pages/Alert/Config/getSelected.html'}*/
        ]},
        {text:'Methods',elements:[
        	{text:'CloseTime',href:'/pages/Alert/Config/closeTime.html'}
        ]}
    ],
    openTo:'#salidaCofig',
    class:'list-group-flush',
    click:function(){
        var d = $('#config').data('divListView');
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
