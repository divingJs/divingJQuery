/*
    $('#previo').click(function(){
        var cnt = $( this ).parent().find('div[class*=d-article]');
        $.each(cnt,function(i,v){
            if($(v).attr('id')!='previo'){
                $(v).toggle('hidden');
            }
        });
    });

    $('#checkeds').divCheckBox({
        items:[{text:' uno'    , value:'uno'},
               {text:' dos'    , value:'dos'},
               {text:' tres'   , value:'tres'},
               {text:' cuatro' , value:'cuatro'}
              ],
        click:function(){
            var chk = $('#checkeds').data('divCheckBox');
            console.log( chk.getValue() );
        }
    });
    $('#checkeds-icon').divCheckBox({
        items:[{text:' uno'    , value:'uno'},
               {text:' dos'    , value:'dos'},
               {text:' tres'   , value:'tres'},
               {text:' cuatro' , value:'cuatro'}
              ],
        icon:{
            checked:'icon-check-circle1',
            unchecked:'icon-panorama_fish_eyeradio_button_unchecked'
        },
        click:function(){
            var chk = $('#checkeds-icon').data('divCheckBox');
            console.log( chk.getValue() );
        }
    });

    $('#checkeds-left').divCheckBox({
        items:[{text:' uno'    , value:1},
               {text:' dos'    , value:2},
               {text:' tres'   , value:3},
               {text:' cuatro' , value:4}
              ],
        icon:{
            checked:'icon-check-circle1',
            unchecked:'icon-panorama_fish_eyeradio_button_unchecked'
        },
        click:function(){
            var chk = $('#checkeds-left').data('divCheckBox');
            console.log( chk.getValue() );
        },
        dir:'left'
    });

    $('#checkeds-label').divCheckBox({
        items:[{text:' uno'    , value:1},
               {text:' dos'    , value:2},
               {text:' tres'   , value:3},
               {text:' cuatro' , value:4}
              ],
        click:function(){
            var chk = $('#checkeds-label').data('divCheckBox');
            console.log( chk.getValue() );
        },
        dir:'left',
        type: 'label'
    });
*/

/*$('#configura').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'Checked',href:'/pages/CheckBox/Config/checked.html'},
            {text:'Dir',href:'/pages/CheckBox/Config/dir.html'},
            {text:'Items',href:'/pages/CheckBox/Config/items.html'},
            {text:'Icono',href:'/pages/CheckBox/Config/icon.html'},
            {text:'Label',href:'/pages/CheckBox/Config/label.html'},
            {text:'Value',href:'/pages/CheckBox/Config/value.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Click',href:'/pages/CheckBox/Config/click.html'},
            {text:'Destroy',href:'/pages/CheckBox/Config/destroy.html'},
            {text:'GetValue',href:'/pages/CheckBox/Config/getValue.html'}
        ]},
        {text:'Methodos',elements:[
            {text:'Add',href:'/pages/CheckBox/config/add.html'},
            {text:'Remove',href:'/pages/CheckBox/config/remove.html'}
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
            {text:'Checked',href:'/pages/CheckBox/Config/checked.html'},
            {text:'Dir',href:'/pages/CheckBox/Config/dir.html'},
            {text:'Items',href:'/pages/CheckBox/Config/items.html'},
            {text:'Icono',href:'/pages/CheckBox/Config/icon.html'},
            {text:'Label',href:'/pages/CheckBox/Config/label.html'},
            {text:'Value',href:'/pages/CheckBox/Config/value.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Click',href:'/pages/CheckBox/Config/click.html'},
            {text:'Destroy',href:'/pages/CheckBox/Config/destroy.html'},
            {text:'GetValue',href:'/pages/CheckBox/Config/getValue.html'}
        ]},
        {text:'Methodos',elements:[
            {text:'Add',href:'/pages/CheckBox/config/add.html'},
            {text:'Remove',href:'/pages/CheckBox/config/remove.html'}
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



$('#salidaCofigura').load('pages/CheckBox/Config/items.html');

