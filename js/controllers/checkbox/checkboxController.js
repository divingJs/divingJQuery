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


$('#configura').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'Creacion',href:'/pages/CheckBox/Config/creacion.html'},
            {text:'icon',href:'/pages/CheckBox/Config/icon.html'},
            {text:'Dir',href:'/pages/CheckBox/Config/dir.html'},
            {text:'Label',href:'/pages/CheckBox/Config/label.html'},
            {text:'Checked',href:'/pages/CheckBox/Config/checked.html'}
        ]},
        {text:'Events',elements:[
            {text:'Click',href:'/pages/CheckBox/Config/click.html'}
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
});

$('#salidaCofigura').load('pages/CheckBox/Config/creacion.html');

