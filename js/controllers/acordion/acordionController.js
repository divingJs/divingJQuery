
var dts = new diving.data.DataSource({
     data:[
        {text:'Configuracion',elements:[
            {text:'Items',href:'/pages/acordion/Config/items.html'},
            {text:'Show',href:'/pages/acordion/Config/show.html'}
        ]},
        {text:'Methods',elements:[
            {text:'AddElement',href:'/pages/acordion/Config/addElement.html'},
            {text:'Destroy',href:'/pages/acordion/Config/destroy.html'},
            {text:'Remove',href:'/pages/acordion/Config/remove.html'}
        ]}
    ]
});

var g = $('#config').divListView({
     dataSource:dts,
     textField:'text',
     valueField:'href',
     class:'list-group-flush',
     click:function(){
          var _lv = $('#config').data('divListView');
          var href = _lv.selected[0].value;
          $( '#salidaCofig' ).load(
                (href.startsWith('http')?
                href:
                (window.location.href.replace('index.html','').replace(/\#$/gm,'')) + href
                )
            );
     }
}).data('divListView');

/*
$('#config').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'Items',href:'/pages/acordion/Config/items.html'},
            {text:'Show',href:'/pages/acordion/Config/show.html'}
        ]},
        {text:'Methods',elements:[
            {text:'AddElement',href:'/pages/acordion/Config/addElement.html'},
            {text:'Destroy',href:'/pages/acordion/Config/destroy.html'},
            {text:'Remove',href:'/pages/acordion/Config/remove.html'}
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
});*/

$('#salidaCofig').load('pages/acordion/Config/items.html');

