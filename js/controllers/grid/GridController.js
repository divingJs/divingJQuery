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
     //sort:{field: 'FPLG_DESC_STR',str:'desc'},
     //group:[{field: 'SBC_CVE_N'}],
     schema:{
          model:{
               fields:{
                    FEC_ITI_DT:   {type: 'string'   },
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
        {field:'ID_ART'        , title:'ARTICULO',template:'<div><em class="icon-close1"></em>#:ID_ART#</div>'},
        {field:'FEC_ITI_DT'    , title:'FECHA ITINERARIO',format:'#:dd/MM/yy#'},
        {field:'SBC_CVE_N'     , title:'SBC_CVE_N',attributes:{'style':"#=SBC_CVE_N<200?'background:rgb(166,166,241)':'background:rgb(211,140,140)'#"}},
        {field:'EQR_TA_STR'    , title:'EQR_TA_STR'},
        {field:'FPLG_DESC_STR' , title:'FPLG_DESC_STR'},
        {field:'DIV_CVE_N'     , title:'DIV_CVE_N'},
        {field:'COL_DESC_STR'  , title:'COL_DESC_STR'},
        {field:'CURSOR'        , title:'CURSOR'},
        {field:'CAT_CVE_N'     , title:'CAT_CVE_N',attributes:{'style':"#=CAT_CVE_N<50?'background:rgb(166,166,241)':'background:rgb(211,140,140)'#"}},
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
    width: '5000px'
    ,height: '300px'
});
var g = $('#grid').data('divGrid')
//console.log( g );
