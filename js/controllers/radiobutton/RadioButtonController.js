/*
    $('#radioSimple').divRadioButton({
        items:[{text:' uno'    , value:1},
               {text:' dos'    , value:2},
               {text:' tres'   , value:3},
               {text:' cuatro' , value:4}
              ],
        click:function(){
            var chk = $('#radioSimple').data('divRadioButton');
            console.log( chk.getValue() );
        }
    });

    $('#radioIcon').divRadioButton({
        items:[{text:' uno'    , value:1},
               {text:' dos'    , value:2},
               {text:' tres'   , value:3},
               {text:' cuatro' , value:4}
              ],
        icon:{
            checked:'icon-toggle_on',
            unchecked:'icon-toggle_off'
        },
        click:function(){
            var chk = $('#radioIcon').data('divRadioButton');
            console.log( chk.getValue() );
        }
    });

    $('#radioIcon-left').divRadioButton({
        items:[{text:' uno'    , value:1},
               {text:' dos'    , value:2},
               {text:' tres'   , value:3},
               {text:' cuatro' , value:4}
              ],
        icon:{
            checked:'icon-toggle-on',
            unchecked:'icon-toggle-off'
        },
        dir:'left',
        click:function(){
            var chk = $('#radioIcon-left').data('divRadioButton');
            console.log( chk.getValue() );
        }
    });

    $('#radioIcon-label').divRadioButton({
        items:[{text:' uno'    , value:1},
               {text:' dos'    , value:2},
               {text:' tres'   , value:3},
               {text:' cuatro' , value:4}
              ],
        icon:{
            checked:'icon-toggle_on',
            unchecked:'icon-toggle_off'
        },
        click:function(){
            var chk = $('#radioIcon-label').data('divRadioButton');
            console.log( chk.getValue() );
        },
        dir:'left',
        type: 'label'
    });

*/


/*

$('#configura').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'Checked',href:'/pages/radiobutton/Config/checked.html'},
            {text:'Dir',href:'/pages/radiobutton/Config/dir.html'},
            {text:'Items',href:'/pages/radiobutton/Config/items.html'},
            {text:'Icono',href:'/pages/radiobutton/Config/icon.html'},
            {text:'Label',href:'/pages/radiobutton/Config/label.html'},
            {text:'Value',href:'/pages/radiobutton/Config/value.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Click',href:'/pages/radiobutton/Config/click.html'},
            {text:'Destroy',href:'/pages/radiobutton/Config/destroy.html'},
            {text:'GetValue',href:'/pages/radiobutton/Config/getValue.html'}
        ]},
        {text:'Methodos',elements:[
            {text:'Add',href:'/pages/radiobutton/config/add.html'},
            {text:'Remove',href:'/pages/radiobutton/config/remove.html'}
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
            {text:'Checked',href:'/pages/radiobutton/Config/checked.html'},
            {text:'Dir',href:'/pages/radiobutton/Config/dir.html'},
            {text:'Items',href:'/pages/radiobutton/Config/items.html'},
            {text:'Icono',href:'/pages/radiobutton/Config/icon.html'},
            {text:'Label',href:'/pages/radiobutton/Config/label.html'},
            {text:'Value',href:'/pages/radiobutton/Config/value.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Click',href:'/pages/radiobutton/Config/click.html'},
            {text:'Destroy',href:'/pages/radiobutton/Config/destroy.html'},
            {text:'GetValue',href:'/pages/radiobutton/Config/getValue.html'}
        ]},
        {text:'Methodos',elements:[
            {text:'Add',href:'/pages/radiobutton/config/add.html'},
            {text:'Remove',href:'/pages/radiobutton/config/remove.html'}
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

$('#salidaCofigura').load('pages/radiobutton/Config/items.html');

