
var diving = {
    subGp: function(arr, p) {
        return this.group(arr.items, p);
    },
    group:function(a, p) {
        var rtn = [];
        var nar = [];
        var sx = false;
        p=(p.length)?p:[p];
        for (var x = 0; x < p.length; x++) {
            a=(nar.length>0)?nar:a;
            for (var y = 0; y < a.length; y++) {
                if (a[y].items) {
                    a[y].items = diving.subGp(a[y], [p[x]]);
                    sx = true;
                } else {
                    var itm = {};
                    itm = {
                        field: p[x].field,
                        value: a[y][p[x].field],
                        items: [a[y]]
                    };
                    if (nar.length == 0) {
                        nar.push(itm);
                    } else {
                        var ex = false;
                        var itms = 0;
                        for (var z = 0; z < nar.length; z++) {
                            if ((nar[z].field == itm.field) && (nar[z].value == itm.value)) {
                                ex = true;
                                itms = z;
                                break;
                            }
                        }
                        if (!ex) {
                            nar.push(itm);
                        } else {
                            nar[itms].items.push(itm.items[0]);
                        }
                    }
                }
            }
            if (!sx) {
                rtn = nar;
            }
        }
        if (!sx)
            a = rtn;
        return a;
    },
    widget: function (w) {
        var obj = {name: 'div' + w.name || null};
        if (!obj.name)
            return;
        var fun = $.fn[obj.name] = w || {};
        $.extend($.ui, {[obj.name]: fun});
        $.fn[obj.name] = w.init;
    }
};
     window.diving = dvn=diving;

class Source{
     constructor(p){
          if(p.schema){
               this.options=this.options||{};
               this.options.schema=p.schema||{};
               this.options.schema.model=(p.schema)?p.schema.model||{}:{};
               this.options.schema.model.fields=(p.schema)?(p.schema.model)?p.schema.model.fields||{}:{}:{};
          }
          this.setData(p.data);
          if(p.group){
               this.grupo = p.group;
          }
          if(p.sort){
               this.sort(p.sort);
          }
          (p.group)?this.group(p.group):null;
          if(p.aggregate){
               this.aggregate(p.aggregate,this.options);
          }
          return this;
     }
     aggregate(a,c){
          var ts = this;
          var b = null;
          if(c.hasOwnProperty('data')){
               if(c.data[0].hasOwnProperty('items'))
                    for(var x=0;x<c.data.length;x++)
                         ts.aggregate(a,c.data[x].items);
               else
               	b=c.data;
          }else{
               b=c;
          }
          if(b!=null)
          Object.keys(a).map(function(k){
               var s = 0;
               b.map(function(d){s+=d[a[k].field];});
               switch(k){
                    case 'sum':b.map(function(d){d['aggregate_'+k]=s;});break;
                    case 'avg':b.map(function(d){d['aggregate_'+k]=d[a[k].field]/s;});break;
               }
          });
     }
     setData(data){
        var temporalDts = [];
        $.each(data,function(i,v){
            temporalDts.push(v);
        });
          this.options=this.options||{};
          if(this.options.hasOwnProperty('schema')){
               if(this.options.schema.hasOwnProperty('model')){
                    if(this.options.schema.model.hasOwnProperty('fields')){
                         var opFields = this.options.schema.model.fields;
                       var fields = Object.keys(opFields);
                         $.each(temporalDts,function(i,v){
							$.each(fields,function(f,k){
                                 if(opFields[k].type=='number'){
                                      v[k]=parseFloat(v[k]);
                                 }
                                 if(opFields[k].type=='date'){
                                      v[k]=new Date(v[k]);
                                 }
                                 if(opFields[k].type=='string'){
                                      v[k]=""+v[k];
                                 }
                            });
                         });
                    }
               }
          }
          this.options.data=temporalDts;
     }
     view(){
          return this.options.data;
     }
     group(p){
          var elements=this.options.data;
          this.options.data=diving.group(elements,p);
     }
     sort(orden){
          var srt = (!Array.isArray(orden))?[orden]:orden;
          var elements = this.options.data;
          $.each(srt,function(i,v){
               var sort = v.field;
               var dir = (v.dir)?(v.dir==='desc')?-1:v.dir:1;
               elements.sort(function(a,b){
                    if(eval('a[sort]'+((dir===1)?'>':'<')+'b[sort]')){
                         return 1;
                    }
                    if(eval('a[sort]'+((dir==-1)?'>':'<')+'b[sort]')){
                         return -1;
                    }
                    return 1;
               });
          });
     }
}
diving.data = diving.data || {};
diving.store = diving.store || {};

