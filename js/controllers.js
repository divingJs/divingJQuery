
$('#menu').divListView({
    elements:[
        {text:'Acordion'    , href:"/pages/Acordion/index.html"},
        {text:'Alert'       , href:'/pages/Alert/index.html'},
        {text:'Button'      , href:'/pages/Button/index.html'},
        {text:'Checkbox'    , href:'/pages/Checkbox/index.html'},
        {text:'Chart'       , href:'/pages/Chart/index.html'},
        {text:'Confirmation', href:'/pages/Confirmation/index.html'},
        {text:'Grid'        , href:'/pages/Grid/index.html'},
        {text:'ListView'    , href:'/pages/ListView/index.html'},
        {text:'MultiSelect' , href:'/pages/MultiSelect/index.html'},
        {text:'RadioButton' , href:'/pages/RadioButton/index.html'},
        {text:'Tabstrip'    , href:'/pages/TabsTrip/index.html'},
        {text:'Text'        , href:'/pages/Text/index.html'}
        ],
    openTo:'#area'
    ,class:'list-group-flush',
    click:function(){
        var d = $('#menu').data('divListView');
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
$('#area').load('pages/p/home.html');