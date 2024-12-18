/*

$('#previo').click(function(){
    var cnt = $( this ).parent().find('div[class*=d-article]');
    $.each(cnt,function(i,v){
        if($(v).attr('id')!='previo'){
            $(v).toggle('hidden');
        }
    });
});
var dts = new dvn.data.DataSource({
     data:rtn,
     sort:{field: 'ID',str:'desc'},
     schema:{
          model:{
               fields:{
                ID            :{type:'number'},
                PRODUCTO      :{type:'string'},
                CATEGORIA     :{type:'string'},
                PRECIO        :{type:'number'},
                STOCK         :{type:'number'},
                FECHA_INGRESO :{type:'date'}
               }
          }
     }
});
$('#grid').divGrid({
    dataSource:dts,
    columns:[
        {field:'ID'            , title:'ID'},
        {field:'PRODUCTO'      , title:'PRODUCTO'},
        {field:'CATEGORIA'     , title:'CATEGORIA'},
        {field:'PRECIO'        , title:'PRECIO',format:"{0:u2}"},
        {field:'STOCK'         , title:'STOCK',attributes:{'style':"#=STOCK<20?'background:rgb(166,166,241)':'background:rgb(211,140,140)'#"}},
        {field:'FECHA_INGRESO' , title:'FECHA_INGRESO',format:'{0:dd/MM/yyyy}'}
        ],
    width: '100%'
    ,height: '300px',
    sortable:true
});
*/
var g = $('#grid').data('divGrid');
$('#config').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'Creacion',href:'/pages/Grid/Config/creacion.html'},
            {text:'Columns',elements:[
                {text:'Fields',href:'/pages/Grid/Config/columns.html'},
                {text:'width',href:'/pages/Grid/Config/column.with.html'},
                {text:'Format',href:'/pages/Grid/Config/fromat.html'},
                {text:'Attributes',href:'/pages/Grid/Config/attributes.html'},
                {text:'Editor',href:'/pages/Grid/Config/columns.editor.html'}
                ]},
            {text:'Sortable',href:'/pages/Grid/Config/sortable.html'},
            {text:'Scrollable',href:'/pages/Grid/Config/scrollable.html'},
            {text:'Group',href:'/pages/Grid/Config/group.html'}
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
$('#salidaCofigButton').load('/pages/Grid/Config/creacion.html');


