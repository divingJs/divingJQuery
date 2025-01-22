/*
$('#menu').divListView({
	elements:[
        {text:"Article",elements:[
            {text:'Header',href:'../../pages/complementos/Config/article_header.html'},
            {text:'Section',href:'../../pages/complementos/Config/article_seccion.html'},
            {text:'Footer',href:'../../pages/complementos/Config/article_footer.html'}
            ]
        },
        {text:'DataSource',elements:[
                {text:'Creacion',href:'../../pages/complementos/Config/DataSource.html'}
                ]
        },
        {text:'Iconos',href:'../../pages/complementos/Config/iconos.html'}
    ],
    openTo:'#area',
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
})*/


var dts = new diving.data.DataSource({
     data:[
        {text:"Article",elements:[
            {text:'Header',href:'../../pages/complementos/Config/article_header.html'},
            {text:'Section',href:'../../pages/complementos/Config/article_seccion.html'},
            {text:'Footer',href:'../../pages/complementos/Config/article_footer.html'}
            ]
        },
        {text:'DataSource',elements:[
                {text:'Data',href:'../../pages/complementos/DataSource/DataSource.html'},
                {text:'Fields',href:'../../pages/complementos/DataSource/fields.html'}
                ]
        },
        {text:'Iconos',href:'../../pages/complementos/Config/iconos.html'}
    ]
});




var g = $('#menu').divListView({
     dataSource:dts,
     textField:'text',
     valueField:'href',
     class:'list-group-flush',
     click:function(){
          var _lv = $('#menu').data('divListView');
          var href = _lv.selected[0].value;
          //console.log(_lv.selected);
          $( '#area' ).load(
                (href.startsWith('http')?
                href:
                (window.location.href.replace('index.html','').replace(/\#$/gm,'')) + href
                )
            );
     }//,template:'<div class="row"><div class="col-sm-9">#:text#</div><div class="col-sm-3">#:value#</div></div>'
}).data('divListView');





$('#area').load('../../pages/complementos/Config/complementHome.html');