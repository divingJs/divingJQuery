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
})

$('#area').load('../../pages/complementos/Config/complementHome.html');