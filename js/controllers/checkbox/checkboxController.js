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