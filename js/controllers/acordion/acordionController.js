


$('#config').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'Items',href:'/pages/acordion/Config/items.html'},
            {text:'Show',href:'/pages/acordion/Config/show.html'}/*,
            {text:'Icono',href:'/pages/acordion/Config/icon.html'}*/
        ]},
        /*{text:'Eventos',elements:[
            {text:'Destroy',href:'/pages/acordion/Config/destroy.html'}
            ]},*/
        {text:'Methods',elements:[
            {text:'AddElement',href:'/pages/acordion/Config/addElement.html'},
            {text:'Destroy',href:'/pages/acordion/Config/destroy.html'},
            {text:'Remove',href:'/pages/acordion/Config/remove.html'}/*,
            {text:'setText',href:'/pages/acordion/Config/settext.html'}*/
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

$('#salidaCofig').load('pages/acordion/Config/items.html');

