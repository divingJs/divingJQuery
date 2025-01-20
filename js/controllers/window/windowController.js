
var dts = new diving.data.DataSource({
     data:[
        {text:'Configuracion',elements:[
            {text:'Content',href:'/pages/Window/Config/content.html'}
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