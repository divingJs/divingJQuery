/*$('#config').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'Class',href:'/pages/ListView/Config/class.html'},
            {text:'Elements',href:'/pages/ListView/Config/elements.html'},
            {text:'SubElements',href:'/pages/ListView/Config/subElements.html'},
            {text:'Template',href:'/pages/ListView/Config/template.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Click',href:'/pages/ListView/Config/click.html'},
            {text:'AddElement',href:'/pages/ListView/Config/addElement.html'},
            {text:'remove',href:'/pages/ListView/Config/remove.html'},
            {text:'remove by index',href:'/pages/ListView/Config/removeByIndex.html'}
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



var dts = new diving.data.DataSource({
     data:[
        {text:'Configuracion',elements:[
            {text:'Class',href:'/pages/ListView/Config/class.html'},
            {text:'Elements',href:'/pages/ListView/Config/elements.html'},
            {text:'SubElements',href:'/pages/ListView/Config/subElements.html'},
            {text:'Template',href:'/pages/ListView/Config/template.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Click',href:'/pages/ListView/Config/click.html'},
            {text:'AddElement',href:'/pages/ListView/Config/addElement.html'},
            {text:'remove',href:'/pages/ListView/Config/remove.html'}
            //{text:'remove by index',href:'/pages/ListView/Config/removeByIndex.html'}
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