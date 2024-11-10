/*Multiselects*/
var dtsMulti = [];
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
});