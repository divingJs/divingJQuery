
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