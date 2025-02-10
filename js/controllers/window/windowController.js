
var dts = new diving.data.DataSource({
     data:[
        {text:'Configuracion',elements:[
            {text:'Actions',href:'/pages/Window/Config/actions.html'},
            {text:'Center',href:'/pages/Window/Config/center.html'},
            {text:'Class',href:'/pages/Window/Config/class.html'},
            {text:'Content',href:'/pages/Window/Config/content.html'},
            {text:'Height',href:'/pages/Window/Config/height.html'},
            {text:'Scrollable',href:'/pages/Window/Config/scrollable.html'},
            {text:'Title',href:'/pages/Window/Config/title.html'},
            {text:'width',href:'/pages/Window/Config/width.html'}
        ]},
        {text:'Methods',elements:[
          {text:'Modal',href:'/pages/Window/Config/modal.html'}
        ]},
        {text:'Events',elements:[
          {text:'Close',href:'/pages/Window/Config/close.html'}
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