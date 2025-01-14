var dts = new diving.data.DataSource({
     data:[
        {text:'Configuracion',elements:[
            {text:'Text',href:'/pages/Alert/Config/text.html'},
            {text:'Type',href:'/pages/Alert/Config/type.html'},
            {text:'Class',href:'/pages/Alert/Config/class.html'},
            {text:'Icon',href:'/pages/Alert/Config/icon.html'},
            {text:'Float',href:'/pages/Alert/Config/float.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Close',href:'/pages/Alert/Config/close.html'}
        ]},
        {text:'Methods',elements:[
            {text:'CloseTime',href:'/pages/Alert/Config/closeTime.html'}
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
            {text:'Text',href:'/pages/Alert/Config/text.html'},
            {text:'Type',href:'/pages/Alert/Config/type.html'},
            {text:'Class',href:'/pages/Alert/Config/class.html'},
            {text:'Icon',href:'/pages/Alert/Config/icon.html'},
            {text:'Float',href:'/pages/Alert/Config/float.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Close',href:'/pages/Alert/Config/close.html'}
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
*/