/*
var tbs=$('#division').divTabsTrip({
        content:[
            {title: 'titulo 1', id:'elem_1', element: $('<div>',{text:'loopReplacer(match, start, end, snippet)'})},
            {title: 'titulo 2', id:'elem_2', element: $('<div>',{text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, accusantium ut commodi. Eius laudantium facere ullam quasi voluptates dolorum, inventore assumenda, non, officia, maiores quisquam debitis? Voluptatem nulla perspiciatis voluptates omnis! Quia facere dolorum explicabo, dicta incidunt aspernatur repellat natus alias magni, minus maxime consequatur debitis quo vitae laborum impedit culpa distinctio unde dolorem ipsum consectetur? Eos ducimus quisquam rerum laborum eum, repellat, quod reiciendis nam ipsum officiis dolorum tempora perspiciatis illum corrupti, tempore voluptates autem ullam assumenda quas. Vero officia, saepe blanditiis labore, dolor, doloribus amet deserunt necessitatibus eius dolore, consequuntur corporis temporibus obcaecati! Voluptatibus eos recusandae alias dicta?'})},
            {title: 'titulo 3', id:'elem_3', element: $('<div>',{text:'estas en el contenido 3'})},
            {title: 'titulo 4', id:'elem_4', element: $('<div>',{text:'estas en el contenido 4'})},
            {title: 'titulo 5', id:'elem_5', element: $('<div>',{text:'estas en el contenido 5'}),open:true},
            {title: 'titulo 6', id:'elem_6', element: $('<div>',{text:'estas en el contenido 6'})},
            {title: 'titulo 7', id:'elem_7', element: $('<div>',{text:'estas en el contenido 7'})}
        ]
    }).data('divTabsTrip');
console.log( tbs );
tbs.addElement({title:'titulo 8',id:'elem_8',element:'hola que tal como estas'});
tbs.open('#elem_6');
tbs.removeElement('#elem_4');
*/



$('#config').divListView({
    elements:[
        {text:'Configuracion',elements:[
            {text:'Elements',href:'/pages/TabsTrip/Config/Elements.html'},
            {text:'Open',href:'/pages/TabsTrip/Config/open.html'}
        ]},
        {text:'Eventos',elements:[
            {text:'AddElement',href:'/pages/TabsTrip/Config/addElement.html'},
            {text:'Open',href:'/pages/TabsTrip/Config/methodOpen.html'},
            {text:'Remove',href:'/pages/TabsTrip/Config/remove.html'},
            {text:'selected',href:'/pages/TabsTrip/Config/getSelected.html'}
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