diving.data.DataSource = Source;
diving.store.Source = Source;


//console.log( dts.view() );
/*Boton*/
(function() {
    var widget = {
        name: "Button",
        init: function(prm) {
            prm = $.extend(prm, {
                text: prm.text || $(this)[0].innerHTML || '',
                classParent:"d-button",
                class: 'btn btn-'+((prm.type) ? prm.type : 'default') + ((prm.class) ? ' ' + prm.class : ''),
                type: (prm.type) ? prm.type : 'default'
            });
            var widtgetData = {
                setText: function(t) {
                    $($(this.elem).find('button')).text(t);
                    this.text = t;
                },
                destroy:function(){
                    $(this.elem).removeData('divNotification');
                    $(this.elem)[0].remove();
                },
                enabled:function(e){
                    var elemento = $(this.elem).data('divButton').elem;
                    $($(elemento).find('button')).attr('type',(e?this.type:'disabled'));
                },
                elem:$(this)[0]
            };
            widget.createElement(prm,widtgetData);
            $(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            $(data.elem).empty();
            var attributes = $.extend(p, {
                text: p.text,
                class: p.class,
                type: p.type
            });
            $(data.elem).addClass(p.classParent);
            delete attributes.classParent;
            var elemento = $('<button>', attributes);
            (p.type == 'disabled') ? elemento[0].onclick = function(event) {
                event.preventDefault();
            }: null;
            (p.icon) ? elemento[((typeof p.icon === 'string') ? 'append' : ((p.icon.pos == 'before') ? 'prepend' : 'append'))]($('<em>', {
                class: (typeof p.icon === 'string') ? p.icon : p.icon.class
            })): null;
            $(data.elem).append(elemento);
            $.extend(data,attributes);
        }
    };
    diving.widget(widget);
})();
/*TabsTrip*/
(function(){
    var widget = {
        name: "TabsTrip",
        init: function(prm) {
            prm=$.extend(prm,{class:"d-tabstrip"});
            var widtgetData = {
                elem:$(this)[0]
            };
            widget.createElement(prm,widtgetData);
            $(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            $(data.elem).empty();
            var wdt=this;
            var ttl = $('<ul>',{class:'nav nav-tabs',role:'tablist',id:$(data.elem).attr('id')+'_tab'});
            var cnt = $('<div>',{class:'tab-content'});
            $(data.elem).append(ttl).append(cnt);
            $.each(p.content,function(i,v){
                wdt.add(ttl,cnt,i,v);
            });
            var fstTbEl = document.querySelector( '#'+ $($(data.elem).find('ul')[0]).attr('id')+' li:first-child' );
            var fsTab = new bootstrap.Tab(fstTbEl);
            fsTab.show();
        },
        add:function(ttl,cnt,i,v){
            ttl.append(
                $('<li>',{class:'nav-item',role:'presentation'})
                .append(
                    $('<butto>',{
                        //id="home-tab" 
                        class:"nav-link"+(v.hasOwnProperty('open')?' active':''),
                        'data-bs-toggle':"tab",
                        'data-bs-target':"#"+v.id,
                        type:"button",
                        role:"tab",
                        'aria-controls':"tab-pane",
                        'aria-selected':"false",
                        text:v.title
                    })
                )
            );
            cnt.append(
                $('<div>',{
                    class:'tab-pane'+(v.hasOwnProperty('open')?' active':''),
                    id:v.id,
                    role:'tabpanel',
                    'arial-labelledby':'tab',
                    tabindex:i
                }).append(
                    v.element
                )
            );
        }
    };
    diving.widget(widget);
})();
/*MultiSelect*/
(function() {
    var widget = {
        name: "MultiSelect",
        init: function(prm) {
            prm = $.extend(prm, {
                classParent:"d-multiSelection",
                class: ((prm.type) ? 'd-' + prm.type : 'd-multi-selection') + ((prm.class) ? ' ' + prm.class : '')
            });
            var widtgetData = {
                enabled:function(e){
                    var e = $(this.elem).data('divMultiSelection').elem;
                    //$($(e).find('input')).attr('type',(e?this.type:'disabled'));
                },
                dataSource: prm.dataSource,
                dataTextField:prm.dataTextField||'',
                dataValueField:prm.dataValueField||'',
                elem:$(this)[0],
                itemsSelected:[],
                val:function(){

                    return widtgetData.itemsSelected;//.join(',');
                }
            };
            delete prm.dataSource;
            widget.createElement(prm,widtgetData);
            $(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            $(data.elem).empty();
            var wdt = this;
            var ulSelected = $('<ul>',{class:'list-selected'});
            var propId = $(data.elem).attr('id')+'-dvnMultiSelect';
            var select = $('<select>',{class:"form-select",id:propId,'aria-label':"Default select example"})//'aria-label':"Default select example", 
            var maxSelectItem = -1;
            if(p.hasOwnProperty('maxSeletedItem')){
                maxSelectItem = p.maxSeletedItem;
            }
            select.change(function(e){
                var value = $(this).val();
                var ntext = $("#"+propId+" option:selected").text();
                $("#"+propId+" option:selected").addClass('selected');
                if(data.itemsSelected.findIndex(objeto => objeto.value === value)==-1){
                    var pasa=(maxSelectItem == -1)||(data.itemsSelected.length<maxSelectItem);
                    if(pasa){
                        ulSelected.append(
                            $('<li>',{class:'item-selected'}).append(
                                $('<label>',{class:'lvl-select',text:ntext,value:value})
                            ).append(
                                $('<em>',{class:'icon-clearclose',click:function(){
                                        data.itemsSelected = data.itemsSelected.filter(objeto => (objeto.hasOwnProperty('value')?objeto.value:objeto) !== $($($(this).parent()).find('label')[0]).attr('value'));
                                        $($(this).parent()).remove();
                                    }
                                })
                            )
                        );
                        //data.itemsSelected.push({value:value,text:ntext});
                        data.itemsSelected.push(value);
                    }
                }
                if(p.hasOwnProperty('change')){
                    //$(data.elem).data('divMultiSelection').constructor =data;
                    p.change.constructor = select.change;
                    p.change(data);
                }
            });

            $(data.elem).addClass(p.class);
            $(data.elem).append(ulSelected).append(select);
            if(!data.dataSource.hasOwnProperty('options')){
                $.each(data.dataSource,function(i,v){
                    select.append( $('<option>',{value:v,text:v}));
                });
                p['origen']=1;
            }else{
                $.each(data.dataSource.options.data,function(i,v){
                    if(typeof v == 'string'){
                        select.append( $('<option>',{value:v,text:v}));
                        p['origen']=2;
                    }else{
                        select.append( $('<option>',{value:v[data.dataValueField],text:v[data.dataTextField]}));
                        p['origen']=3;
                    }
                });
            }
        },
        selecciono:function(e){
            console.log( e.target );
        }
    };
    diving.widget(widget);
})();

/*textbox*/
(function() {
    var widget = {
        name: "Text",
        init: function(prm) {
            prm = $.extend(prm, {
                text: prm.text || $(this)[0].innerHTML || '',
                class: "d-text" + ((prm.type) ? ' d-' + prm.type : ' d-default') + ((prm.class) ? ' ' + prm.class : '')
            });
            var widtgetData = {
                setText: function(t) {
                    $(this.elm).find('input')[0].value=t;this.text=t;
                },
                getValue:function(){return this.text;},
                elem:$(this)[0]
            };
            widget.createElement(prm,widtgetData);
            $(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            $(data.elem).empty();
            var attributes = $.extend(p, {
                text: p.text,
                class: p.class
            });
            var w;
            if(p.width){w=p.width;delete p.width;}
            var elemento;
            if(p.multiple){
                if(typeof p.multiple!='object'){
                    delete p.multiple;
                }else{
                    attributes.rows=p.multiple.row;
                    attributes.cols=p.multiple.col;
                    (p.multiple.resize!=undefined)?(!p.multiple.resize)?attributes.style='resize:none;':'':'';
                    delete p.multiple;
                }
                elemento=$('<textarea>',attributes);
            }else{
                elemento = $('<input>', attributes);
            }
            $(data.elem).append(elemento);
            elemento.on('change',function(evt){
                    var t = $($(this).parent()).data('divText');
                    t.text=this.value;
                    if(p.keyup){
                        p.keyup.constructor=this.onkeyup;
                        p.keyup();
                    }
                });
            elemento.on('keyup',function(k){
                    var t = $($(this).parent()).data('divText');
                    t.text=this.value;
                    if(p.keyup){
                        p.keyup.constructor=this.onkeyup;
                        p.keyup();
                    }
                });
            elemento.on('keydown',function(k){
                    var t = $($(this).parent()).data('divText');
                    t.text=this.value;
                    if(p.keyup){
                        p.keyup.constructor=this.onkeyup;
                        p.keyup();
                    }
                });

            $.extend(data,attributes);
        }
    };
    diving.widget(widget);
})();


/*Grid*/
(function() {
    var widget = {
        name: "Grid",
        init: function(prm) {
            prm = $.extend(prm, {
                class: "d-grid" + ((prm.type) ? ' d-' + prm.type : ' d-default') + ((prm.class) ? ' ' + prm.class : '')
            });
            var widtgetData = {
                dataSource: prm.dataSource,
                elem:$(this)[0],
                addRow:function(e){
                    var r = document.createElement('tr');
                    widtgetData.columns.map(function(v){
                        var c = document.createElement('td');
                        if(v.hasOwnProperty('format')){
                            c.innerHTML=widget.parseaFormat(e,v,widtgetData.dataSource.options.schema);
                        }else{
                            c.innerHTML=e[v.field];
                        }
                        r.append(c);
                    });
                    widtgetData.tbody.append(r);
                },
                columns: prm.columns||[]
            };
            delete prm.dataSource;
            delete prm.columns;
            widget.createElement(prm,widtgetData);
            $(this).data('div'+widget.name, widtgetData);
        },
        createElement(p,d){
            $(d.elem).empty();
            if(p.hasOwnProperty('width')){
                $(d.elem).attr('style','width: '+p.width);
                delete p.width;
            }
            var t = $('<table>',{class:'table table-striped'});
            $(d.elem).append(t);
            var wdt = this;
            d['table']=t;
            wdt.gci(d);
            //creacion de encabezado de columnas
            var h = document.createElement('tr');
            d.columns.map(function(v){
                var c = document.createElement('th');
                c.setAttribute('scope',"col");
                c.innerHTML=v.title;
                h.append(c);
            });
            d['thead']=document.createElement('thead');
            $(d.thead).addClass('table-light');
            d.thead.append(h);
            d.table.append(d.thead);
            d['tbody']=document.createElement('tbody');
            if(p.hasOwnProperty('height')){
                d.tbody.setAttribute('style','height: '+p.height);
                delete p.height;
            }
            d.table.append(d.tbody);
            for(var i = 0; i < d.dataSource.view().length; i++){
                d.addRow(d.dataSource.view()[i]);
            }
        },
        gci(d){
            var k = Object.keys(d.dataSource.view()[0]);
            if(d.columns.length == 0 ){
                $.each(k,function(i,v){
                    d.columns.push({field:v,title:v});
                });
            }
        },
        parseaFormat(e,v,op){
            var rt = null;
            if(op!=undefined){
                switch(op.model.fields[v.field].type){
                case 'date':
                    var dia = ('0'+e[v.field].getDate()).slice(-2);
                    var mes = ('0'+(e[v.field].getMonth()+1)).slice(-2);
                    var ano = e[v.field].getFullYear();
                    var min = e[v.field].getMinutes();
                    var seg = e[v.field].getSeconds();
                    var hor = e[v.field].getHours();
                    var frmt = v.format.replace('#:','').replace('#','');
                    var rtn = frmt.replace('dd',dia).replace('MM',mes).replace('yyyy',ano).replace('hh',hor).replace('mm',min).replace('ss',seg);
                    rt = rtn;
                    break;
                }
            }else{
                rt = e[v.field];
            }
            return rt;
        }
    };
    diving.widget(widget);
})();






var dtsMulti = [];
$.each(rtn,function(i,v){
    dtsMulti.push({VALUE:v.COL_CVE_N,MENSAJE:v.COL_DESC_STR});
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
$('#btn1').divButton({text:'primary',type:'primary'});
    $('#btn2').divButton({text:'secondary',type:'secondary'});
    $('#btn3').divButton({text:'success',type:'success'});
    $('#btn4').divButton({text:'danger',type:'danger'});
    $('#btn5').divButton({text:'warning',type:'warning'});
    $('#btn6').divButton({text:'info',type:'info'});
    $('#btn7').divButton({text:'light',type:'light'});
    $('#btn8').divButton({text:'dark',type:'dark'});
    $('#btn9').divButton({text:'link',type:'link'});
var nrtn = [];
$.each(rtn,function(i,v){
    nrtn.push({VALUE:v.ID_ART,MENSAJE:v.ID_ART});
});
var dtsMs = new dvn.store.Source({
    data:nrtn,
    schema:{model:{fields:{VALUE:{type:'number'},MENSAJE:{type:'string'}}}}
});
$('#division').divTabsTrip({
        content:[
            {title: 'titulo 1', id:'elem_1', element: $('<div>',{text:'loopReplacer(match, start, end, snippet)'}),open: true},
            {title: 'titulo 2', id:'elem_2', element: $('<div>',{text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, accusantium ut commodi. Eius laudantium facere ullam quasi voluptates dolorum, inventore assumenda, non, officia, maiores quisquam debitis? Voluptatem nulla perspiciatis voluptates omnis! Quia facere dolorum explicabo, dicta incidunt aspernatur repellat natus alias magni, minus maxime consequatur debitis quo vitae laborum impedit culpa distinctio unde dolorem ipsum consectetur? Eos ducimus quisquam rerum laborum eum, repellat, quod reiciendis nam ipsum officiis dolorum tempora perspiciatis illum corrupti, tempore voluptates autem ullam assumenda quas. Vero officia, saepe blanditiis labore, dolor, doloribus amet deserunt necessitatibus eius dolore, consequuntur corporis temporibus obcaecati! Voluptatibus eos recusandae alias dicta?'})},
            {title: 'titulo 3', id:'elem_3', element: $('<div>',{text:'estas en el contenido 5'})},
            {title: 'titulo 4', id:'elem_4', element: $('<div>',{text:'estas en el contenido 6'})},
            {title: 'titulo 5', id:'elem_5', element: $('<div>',{text:'estas en el contenido 7'})},
            {title: 'titulo 6', id:'elem_6', element: $('<div>',{text:'estas en el contenido 8'})},
            {title: 'titulo 7', id:'elem_7', element: $('<div>',{text:'estas en el contenido 9'})}
        ]
    });


$('#text1').divText({
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
});









var dts = new dvn.data.DataSource({
     data:rtn,
     //sort:{field: 'FPLG_DESC_STR',str:'desc'},
     //group:[{field: 'SBC_CVE_N'},{field:'EQR_TA_STR'}],
     schema:{
          model:{
               fields:{
                    FEC_ITI_DT:   {type: 'date'   },
                    SBC_CVE_N:    {type: 'number' },
                    EQR_TA_STR:   {type: 'string' },
                    FPLG_DESC_STR:{type: 'string' },
                    DIV_CVE_N:    {type: 'number' },
                    COL_DESC_STR: {type: 'string' },
                    CURSOR:       {type: 'number' },
                    CAT_CVE_N:    {type: 'number' },
                    HOR_CVE_N:    {type: 'number' },
                    CO_CVE_STR:   {type: 'string' },
                    CUCS_CVE_N:   {type: 'number' },
                    CAT_DESC_STR: {type: 'string' },
                    HOR_DESC_STR: {type: 'string' },
                    FPLG_CVE_N:   {type: 'number' },
                    CONS_CVE_N:   {type: 'number' },
                    SEC_CVE_N:    {type: 'number' },
                    MAR_CVE_N:    {type: 'number' },
                    ULT_SUST_DEF: {type: 'number' },
                    MAR_DESC_STR: {type: 'string' },
                    AR_ESTILO_STR:{type: 'string' },
                    CA_CVE_N:     {type: 'number' },
                    COL_CVE_N:    {type: 'number' },
                    SBC_DESC_STR: {type: 'string' },
                    CA_DESC_STR:  {type: 'string' },
                    DIV_DESC_STR: {type: 'string' },
                    SEC_DESC_STR: {type: 'string' },
                    ID_ART:       {type: 'number' }
               }
          }
     }
});
$('#grid').divGrid({
    dataSource:dts,
    columns:[,
        {field:'ID_ART'        , title:'ARTICULO'},
        {field:'FEC_ITI_DT'    , title:'FECHA ITINERARIO',format:'#:dd/MM/yyyy#'},
        {field:'SBC_CVE_N'     , title:'SBC_CVE_N'},
        {field:'EQR_TA_STR'    , title:'EQR_TA_STR'},
        {field:'FPLG_DESC_STR' , title:'FPLG_DESC_STR'},
        {field:'DIV_CVE_N'     , title:'DIV_CVE_N'},
        {field:'COL_DESC_STR'  , title:'COL_DESC_STR'},
        {field:'CURSOR'        , title:'CURSOR'},
        {field:'CAT_CVE_N'     , title:'CAT_CVE_N'},
        {field:'HOR_CVE_N'     , title:'HOR_CVE_N'},
        {field:'CO_CVE_STR'    , title:'CO_CVE_STR'},
        {field:'CUCS_CVE_N'    , title:'CUCS_CVE_N'},
        {field:'CAT_DESC_STR'  , title:'CAT_DESC_STR'},
        {field:'HOR_DESC_STR'  , title:'HOR_DESC_STR'},
        {field:'FPLG_CVE_N'    , title:'FPLG_CVE_N'},
        {field:'CONS_CVE_N'    , title:'CONS_CVE_N'},
        {field:'SEC_CVE_N'     , title:'SEC_CVE_N'},
        {field:'MAR_CVE_N'     , title:'MAR_CVE_N'},
        {field:'ULT_SUST_DEF'  , title:'ULT_SUST_DEF'},
        {field:'MAR_DESC_STR'  , title:'MAR_DESC_STR'},
        {field:'AR_ESTILO_STR' , title:'AR_ESTILO_STR'},
        {field:'CA_CVE_N'      , title:'CA_CVE_N'},
        {field:'COL_CVE_N'     , title:'COL_CVE_N'},
        {field:'SBC_DESC_STR'  , title:'SBC_DESC_STR'},
        {field:'CA_DESC_STR'   , title:'CA_DESC_STR'},
        {field:'DIV_DESC_STR'  , title:'DIV_DESC_STR'},
        {field:'SEC_DESC_STR'  , title:'SEC_DESC_STR'}
        ],
    width: '5000px',
    height: '300px'
});
