/*$('#text1').divText({
    placeHolder:'Hola Mundo',
    change:function(){
        var t = $("#text1").data('divText');
        console.log(t.text);
    }//,
    //keyup:function(r){ var t = $("#text1").data('divText'); console.log(t.text); }
    //keydown:function(){ var t = $("#text1").data('divText'); console.log(t.text); }
});
$('#text2').divText({
    placeHolder:'area de texto',
    multiple:{
        row:10,
        col:30,
        resize:false
    }
});
$('#text3').divText({
    placeHolder:'55',
    type:'number',
    step:5,
    min:0,
    max:100
});*/
/*
$('#config').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'PlaceHolder',href:'/pages/Text/Config/placeHolder_1.html'},
            {text:'PlaceHolder',href:'/pages/Text/Config/placeHolder.html'},
            {text:'Type',href:'/pages/Text/Config/type.html'},
            {text:'Step',href:'/pages/Text/Config/step.html'},
            {text:'Min',href:'/pages/Text/Config/min.html'},
            {text:'Max',href:'/pages/Text/Config/max.html'},
            {text:'Multiple',href:'/pages/Text/Config/multiple.html'},
            {text:'Resize',href:'/pages/Text/Config/resize.html'}
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



var dts = new diving.data.DataSource({
     data:[
        {text:'Configuracion',elements:[
            //{text:'PlaceHolder',href:'/pages/Text/Config/placeHolder_1.html'},
            {text:'PlaceHolder',href:'/pages/Text/Config/placeHolder.html'},
            {text:'Type',href:'/pages/Text/Config/type.html'},
            {text:'Step',href:'/pages/Text/Config/step.html'},
            {text:'Min',href:'/pages/Text/Config/min.html'},
            {text:'Max',href:'/pages/Text/Config/max.html'},
            {text:'Multiple',href:'/pages/Text/Config/multiple.html'},
            {text:'Resize',href:'/pages/Text/Config/resize.html'}
        ]},
        {text:'Event',elements:[
            {text:'KeyUp',href:'/pages/Text/Config/keyup.html'},
            {text:'KeyDown',href:'/pages/Text/Config/keydown.html'},
            {text:'Change',href:'/pages/Text/Config/change.html'}
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