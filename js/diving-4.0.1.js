var diving = {
    template: function(str, obj) {
        var ns = str,
            nss = "",
            s = "",
            a = str.match(/((#:)+(\s{1,})?[a-zA-Z\_0-9]+(\s{1,})?\#)/g);
        if(a!=null){
            for (var i = 0; i < a.length; i++) {
                var sub = (s.length === 0) ? str : s;
                s = sub.replace(a[i], obj[(a[i].match(/[a-zA-Z\_0-9]/g).join(''))]);
            }
        }else{
            var regdit = new RegExp(/#=(([A-Z0-9\.\,\-\_\<\=\"\'\(\)\?\:a-z]+))#/gm);
            a=str.match(regdit);
            for (var i = 0; i < a.length; i++) {
                var sub = (s.length === 0) ? str : s;
                var valor = a[i].replace('#=','');
                var nRegExp = new RegExp(/(([A-Z0-9\.\-\_\<\,\=\"\'\(\)\?\:a-z]+))/gm);
                s = window.eval(valor.match(nRegExp)[i].replace(valor.match(nRegExp)[i].match(/[A-Z\_]/gm).join(''),obj[(a[i].match(/[A-Z\_]/gm).join(''))]));
            }
        }
        str = ns;
        return s;
    },
    removeBy:function(array,prop){
        return array.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t[prop] === value[prop]
            ))
        );
    },
    subGp: function(arr, p) {
        return this.group(arr.items, p);
    },
    group: function(a, p) {
        var rtn = [];
        var nar = [];
        var sx = false;
        p = (p.length) ? p : [p];
        for (var x = 0; x < p.length; x++) {
            a = (nar.length > 0) ? nar : a;
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
    widget: function(w) {
        var obj = {
            name: 'div' + w.name || null
        };
        if (!obj.name)
            return;
        var fun = $.fn[obj.name] = w || {};
        $.extend($.ui, {
            [obj.name]: fun
        });
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
$.extend(diving,{
    formatDate:function(date, format) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();
        let ye = parseFloat(String(date.getYear()).slice(-2));
        let d =  parseFloat(String(day).slice(-1));
        let mon =  parseFloat(String(month).slice(-1));
        let hours   = ('0'+date.getHours()).slice(-2);
        let minutes = ('0'+date.getMinutes()).slice(-2);
        let seconds = ('0'+date.getSeconds()).slice(-2);
        return format
            .replace(/dd/g, day)
            .replace(/d/g, d)
            .replace(/MM/g, month)
            .replace(/M/g, mon)
            .replace(/yyyy/g, year)
            .replace(/yy/g, ye)
            .replace(/hh/g, hours)
            .replace(/mm/g, minutes)
            .replace(/ss/g, seconds);
    }
});

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
            /*var fstTbEl = document.querySelector( '#'+ $($(data.elem).find('ul')[0]).attr('id'));
            //+' a[href="#'+p.content[0].id+'"]' );
            var fsTab = new bootstrap.Tab(fstTbEl);

            var fstT = document.querySelector( '#'+ $($(data.elem).find('ul')[0]).attr('id')+' a[href="#'+p.content[0].id+'"]' );
            console.log(  '#'+ $($(data.elem).find('ul')[0]).attr('id')+' li:first-child a'  );
            bootstrap.Tab.getInstance(fstT).show();*/

            setTimeout(function(){
                var triggerTabList = document.querySelectorAll('#'+ $($(data.elem).find('ul')[0]).attr('id'));
                var tabTrigger;
                triggerTabList.forEach(function (triggerEl) {
                  tabTrigger = new bootstrap.Tab(triggerEl);
                  triggerEl.addEventListener('click', function (event) {
                    event.preventDefault();
                  })
                });
                tabTrigger.show();

            },100);



        },
        add:function(ttl,cnt,i,v){
            ttl.append(
                $('<li>',{class:'nav-item',role:'presentation'})
                .append(
                    $('<button>',{
                        class:"nav-link",
                        'data-bs-toggle':"tab",
                        'data-bs-target':"#"+v.id,
                        type:"button",
                        role:"tab",
                        'aria-controls':v.id,
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
                    'arial-labelledby':v.id+'-tab',
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
                    $(this.elem).find('input')[0].value=t;this.text=t;
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
                        if(v.hasOwnProperty('template')){
                            c.innerHTML=dvn.template(v.template,e);
                        }else if(v.hasOwnProperty('format')){
                            c.innerHTML=widget.parseaFormat(e,v,widtgetData.dataSource.options.schema);
                        }else{
                            c.innerHTML=e[v.field];
                        }
                        if(v.hasOwnProperty('attributes')){
                            $.each(Object.keys(v.attributes),function(i,d){
                                c.setAttribute(d,dvn.template(v.attributes[d],e));
                            });
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



                t.addClass('grid-scrollable-table');
                $(d.tbod).addClass('grid-scrollable-tbody');
                $(d.thead).addClass('grid-scrollable-thead');


            if(p.hasOwnProperty('height')){


                d.tbody.setAttribute('style','height: '+p.height);
                delete p.height;
            }
            d.table.append(d.tbody);
            //console.log( d.dataSource, d.dataSource.view() );
            for(var i = 0; i < d.dataSource.view().length; i++){
              //  console.log( d.dataSource.view()[i] );
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
                    //console.log( e,v,op);
                    rt = dvn.formatDate(e[v.field],v.format.replace('#:','').replace('#',''));
                    break;
                case 'string':
                    rt = e[v.field],v.format.replace('#:','').replace('#','');
                }

            }else{
                rt = e[v.field];
            }
            return rt;
        }
    };
    diving.widget(widget);
})();

/*
 * CheckBox
 */
(function(){
    var widget={
        name:'CheckBox',
        init:function(prm){
            prm=$.extend(prm,{
                class:'d-checkbox'
            });
            var widtgetData={
                setText:function(t){
                    $(this.elm).find('label').text(t);
                },
                getValue:function(){
                    return this.value;
                },
                elm:$(this)[0],
                value:[],
                items:prm.items||[],
                icon:prm.icon||{}
            };
            delete prm.items;
            delete prm.icon;
            widget.createElement(prm,widtgetData);
            $(this).data('div'+widget.name,widtgetData);
        },
        createElement:function(p,d){
            $(d.elm).empty();
            $.each(d.items,function(i,v){
                v['id']=$(d.elm).attr('id');
                var impt = $('<input>',{
                    value:v.value,
                    type: 'checkbox',
                    id: (i+1)+'_'+v.id,
                    click:function(e){
                        $(this).parent().toggleClass('d-chk-selected');
                        var iconId=$('#'+$(this).attr('id').replace(v.id,'icon_'+v.id));
                        if(iconId.hasClass(d.icon.checked)){
                            iconId.removeClass(d.icon.checked);
                            iconId.addClass(d.icon.unchecked);
                        }else{
                            iconId.removeClass(d.icon.unchecked);
                            iconId.addClass(d.icon.checked);
                        }
                        if(this.checked){
                            d.value.push(this.value);
                            d.value = [...new Set(d.value)];
                        }else{
                            var ts = this;
                            d.value = d.value.filter(function(item) {
                                return item !== ts.value;
                            });
                        }
                        if(p.hasOwnProperty('click')){
                            p.click.constructor = this.click;
                            p.click();
                        }
                    },
                    class: p.class+(d.icon.hasOwnProperty('checked')?' d-hidden':'')+
                                   ((p.hasOwnProperty('type')?' d-hidden':''))
                });
                var lbl=$('<label>',{
                    text:v.text,
                    for:(i+1)+'_'+v.id
                });
                var chkIcon = null;
                if(d.icon.hasOwnProperty('checked')){
                    chkIcon = $('<em>',{
                        id:(i+1)+'_icon_'+v.id,
                        class:d.icon.unchecked+((p.hasOwnProperty('type')?' d-hidden':'')),
                        click:function(){
                            $('#'+$(this).attr('id').replace('_icon','')).trigger('click');
                        }
                    });
                }
                var cntDiv = $('<div>',{
                    class:'d-parent-checkbox'+(p.hasOwnProperty('dir')?' d-chk-'+p.dir:'')
                });
                $(d.elm).append(
                    cntDiv.append(impt)
                        .append(chkIcon)
                        .append(lbl)
                );

                if(v.hasOwnProperty('checked')){
                    impt[0].checked = true;
                    d.value.push($('#'+(i+1)+'_'+v.id)[0].value);
                    $('#'+(i+1)+'_'+v.id).parent().toggleClass('d-chk-selected');
                    if(d.icon.hasOwnProperty('checked')){
                        var iconId = $('#'+(i+1)+'_icon_'+v.id);
                        if(iconId.hasClass(d.icon.checked)){
                            iconId.removeClass(d.icon.checked);
                            iconId.addClass(d.icon.unchecked);
                        }else{
                            iconId.removeClass(d.icon.unchecked);
                            iconId.addClass(d.icon.checked);
                        }
                    };
                }
            });
        }
    };
    diving.widget(widget);
})();








/*
 * radioButton
 */
(function(){
    var widget={
        name:'RadioButton',
        init:function(prm){
            prm=$.extend(prm,{
                class:'d-radioButton'
            });
            var widtgetData={
                setText:function(t){
                    $(this.elm).find('label').text(t);
                },
                getValue:function(){
                    return this.value;
                },
                elm:$(this)[0],
                value:null,
                items:prm.items||[],
                icon:prm.icon||{}
            };
            delete prm.items;
            delete prm.icon;
            widget.createElement(prm,widtgetData);
            $(this).data('div'+widget.name,widtgetData);
        },
        createElement:function(p,d){
            $(d.elm).empty();
            $.each(d.items,function(i,v){
                v['id']=$(d.elm).attr('id');
                var impt = $('<input>',{
                    value:v.value,
                    type: 'radio',
                    name: 'rd_'+v.id,
                    id: (i+1)+'_'+v.id,
                    click:function(e){
                        var rdItSelect=$('#'+$(this).attr('id').replace(v.id,'icon_'+v.id));
                        
                        var iconId=$('#'+$(this).attr('id').replace(/[0-9]+\_/gm,''));

                        if(rdItSelect.hasClass(d.icon.checked)){
                            if($(it)[0]!=rdItSelect[0]){
                                rdItSelect.removeClass(d.icon.checked);
                                rdItSelect.addClass(d.icon.unchecked);
                            }
                        }else{
                            rdItSelect.removeClass(d.icon.unchecked);
                            rdItSelect.addClass(d.icon.checked);
                        }
                        $.each(iconId.find('em'),function(e,it){
                            if($(it)[0]!=rdItSelect[0]){
                                $(it).removeClass(d.icon.checked);
                                $(it).addClass(d.icon.unchecked);
                            }
                        });
                        var item = $(this).attr('id').replace(/[0-9]+\_/gm,'');
                        var itm = $(this).attr('id').replace('_'+v.id,'');
                        
                        $.each(iconId.find('div[id^=prnt_]'),function(e,it){
                            $(it).removeClass('d-rb-selected');
                        });
                        
                        $('#prnt_'+itm+'_'+item).addClass('d-rb-selected');
                        
                        if(this.checked){
                            d.value=this.value;
                        }else{
                            var ts = this;
                            d.value = d.value.filter(function(item) {
                                return item !== ts.value;
                            });
                        }
                        if(p.hasOwnProperty('click')){
                            p.click.constructor = this.click;
                            p.click();
                        }
                    },
                    class: p.class+(d.icon.hasOwnProperty('checked')?' d-hidden':'')+
                                   ((p.hasOwnProperty('type')?' d-hidden':''))
                });
                var lbl=$('<label>',{
                    text:v.text,
                    for:(i+1)+'_'+v.id
                });
                var rbIcon = null;
                if(d.icon.hasOwnProperty('checked')){
                    rbIcon = $('<em>',{
                        id:(i+1)+'_icon_'+v.id,
                        class:d.icon.unchecked+((p.hasOwnProperty('type')?' d-hidden':'')),
                        style:'font-size:1.5em;position: relative;top: 0.25em;',
                        click:function(){
                            $('#'+$(this).attr('id').replace('_icon','')).trigger('click');
                        }
                    });
                }
                var cntDiv = $('<div>',{
                    id:'prnt_'+(i+1)+'_'+v.id,
                    class:'d-parent-radioButton'+(p.hasOwnProperty('dir')?' d-rb-'+p.dir:'')
                });
                $(d.elm).append(
                    cntDiv.append(impt)
                        .append(rbIcon)
                        .append(lbl)
                );
            });
        }
    };
    diving.widget(widget);
})();








/*TabsTrip*/
(function(){
    var widget = {
        name: "ListView",
        init: function(prm) {
            prm=$.extend(prm,{
                class:(prm.class||'')+" d-listView"
            });
            var widtgetData = {
                elem:$(this)[0],
                elements:prm.elements||[],
                selected:null,
                openTo: prm.openTo||null,
                click:prm.click||null,
                items:[]
            };
            delete prm.elements;
            delete prm.openTo;
            delete prm.click;
            widget.createElement(prm,widtgetData);
            $(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,d) {
            $(d.elem).empty();
            var ul = document.createElement('ul');
            $(ul).addClass('list-group '+(p.hasOwnProperty('class')?' '+p.class:''));
            var wst = this;
            $(d.elem).append( ul );
            $.each(d.elements,function(i,v){
                wst.add(ul,v, d);
            });
        },
        add:function(e,c,d){
            var li = document.createElement('li');
            d.items.push(li);
            $(li).addClass('list-group-item');
            $(li).text(c.text);
            $(li).click(function(){
                $.each(d.items,function(i,v){
                    $(v).removeClass('list-group-item-info');
                });
                $(this).addClass('list-group-item-info');
                d.selected = this;
                if(d.openTo!=null){
                     $( d.openTo ).load(
                        (c.href.startsWith('http')?
                        c.href:
                        (window.location.href.replace('index.html','').replace(/\#$/gm,'')) + c.href
                        )
                    );
                }
                if(d.click != null){
                    $(li).click.constructor = d.click;
                    d.click();
                }
            });
            e.append(li);
        }
    };
    diving.widget(widget);
})();