/*Multiselects*/
/*var dtsMulti = [];
$.each(rtn,function(i,v){
    dtsMulti.push({VALUE:v.ID,MENSAJE:v.CATEGORIA});
});
dtsMulti.sort(function(a,b){return a.VALUE - b.VALUE;});
var dtsMt = dtsMulti.filter(function(item, index, self) {
    return index === self.findIndex(function(t) {
        return t.VALUE === item.VALUE && t.MENSAJE === item.MENSAJE;
    });
});
$('#multiSelection').divMultiSelect({
    dataSource://['AZUL','BEIGE','BRONCE','CAFE','CIELO','FIUSHA','LILA','NARANJA','ORO','PLATA','ROJO','ROSA','TABACO']
        new dvn.data.DataSource({
            //data:['AZUL','BEIGE','BRONCE','CAFE','CIELO','FIUSHA','LILA','NARANJA','ORO','PLATA','ROJO','ROSA','TABACO']
            data: dtsMt
        }),
    dataTextField:'MENSAJE',
    dataValueField:'VALUE'
    //,maxSeletedItem: 2
    ,change:function(e){
        var mdts = $('#multiSelection').data('divMultiSelect');
        console.log( mdts.itemsSelected );
        console.log( mdts.val() );
    }
});*/



$('#config').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'DataSource basico',href:'/pages/MultiSelect/Config/arreglo.html'},
            {text:'DataSource',href:'/pages/MultiSelect/Config/dataSource.html'},
            {text:'DataTextField',href:'/pages/MultiSelect/Config/dataTextField.html'},
            {text:'DataValueField',href:'/pages/MultiSelect/Config/dataValueField.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'Select',href:'/pages/MultiSelect/Config/selected.html'},
            {text:'Change',href:'/pages/MultiSelect/Config/change.html'}
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

$('#salidaCofig').load('pages/MultiSelect/Config/dataSource.html');

