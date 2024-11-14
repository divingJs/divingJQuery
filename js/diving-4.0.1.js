const diving = {
    template: (str, obj) => {
        const regexStatic = /#:\s*([a-zA-Z_0-9]+)\s*#/g;
        str = str.replace(regexStatic, (_, key) => obj[key] || '');
        const regexDynamic = /#=\s*([^#]+?)\s*#/g;
        str = str.replace(regexDynamic, (_, expression) => {
            try {
                const func = new Function(...Object.keys(obj), `return ${expression}`);
                return func(...Object.values(obj));
            } catch (e) {
                return '';
            }
        });
        return str;
    },
    addPx: n => (typeof n === 'number' ? `${n}px` : n.match(/[a-z]+/gm) ? n : `${n}px`),
    removeBy: (array, prop) => [...new Map(array.map(item => [item[prop], item])).values()],
    subGp: (arr, p) => diving.group(arr.items, p),
    group: (a, p) => {
        const grouped = [];
        p.forEach(prop => {
            const temp = [];
            a.forEach(item => {
                const existing = temp.find(g => g.value === item[prop.field]);
                if (existing) {
                    existing.items.push(item);
                } else {
                    temp.push({ field: prop.field, value: item[prop.field], items: [item] });
                }
            });
            a = temp;
        });
        return a;
    },
    widget: w => {
        const name = `div${w.name || ''}`;
        if (!name) return;
        const fun = $.fn[name] = w || {};
        $.extend($.ui, { [name]: fun });
        $.fn[name] = w.init;
    },
    normalizeText: texto => {
        try {
            return decodeURIComponent(escape(texto));
        } catch (e) {
            console.error("Error decoding text:", e);
            return texto;
        }
    },
    region: 'en-US',
    formatDate: (date, format) => {
        if (!(date instanceof Date)) date = new Date(date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return format
            .replace(/dd/g, day)
            .replace(/MM/g, month)
            .replace(/yyyy/g, year)
            .replace(/hh/g, hours)
            .replace(/mm/g, minutes)
            .replace(/ss/g, seconds);
    },
    formatNumber: (number, format) => {
        const type = format.match(/[a-z]/)[0] || 'n';
        const decimals = format.match(/[a-z]+[0-9]+/)[0].replace(type, '') || 0;
        const options = {
            minimumFractionDigits: parseInt(decimals),
            maximumFractionDigits: parseInt(decimals),
            style: type === 'p' ? 'percent' : type === 'e' || type === 'm' || type === 'u' ? 'currency' : undefined,
            currency: type === 'e' ? 'EUR' : type === 'm' ? 'MXN' : type === 'u' ? 'USD' : undefined,
        };
        return number.toLocaleString(diving.region, options);
    }
};
window.diving = dvn=diving;
/*Boton*/
(function() {
    var widget = {
        name: "Button",
        init: function(prm) {
            prm = $.extend(prm, {
                text: prm.text || $(this)[0].innerHTML || '',
                classParent:"d-button",
                class: 'btn btn-'+((prm.type) ? prm.type : 'light') + ((prm.class) ? ' ' + prm.class : ''),
                type: (prm.type) ? prm.type : 'default'
            });
            var widtgetData = {
                setText: function(t) {
                    $($(this.element).find('button')).text(t);
                    this.text = t;
                },
                destroy:function(){
                    $(this.element).removeData('div'+widget.name);
                    $(this.element)[0].remove();
                },
                enabled:function(e){
                    var elemento = $(this.element).data('divButton').element;
                    $($(elemento).find('button')).attr('type',(e?this.type:'disabled'));
                },
                toggleClass:function(c){
                    $(this.element).find('em').toggleClass(c);
                },
                element:$(this)[0]
            };
            widget.createElement(prm,widtgetData);
            $(this).data('div'+widget.name, widtgetData);
            return $(this);
        },
        createElement: function(p,data) {
            $(data.element).empty();
            var attributes = $.extend(p, {
                text: p.text||'',
                class: p.class,
                type: p.type||'light'
            });
            $(data.element).addClass(p.classParent);
            delete attributes.classParent;
            var elemento = $('<button>', attributes);
            (p.type == 'disabled') ? elemento[0].onclick = function(event) {
                event.preventDefault();
            }: null;
            (p.icon) ? elemento[((typeof p.icon === 'string') ? 'append' : ((p.icon.pos == 'left') ? 'prepend' : 'append'))]($('<em>', {
                class: (typeof p.icon === 'string') ? p.icon : p.icon.class
            })): null;
            $(data.element).append(elemento);
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
                },
                dataSource: prm.dataSource,
                dataTextField:prm.dataTextField||'',
                dataValueField:prm.dataValueField||'',
                elem:$(this)[0],
                itemsSelected:[],
                val:function(){
                    return widtgetData.itemsSelected;
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
            var select = $('<select>',{class:"form-select",id:propId,'aria-label':"Default select example"})
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
                        data.itemsSelected.push(value);
                    }
                }
                if(p.hasOwnProperty('change')){
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
/*CheckBox*/
(function(){
    var widget={
        name:'CheckBox',
        init:function(prm){
            prm=$.extend(prm,{
                class:'d-checkbox'
            });
            var widtgetData={
                add:function(e){
                    var a = $(this.element).data('divCheckBox');
                    var wgt = this;
                    var prm = a._prm;
                    wgt.items.push(e);
                    wgt.value = [];
                    wgt._crtElm(prm,wgt);
                },
                remove:function(e){
                    var a = $(this.element).data('divCheckBox');
                    var wgt = this;
                    var prm = a._prm;
                    if(typeof e == 'number'){
                        var vle = null;
                        for(var i = 0; i < wgt.items.length; i ++){
                            if(i==e){
                               vle = wgt.items[i].value;
                            }
                        }

                        for(var i = 0; i < wgt.value.length; i ++){
                            if(wgt.value[i]==vle){
                               wgt.value[i].splice(i,1); 
                            }
                        }

                        wgt.items.splice(e,1);
                    }else{
                        var x = -1;
                        var vle = null;
                        $.each(wgt.items,function(i,v){
                            if(v.text == e.text){
                                x= i;
                                vle = v.value;
                            }
                        });
                        if(x>-1){
                            wgt.items.splice(x,1);
                            for(var i = 0; i < wgt.value.length; i ++){
                                if(wgt.value[i]==vle){
                                   wgt.value[i].splice(i,1); 
                                }
                            }
                        }
                    }
                    wgt._crtElm(prm,wgt);
                },
                getValue:function(){
                    return this.value;
                },
                destroy:function(){
                    $(this.element).removeData('div'+widget.name);
                    $(this.element)[0].remove();
                },
                element:$(this)[0],
                value:[],
                items:prm.items||[],
                icon:prm.icon||{}
            };

            //widtgetData['_wgt']=widtgetData;
            widtgetData['_prm']=prm;
            widtgetData['_crtElm']=widget.createElement;
            delete prm.items;
            delete prm.icon;
            widget.createElement(prm,widtgetData);
            $(this).data('div'+widget.name,widtgetData);
            return $(this);
        },
        createElement:function(p,d){
            $(d.element).empty();
            $.each(d.items,function(i,v){
                v['id']=$(d.element).attr('id');
                var impt = $('<input>',{
                    value:v.value,
                    type: 'checkbox',
                    id: (i+1)+'_'+v.id,
                    class: p.class+
                        (d.icon.hasOwnProperty('checked')?' d-hidden':'')+
                        ((p.hasOwnProperty('type')?' d-hidden':'')),
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
                    }
                });
                var lbl=$('<label>',{
                    text:v.text,
                    for:(i+1)+'_'+v.id
                });
                var chkIcon = null;
                if(d.icon.hasOwnProperty('checked')){
                    chkIcon = $('<em>',{
                        id:(i+1)+'_icon_'+v.id,
                        class:d.icon.unchecked+((p.hasOwnProperty('type')?
                            ' d-hidden':'')),
                        click:function(){
                            $('#'+$(this).attr('id').replace('_icon','')).trigger('click');
                        }
                    });
                }
                var cntDiv = $('<div>',{
                    class:'d-parent-checkbox'+(p.hasOwnProperty('dir')?
                        ' d-chk-'+p.dir:'')
                });
                $(d.element).append(
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
/* radioButton*/
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
/*ListView*/
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
            
            if(c.hasOwnProperty('elements')){
                var ul = document.createElement('ul');
                $(ul).addClass('list-group list-group-flush d-hidden');
                $(li).append(
                    $('<label>',{text:c.text})
                    ).append(
                    $('<em>',{
                        class:'icon-download8',
                        click:function(){
                            $(this).toggleClass('icon-upload7');
                            $(this.nextElementSibling).toggleClass('d-hidden');
                        }
                        })//icon-upload7
                    );
                $(li).append(ul);
                var wst = this;
                $.each(c.elements,function(i,v){
                    wst.add(ul,v, d);
                });
            }else{
                $(li).text(c.text);
                $(li).click(function(){
                    d.selected = c;
                    if(d.click != null){
                        $(li).click.constructor = d.click;
                        d.click();
                    }
                });
            }
            e.append(li);
        }
    };
    diving.widget(widget);
})();
/*grid*/
(function() {
    var widget = {
        name: "Grid",
        columnas: [],
        init: function(prm) {
            prm = $.extend(prm, {
                class: "d-grid"
            });
            var widtgetData = {
                elem: $(this)[0],
                dataSource: prm.dataSource
            };
            var gc = function(d){
                var rtn = [];
                $.each(d,function(i,v){
                    $.each(Object.keys(v),function(x,y){
                        rtn.push({field:y,title:y});
                    });
                });
                var nrtn = rtn.filter((item, index, self) =>
                  index === self.findIndex((t) => t.field === item.field)
                );
                return nrtn;
            };
            widget.columnas = (prm.columns||gc(prm.dataSource.options.data));
            widget.createElement(prm, widtgetData);
            $(this).data('div' + widget.name, widtgetData);
        },
        createElement: function(p, data) {
            $(data.elem).empty();
            this.dataSource = data.dataSource;
            var width = (p.width != undefined) ? 'width:' + p.width : '';
            var t = $('<table>', {
                class: 'table table-striped grid-scrollable-table',
                style: width
            });
            var th = $('<thead>', {
                class: 'table-light'
            });
            var tb = $('<tbody>', {
                class: ''
            });
            if (p.hasOwnProperty('height')) {
                tb[0].setAttribute('style', 'height: ' + p.height);
            }

            t.append(th);
            t.append(tb);
            $(data.elem).append(t);
            widget['thead'] = th;
            widget['tbody'] = tb;
            $.extend(data, {
                table: t,
                thead: th,
                tbody: tb
            });
            widget.crHead(t,th);
            $.each(p.dataSource.options.data.dataItems, function(i, v) {
                widget.addElement(tb, v);
            });
        },
        crHead: function(t,th) {
            widget.rdIndex = 0;
            var trh = $('<tr>');
                th.append(trh);
            var cl = document.createElement('colgroup');
            for (var i = 0; i < widget.columnas.length; i++) {
                var v = widget.columnas[i];
                var c = document.createElement('col');
                var cId = 'dGrid-' + '3-0-1-' + ("" + Math.random()).replace(/\D/g, "");
                c.setAttribute('id', cId);
                cl.append(c);
                widget.createHeader(trh, v, cId,th,1);
            }
            th.find('tr').map(function(i,v){
                if( $(v).attr('d-rsp')!=undefined ){
                    $(v).find('th').map(function(x,y){
                        if($(y).attr('colspan')== undefined){
                            $(y).attr('rowspan',$(v).attr('d-rsp'));
                        }
                    });
                }
            })
            t.append(cl);
        },
        addElement: function(parent, element) {
            var tr = $('<tr>');
            if (typeof element == 'string') {
                var td = $('<td>', {text: element});
                tr.append(td);
            } else {
                if (element.hasOwnProperty('items')) {
                    var elem = $('<em>', {
                        class: 'icon-upload7'
                    });
                    var td = $('<td>', {
                        colspan: (widget.rdIndex+1),
                        click: function(e) {
                            var ts = false;
                            var x = 0;
                            var tshi = $(this).parent()[0];
                            $.each($(widget.tbody).find('tr'), function(i, v) {
                                if ($(v).attr('d-role') != undefined) {
                                    if (v == tshi) {
                                        ts = true;
                                        x = i;
                                    } else {
                                        ts = false;
                                    }
                                }
                                if (ts && x < i) {
                                    $(v).toggleClass('d-hidden');
                                }
                            });
                            $(this).find('em').toggleClass('icon-download8');
                            $(this).find('em').toggleClass('icon-upload7');
                        }
                    }).append(
                        $('<label>', {
                            text: element.value
                        })
                    ).append(elem);
                    tr.attr('d-role', 'd-grouppe');
                    tr.append(td);
                    parent.append(tr);
                    $.map(element.items, function(e) {
                        widget.addElement(parent, e);
                    });
                } else {
                    $.map(widget.columnas, function(e) {
                        widget.createRow(e,element,td,tr);
                    });
                    parent.append(tr);
                }
            }
        },
        createRow: function(e,element,td,tr){
            if (e.hasOwnProperty('columns')) {
                e.columns.forEach((x) => widget.createRow(x, element, td, tr));
            } else {
                let td = $('<td>');
                const fieldData = element[e.field];
                const schemaModel = widget.dataSource?.options?.schema?.model?.fields?.[e.field];
                if (!e.hasOwnProperty('format')) {
                    
                    td.text(diving.normalizeText(fieldData));
                } else if (schemaModel) {
                    const fieldType = schemaModel.type;
                    if (fieldType === 'date') {
                        const frm = e.format.replace(/\{0:/, '').replace(/\}/, '');
                        td.text(diving.normalizeText(diving.formatDate(fieldData, frm)));
                    } else if (fieldType === 'number') {
                        td.text(diving.normalizeText(diving.formatNumber(fieldData, e.format)));
                    }
                }
                if (e.hasOwnProperty('attributes')) {
                    Object.keys(e.attributes).forEach((attr) => {
                        td[0].setAttribute(attr, dvn.template(e.attributes[attr], element));
                    });
                }
                tr.append(td);
            }
        },
        createHeader: function(parent, element, colId,th,rdx) {
            if (!element.hasOwnProperty('columns')) {
                var tdh = $('<th>', {
                    'd-index': widget.rdIndex,
                    text: element.title,
                    col: colId,
                    field: element.field
                });
                parent.append(tdh);
                if (element.hasOwnProperty('sortable')) {
                    if (element.sortable) {
                        var em = $('<em>', {
                            class: 'icon-sort-alpha-asc1'
                        });
                        th.append(em);
                        th.click(function() {
                            var d = parent.parent().parent().parent();
                            var dg = d.data('divGrid');
                            var field = $(this).attr('field');
                            if (em.hasClass('icon-sort-alpha-asc1')) {
                                dg.dataSource.sort({
                                    field: field
                                });
                            } else {
                                dg.dataSource.sort({
                                    field: field,
                                    dir: 'desc'
                                });
                            }
                            widget.tbody.empty();
                            $.each(dg.dataSource.elements, function(i, v) {
                                widget.addElement(widget.tbody, v);
                            });
                            em.toggleClass('icon-sort-alpha-desc1');
                            em.toggleClass('icon-sort-alpha-asc1')
                        });
                    }
                }
            }else{
                $(parent.parent()).find('tr').map(function(x,y){
                    if($(y).attr('d-rsp')){
                        $(y).attr('d-rsp',(parseFloat($(y).attr('d-rsp'))+1));
                    }
                });
                var finalizo = false;
                var p = parent[0];
                var cls = element.columns.length;
                do{
                    if(p.previousElementSibling!=null){
                        if(p.previousElementSibling.tagName == 'TR'){
                            p = p.previousElementSibling;
                            if($(p.lastChild).attr('colspan')){
                               $(p.lastChild).attr('colspan',(parseFloat($(p.lastChild).attr('colspan'))+(cls-1))); 
                            }
                        }else{
                            finalizo = true;
                        }
                    }else{
                        finalizo = true;
                    }
                }while(!finalizo);
                parent[0].setAttribute('d-rsp',2);
                var tdh = $('<th>', {
                    text: element.title,
                    col: colId,
                    field: element.field,
                    colspan: element.columns.length
                });
                parent.append(tdh);
                var trh = $('<tr>');
                    th.append(trh);
                var cl = document.createElement('colgroup');
                for (var i = 0; i < element.columns.length; i++) {
                    var v = element.columns[i];
                    var c = document.createElement('col');
                    var cId = 'dGrid-' + '4-0-1-' + ("" + Math.random()).replace(/\D/g, "");
                    c.setAttribute('id', cId);
                    cl.append(c);
                    widget.createHeader(trh, v, cId,th,(rdx+1));
                }
                $(widget.thead).parent().append(cl);
            }
            widget.rdIndex ++;
        }
    };
    diving.widget(widget);
})();
/*Grid*
    (function(){
         var widget = {
            name: "Grid",
            init: function(prm) {
                prm=$.extend(prm,{class:"d-grid",scrollable:(prm.hasOwnProperty('scrollable'))?prm.scrollable:false});
                var widtgetData = {
                    elem:$(this)[0],
                    columns:(prm.columns)?prm.columns:Object.keys(prm.dataSource.data[0]),
                    editing:false,
                    command:prm.commands||null,
                    refresh:function(){
                        prm.dataSource = this.dataSource;
                        widget.createElement(prm,this);
                    }
                };
                widget.createElement(prm,widtgetData);
                $(this).data('div'+widget.name, widtgetData);
                widget.addCommand(prm.commands, widtgetData, widget, prm );
            },
            createElement: function(p,data) {
                $(data.elem).empty();
                $.extend(data,{
                    dataSource:p.dataSource
                });
                if(typeof data.columns[0] == "string"){
                    var oCols=[];
                    $.each(data.columns,function(i,v){
                        oCols.push({title:v,field:v});
                    });
                    data.columns = oCols;
                }
                var th = $('<table>',{'d-role':'t-head'});
                var t = $('<table>',{'d-role':'t-body'});
                var h = $('<thead>',{});
                var b = $('<tbody>',{});
                var cg = document.createElement('COLGROUP');
                var cgh = document.createElement('COLGROUP');
                var oCols = {h:[],b:[]};
                $.extend(data,{
                    'd-head':h,
                    'd-body':b
                });
                var ttal=data.columns.length+((data.dataSource.grupo)?data.dataSource.grupo.length:0)+((p.commands!=null)?p.commands.action.length:0);
                for(var i = 0; i < ttal; i ++ ){
                    var cl = document.createElement('COL');
                    var clh = document.createElement('COL');
                    cg.appendChild(cl);
                    cgh.appendChild(clh);
                    oCols.h.push(clh);
                    oCols.b.push(cl);
                }
                this.createColumns(p,data,b,cg);
                this.createHeaders(p,data,h);
                if(p.title){
                    var cp = document.createElement('CAPTION');
                    cp.appendChild($('<div>',{class:'d-caption-title',text:p.title})[0]);
                    th[0].appendChild(cp);
                }
                th[0].appendChild(cgh);
                t[0].appendChild(cg);
                var dhCnt = $('<div>',{'d-role':'d-content-header',class:'d-grid-header'+((p.scrollable)?' d-grid-scroll':'')}).append(th.append(h));
                var dbCnt = $('<div>',{'d-role':'d-content-body',  class:'d-grid-body'+  ((p.scrollable)?' d-grid-scroll':'')}).append(t.append(b));
                data.elem.append(dhCnt[0]);
                data.elem.append(dbCnt[0]);
                $.each(h.find('tr')[0].cells,function(i,v){
                    $(oCols.b[i]).attr('style','width:'+$(v)[0].offsetWidth+'px');
                });
                if(p.scrollable){
                    dhCnt.attr('style','width:'+($(data.elem)[0].offsetWidth)+'px;');
                    dbCnt.attr('style','width:'+($(data.elem)[0].offsetWidth)+'px;height:'+$.addPx(p.height));
                }else if(p.height){
                    dbCnt.attr('style','overflow:hidden;height:'+dvn.addPx(p.height));
                }
            },
            addCommand:function(command,data, widget, prm){
                if( ( command != null )?command.action.includes('add'):false ){
                    var caption = $($(data.elem).find('table[d-role=t-head]')[0]).find('caption');
                    var cmdR=$('<div>',{class:'d-comand-row'});
                    var cpt = $('<div>',{'d-role':'d-content-command',class:'d-grid-command'}).append(cmdR);
                    var cntCommand=null;
                    if(caption.length==0){
                        cntCommand=document.createElement('CAPTION');
                        cntCommand.appendChild(cpt[0]);
                    }else{
                        cntCommand=cpt;
                    }
                    $(caption[0]).append(cntCommand);
                    for(var i = 0; i < command.action.length; i ++ ){
                        if(command.action[i]=='add'){
                            var cmd = $('<div>');
                            cmdR.append(cmd);
                            $(cmd).divButton({
                                type: 'default',
                                class:'d-comand',
                                'd-role':'t-command',
                                'command':command.action[i],
                                text: command.action[i],
                                click:function(){
                                    if($(this).attr('command')=='add'){
                                        widget.addPopup(data,$(data.elem),(command.hasOwnProperty('popup')?command.popup:false));
                                    }else if($(this).attr('command')=='remove'){
                                        widget.removePopup(data.dataSource,$(data.elem),(command.hasOwnProperty('popup')?command.popup:false));
                                    }else{
                                        widget.updatePopup(data.dataSource,$(data.elem),(command.hasOwnProperty('popup')?command.popup:false));
                                    }
                                }
                            });
                        }
                    }
                }
            },
            addPopup:function(dtSource, element, popup){
                var g=element.data('divGrid');
                if(g.editing)return;
                g.editing=true;
                var flds=(Object.keys(g.dataSource.schema.model.fields).length>0)?g.dataSource.schema.model.fields:obj=$.map(g.columns,function(i){return {[i.field]:{type:'string'}};});
                var obj;
                if(obj!=undefined){obj={};$.each(flds,function(i,v){var k = Object.keys(v)[0];obj[k]={type:v[k].type};});}else{obj=flds;}
                var o={};
                for(var i=0,l=Object.keys(obj).length;i<l;i++){
                    var type=function(t,fld){
                        return $('<div>',{'d-role':'d-grid-edit-text','d-field':fld});
                    }
                    o[Object.keys(obj)[i]]=type(obj[Object.keys(obj)[i]].type,Object.keys(obj)[i]);
                }
                $.map(g.columns,function(a){ return (a.hasOwnProperty('template'))? delete a.template: a; });
                var wdt = this;
                if(popup){
                    var confirmacion = $('<div>',{'d-role':'notificacion',class:'d-col-4'});
                    var dt = new $.store.Source({data: [o],schema:{model:{fields:flds}}});
                    var gg = $('<div>');
                    gg.divGrid({dataSource:dt,columns: g.columns});
                    $('body').append(confirmacion);
                    confirmacion.divNotification({
                        confirm: true,
                        text: gg[0].innerHTML,
                        action:{
                            cancel:function(){
                                element.data('divGrid').editing=false;
                                confirmacion.data('divNotification').destroy();
                            },
                            confirm:function(){
                                var rtext={};
                                $.each(Object.keys(obj),function(i,v){
                                    var t = $('div[d-field='+v+']').data('divText').text;
                                    rtext[v]=(obj[v].type=='number')?parseInt(t):t;
                                });
                                dtSource.dataSource.data.push(rtext);
                                wdt.createTr(element.data('divGrid')['d-body'],rtext,wdt,dtSource);
                                element.data('divGrid').editing=false;
                                confirmacion.data('divNotification').destroy();
                            }
                        },
                        destroy:function(){
                            element.data('divGrid').editing=false;
                            $(this.elem).removeData('divNotification');
                            $(this.elem)[0].remove();
                        }
                    });
                    confirmacion.attr('style',confirmacion.attr('style')+'position: absolute;top: 5em;left: 10em;');
                    var ttl=$(confirmacion).find('div');
                    $.draggable(ttl[0],confirmacion[0]);
                }else{
                    wdt.createTr(element.data('divGrid')['d-body'],o,wdt,dtSource);
                }
                var x1=null;
                $.each(
                    Object.keys(obj),function(i,v){
                        $('div[d-field='+v+']').divText({
                            type:(obj[v].type=='string')?'text':obj[v].type,
                            keyup:function(k){
                                if(!popup){
                                    var t = $('div[d-field='+v+']');
                                    while(((t!=null)?(t[0].nodeName!='TR'):true)){
                                        t=(t==null)?$(this):$($(t)[0].parentNode);
                                    }
                                    if(k.keyCode==27){
                                        t.remove();
                                    }
                                    if(k.keyCode==13){
                                        var nobj={};
                                        $.each(Object.keys(obj),function(i,v){
                                            nobj[v]=(obj[v].type=='number')?parseInt($(o[v]).data('divText').text):$(o[v]).data('divText').text;
                                        });
                                        var dg = $('div[d-field='+v+']');
                                        while(((dg!=null)?((dg.attr('d-role')!=null)?dg.attr('d-role')!='d-content-body':true):true)){
                                            dg=(dg==null)?$(this):$($(dg)[0].parentNode);
                                        }
                                        dg=$(dg[0].parentNode);
                                        dg.data('divGrid').dataSource.data.push(nobj);
                                        wdt.createTr(dg.data('divGrid')['d-body'],nobj,wdt,dg.data('divGrid').dataSource);
                                        dg.data('divGrid').editing=false;
                                        t.remove();
                                    }
                                }
                            }
                        });
                        if(i==0){
                            $('div[d-field='+v+']').find('INPUT')[0].focus();
                        }
                    }
                );
            },
            removePopup:function(data, element){
                var t = $(element);
                while(((t!=null)?(t[0].nodeName!='TR'):true)){
                    t=(t==null)?$(this):$($(t)[0].parentNode);
                }
                $.each(data.relate, function(i,v){
                    if(t[0]==v.tagTr[0]){
                        $.each(data.dataSource.data,function(x,y){
                            if( y['d-row-item'] == v.obj['d-row-item'] ){
                                var dx = data.dataSource.data.splice(x,1);
                                var dy = data.relate.splice(i,1);
                                return false;
                            }
                        });
                        return false;
                    }
                });
                data.dataSource = new $.store.Source(data.dataSource.initParams);
                $(t).remove();
                data.refresh();
            },
            updatePopup:function(data,element,popup){
                var g=$(data.elem).data('divGrid');
                if(g.editing)return;
                g.editing=true;
                var flds=(Object.keys(g.dataSource.schema.model.fields).length>0)?g.dataSource.schema.model.fields:obj=$.map(g.columns,function(i){return {[i.field]:{type:'string'}};});
                var obj;
                if(obj!=undefined){obj={};$.each(flds,function(i,v){var k = Object.keys(v)[0];obj[k]={type:v[k].type};});}else{obj=flds;}
                var o={};
                for(var i=0,l=Object.keys(obj).length;i<l;i++){
                    var type=function(t,fld){
                        return $('<div>',{'d-role':'d-grid-edit-text','d-field':fld});
                    }
                    o[Object.keys(obj)[i]]=type(obj[Object.keys(obj)[i]].type,Object.keys(obj)[i]);
                }
                $.map(g.columns,function(a){ return (a.hasOwnProperty('template'))? delete a.template: a; });
                var wdt = this;
                if(popup){
                    var confirmacion = $('<div>',{'d-role':'notificacion',class:'d-col-4'});
                    var dt = new $.store.Source({data: [o],schema:{model:{fields:flds}}});
                    var gg = $('<div>');
                    gg.divGrid({dataSource:dt,columns: g.columns});
                    $('body').append(confirmacion);
                    confirmacion.divNotification({
                        confirm: true,
                        text: gg[0].innerHTML,
                        action:{
                            cancel:function(){
                                $(data.elem).data('divGrid').editing=false;
                                confirmacion.data('divNotification').destroy();
                            },
                            confirm:function(){
                                var rtext={};
                                $.each(Object.keys(obj),function(i,v){
                                    var t = $('div[d-field='+v+']').data('divText').text;
                                    rtext[v]=(obj[v].type=='number')?parseInt(t):t;
                                });
                                dtSource.dataSource.data.push(rtext);
                                wdt.createTr($(data.elem).data('divGrid')['d-body'],rtext,wdt,dtSource);
                                $(data.elem).data('divGrid').editing=false;
                                confirmacion.data('divNotification').destroy();
                            }
                        },
                        destroy:function(){
                            $(data.elem).data('divGrid').editing=false;
                            $(this.elem).removeData('divNotification');
                            $(this.elem)[0].remove();
                        }
                    });
                    confirmacion.attr('style',confirmacion.attr('style')+'position: absolute;top: 5em;left: 10em;');
                    var ttl=$(confirmacion).find('div');
                    $.draggable(ttl[0],confirmacion[0]);
                }
                /*
                var t = diving(element);
                while(((t!=null)?(t[0].nodeName!='TR'):true)){
                    t=(t==null)?diving(this):diving(diving(t)[0].parentNode);
                }
                var x=0;
                if(popup){
                    console.log( t, x, data, element, popup );
                }
                /*
                    1.- se agrega una columna flotante a cada renglon que aparecera con la leyenda update en el momento del mouse over
                    2.- se construye un grid con las columnas visibles para update
                * /
            },
            createColumns:function(p,data,body){
                var wdgt = this;
                for(var i = p.dataSource.view().length-1; i >= 0; i--){
                    var keys = Object.keys(p.dataSource.view()[i]);
                    wdgt.createTr(body,p.dataSource.view()[i],wdgt, data);
                }
            },
            createTr:function(content, fields,wdgt, data){
                //console.log('\ncontent:', content,'\nfields:', fields,'\nwdgt:', wdgt,'\ndata:', data );
                var ks;
                if(fields.hasOwnProperty('items')){
                    var tr = $('<tr>',{
                        class:'d-grid-tr d-grid-tr-group',
                        'd-rownum':content[0].rows.length,
                        'd-field':fields.field,
                        'd-ctr-clpse':0
                    });
                    ks = Object.keys( fields.items );
                    var rg=-1;
                    var textoGrupo = '';
                    for( var i = 0; i < data.dataSource.grupo.length; i ++ ){
                        textoGrupo = data.dataSource.grupo[i].field;
                        if(data.dataSource.grupo[i].field==fields.field){
                            tr.append(wdgt.createTd($('<em>',{class:'icon-chevron-up1'}),0));
                            tr.attr('d-ctr-clpse',i);
                            rg++;
                            break;
                        }else{
                            rg++;
                            tr.append(wdgt.createTd('',0));
                        }
                    }
                    var td = wdgt.createTd(textoGrupo+':'+fields.value,((data.dataSource.grupo.length-rg)+data.columns.length));
                    tr[0].onclick=function(e){
                        wdgt.colapseGrid( tr,td,content );
                        $($( this ).find('em')[0]).toggleClass('icon-chevron-down1');
                        $($( this ).find('em')[0]).toggleClass('icon-chevron-up1');
                    }
                    tr.append(td);
                    content.append( tr );
                    for(var i = 0; i < fields.items.length; i ++){
                        wdgt.createTr(content,fields.items[i],wdgt,data);
                    }
                }else{
                    var rlate = (data.hasOwnProperty('relate')?data.relate:data.relate=[]);
                    ks = Object.keys(fields);
                    var tr = $('<tr>',{class:'d-grid-tr','d-row-class':'item','d-rownum':content[0].rows.length});
                    rlate.push({obj:fields,tagTr:tr});
                    if(data.dataSource.grupo)
                    for(var j = 0; j < data.dataSource.grupo.length; j ++ ){
                        tr.append(wdgt.createTd('',null));
                    }
                    for( var j = 0; j<ks.length; j ++ ){
                        for(var k = 0; k < data.columns.length; k ++ ){
                            if( data.columns[k].field == ks[j]){
                                tr.append(
                                    wdgt.createTd(
                                        (data.columns[k].hasOwnProperty('template')?
                                            diving.template(data.columns[k].template,fields):
                                        fields[ks[j]]),
                                        null
                                    )
                                );
                            }
                        }
                    }
                    if((data.command!=null)?data.command.hasOwnProperty('action')?data.command.action.includes('update'):false:false){
                        tr.append(
                            wdgt.createTd(
                                $('<em>',{
                                    class:'icon-pen-angled',
                                    click:function(){
                                        wdgt.updatePopup(data,this, data.command.popup );
                                    }
                                }),
                                null
                            )
                        );
                    }
                    if((data.command!=null)?data.command.hasOwnProperty('action')?data.command.action.includes('remove'):false:false){
                        tr.append(
                            wdgt.createTd(
                                $('<em>',{
                                    class:'icon-clearclose',
                                    click:function(){
                                        wdgt.removePopup(data,this);
                                    }
                                }),
                                null
                            )
                        );
                    }
                    content.append(tr);
                }
            },
            createTd:function(text,clspan){
                var td = $('<td>');
                td.append(text);
                if(clspan){
                    td.attr('colspan',clspan);
                }
                return td;
            },
            createHeaders:function(p,data,header){
                var tr = $( '<tr>');
                if(data.dataSource.grupo)
                for(var i=0;i<data.dataSource.grupo.length; i ++){
                    tr.append( $( '<th>'));
                }
                for( var i = 0; i < data.columns.length; i ++ ){
                    tr.append( $( '<th>',{text:data.columns[i].title}));
                }

                if((data.command!=null)?data.command.hasOwnProperty('action')?data.command.action.includes('update'):false:false){
                    tr.append(
                        $('<th>',{})
                    );
                }
                if((data.command!=null)?data.command.hasOwnProperty('action')?data.command.action.includes('remove'):false:false){
                    tr.append(
                        $('<th>',{})
                    );
                }
                header.append( tr );
            },
            colapseGrid:function(tr,td,cnt){
                var grupo = tr.attr('d-field');
                var clpse = tr.attr('d-ctr-clpse');
                for( var i = ( parseInt(tr.attr('d-rownum'))+1); i < cnt[0].rows.length; i ++ ){
                    if( $( cnt[0].rows[i] ).attr('d-field') != grupo ){
                        if( parseInt( $(cnt[0].rows[i]).attr('d-ctr-clpse') ) < clpse ){
                            break;
                        }else{
                            var dhb = $(cnt[0].rows[i]).attr('d-hid-by');
                            if(((dhb!=null)?dhb:grupo)==grupo){
                                $(cnt[0].rows[i]).toggleClass('d-hidden');
                                if($.className.has(cnt[0].rows[i],'d-hidden')){
                                    $(cnt[0].rows[i]).attr('d-hid-by',grupo);
                                }else{
                                    $(cnt[0].rows[i]).removeAttr('d-hid-by');
                                }
                            }
                        }
                    }else{
                        break;
                    }
                }
            }
        };
        diving.widget(widget);
    })();*/






/*Accordion*/
(function() {
    var widget = {
        name: "Accordion",
        init: function(prm) {
            prm = $.extend(prm, {
                class: 'd-accordion ' + (prm.class || '')
            });
            var widgetData = {
                element: $(this)[0],
                items: prm.items || [],
                destroy: function() {
                    $(this.element).removeData('div' + widget.name);
                    $(this.element)[0].remove();
                },
                remove: function(elem) {
                    $.each($(this.element).find('button'), function(i, v) {
                        if (v.innerHTML == elem) {
                            var itm = $(v).parent().parent();
                            itm.remove();
                        }
                    });
                },
                addElement: function(elem) {
                    var id_item = ((this.element.lastElementChild != null ? parseFloat($(this.element.lastElementChild).attr('id_role')) : null) || 0) + 1;
                    var itm = $('<div>', { class: 'accordion-item', id_role: id_item });
                    var head = $('<h2>', { class: 'accordion-header', id: 'acrd_' + ($(this.element).attr('id')) + '_' + id_item });

                    var btnHead = $('<button>', {
                        class: 'accordion-button ' + (elem.show ? '' : 'collapsed'),
                        type: 'button',
                        'data-bs-toggle': "collapse",
                        'data-bs-target': "#collapse_" + ($(this.element).attr('id')) + '_' + id_item,
                        'aria-expanded': (elem.show ? 'true' : 'false'),
                        'aria-controls': "collapse_" + ($(this.element).attr('id')) + '_' + id_item
                    });

                    btnHead.append(elem.title);
                    var dvCnt = $('<div>', {
                        class: 'accordion-collapse collapse ' + (elem.show ? 'show' : ''),
                        id: "collapse_" + ($(this.element).attr('id')) + '_' + id_item,
                        'aria-labelledby': "heading_" + ($(this.element).attr('id')) + '_' + id_item,
                        'data-bs-parent': "#" + ($(this.element).attr('id'))
                    });
                    var dvAcBody = $('<div>', {
                        class: 'accordion-body'
                    });
                    dvAcBody.append(elem.content);
                    $(this.element).append(
                        itm.append(
                            head.append(
                                btnHead
                            )
                        ).append(
                            dvCnt.append(
                                dvAcBody
                            )
                        )
                    );
                },
                dataBind: function(newData) {
                    // Limpiar el DOM y volver a renderizar los elementos
                    $(this.element).empty();
                    this.items = newData.items || [];
                    this.render();
                },
                render: function() {
                    var ts = this;
                    $.each(this.items, function(i, v) {
                        ts.addElement(v);
                    });
                }
            };

            // Implementar la función de enlace de datos inicial
            widgetData.render();

            delete prm.items;
            widget.createElement(prm, widgetData);
            $(this).data('div' + widget.name, widgetData);
            return $(this);
        },
        createElement: function(p, data) {
            $(data.element).empty();
            $(data.element).addClass('accordion' + ' ' + p.class);
            data.render();
        }
    };
    diving.widget(widget);
})();





/*Coding*/
(function() {
    var widget = {
        name: "Coding",
        init: function(prm) {
            prm = $.extend(prm, {
                class: 'd-coding'
            });
            var widtgetData = {
                elem:$(this)[0],
                textArea: null,
                value:prm.value
            };
            delete prm.value;
            widget.createElement(prm,widtgetData);
            $(this).data('div'+widget.name, widtgetData);
            return $(this);
        },
        createElement: function(p,data) {
            $(data.elem).empty();
            data.elem.style.border = 'solid 1px #f4f4f4';
            var tArea = $('<textarea>');
            $(data.elem).append(tArea);
            var area = tArea[0];
            var opj = {};
            if(p.hasOwnProperty('append')){
                opj['append'] = p.append;
            }
            if(p.hasOwnProperty('prepend')){
                opj['prepend'] = p.prepend;
            }
            tArea[0].value = p.prepend+'\n'+
                          data.value+'\n'+
                          p.append;
            data.value = tArea[0].value;
            var optionMode = {
                              name: "htmlmixed",
                              tags: {
                                style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
                                        [null, null, "css"]],
                                custom: [[null, null, "customMode"]]
                              }
                            };
            var editor = CodeMirror.fromTextArea(area,{
                mode: p.mode||optionMode,
                selectionPointer:true,
                lineNumbers:true,
                extraKeys:p.keys
            });
            data['editor'] = editor;
            editor.on('change',function(e){
                data.value = editor.getValue();
            });
        }
    };
    diving.widget(widget);
})();

class Source {
    constructor(p) {
        this.options={};
        if(p.schema?.model?.fields!=undefined){
            this.options = {schema: {model: {fields: (p.schema?.model?.fields) || {}}}};
        }
        this.setData(p.data);
        if (p.group) this.group(p.group);
        if (p.sort) this.sort(p.sort);
        if (p.aggregate) this.aggregate(p.aggregate, this.options);
        return this;
    }
    aggregate(a, c) {
        const data = c.data?.[0]?.items ? c.data.map(item => item.items) : c.data || c;
        if (!data) return;
        Object.entries(a).forEach(([key, { field }]) => {
            const total = data.reduce((sum, item) => sum + item[field], 0);
            data.forEach(item => {
                item[`aggregate_${key}`] = key === 'avg' ? item[field] / total : total;
            });
        });
    }
    setData(data) {
        this.options.data = {
            dataItems:data.map(item => {
                const fields = this.options?.schema?.model?.fields||{};
                for (const [key, field] of Object.entries(fields)) {
                    if (field.type === 'number') item[key] = parseFloat(item[key]);
                    else if (field.type === 'date') item[key] = new Date(item[key]);
                    else if (field.type === 'string') item[key] = String(item[key]);
                }
                return item;
            })
        };
    }
    view() {return this.options.data.dataItems;}
    group(p) {this.options.data.dataItems = diving.group(this.options.data.dataItems, p);}
    sort(order) {
        const orders = Array.isArray(order) ? order : [order];
        this.options.data.dataItems.sort((a, b) => {
            for (const { field, dir } of orders) {
                const direction = dir === 'desc' ? -1 : 1;
                if (a[field] > b[field]) return direction;
                if (a[field] < b[field]) return -direction;
            }
            return 0;
        });
    }
}
diving.data = diving.data || {};
diving.data.DataSource = Source;
