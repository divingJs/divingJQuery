/*
var nrtn = [];
$.each(rtn,function(i,v){
    nrtn.push({VALUE:v.ID_ART,MENSAJE:v.ID_ART});
});
var dtsMs = new dvn.store.Source({
    data:nrtn,
    schema:{model:{fields:{VALUE:{type:'number'},MENSAJE:{type:'string'}}}}
});
*/

$('#menu').divListView({
    elements:[
        {text:'Button'      , href:'/pages/Button/index.html'},
        {text:'Checkbox'    , href:'/pages/Checkbox/index.html'},
        {text:'Chart'    , href:'/pages/Chart/index.html'},
        {text:'Grid'        , href:'/pages/Grid/index.html'},
        {text:'ListView'    , href:'/pages/ListView/index.html'},
        {text:'MultiSelect' , href:'/pages/MultiSelect/index.html'},
        {text:'RadioButton' , href:'/pages/RadioButton/index.html'},
        {text:'Tabstrip'    , href:'/pages/TabsTrip/index.html'},
        {text:'Text'        , href:'/pages/Text/index.html'}
        ],
    openTo:'#area'
    ,class:'list-group-flush'
});
$('#area').load('pages/Button/index.html');