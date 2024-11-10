
$('#listview').divListView({
    elements:[
        {text:'Elemento 1' , href:'#'},
        {text:'Elemento 2' , href:'#'},
        {text:'Elemento 3' , href:'#'},
        {text:'Elemento 4' , href:'#'},
        {text:'Elemento 5' , href:'#'},
        {text:'Elemento 6' , href:'#'},
        {text:'Elemento 7' , href:"#"}
        ]
});



$('#config').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'Class',href:'/pages/ListView/Config/class.html'},
            {text:'Elements',href:'/pages/ListView/Config/elements.html'},
            {text:'SubElements',href:'/pages/ListView/Config/subElements.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Click',href:'/pages/ListView/Config/click.html'}
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

//$('#salidaCofig').load('pages/Button/Config/creacion.html');

$('#previo').click(function(){
    var cnt = $( this ).parent().find('div[class*=d-article]');
    $.each(cnt,function(i,v){
        if($(v).attr('id')!='previo'){
            $(v).toggle('hidden');
        }
    });
});
