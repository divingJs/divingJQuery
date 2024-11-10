
	var cierreScript = "<"+"/script>";
	var vle = 
		'<html>\n'+
		'<head>\n'+
		'	<meta charset="UTF-8">\n'+
		'	<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'+
		'	<title>diving</title>\n'+
		'	<script src="https://code.jquery.com/jquery-3.7.1.js">'+cierreScript+'\n'+
		'	<script type="text/javascript" d-role="d-editor-script" src="js/diving-4.0.1.js">'+cierreScript+'\n'+
		'	<link rel="stylesheet" href="css/diving-4.0.1.css">\n'+
		'	<link  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"    rel="stylesheet">\n'+
		'	<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" >'+cierreScript+'\n'+
		'	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" 	>'+cierreScript+'\n'+
		'</head>\n'+
		'<body>\n';


	var vle2 = 
		'<html>\n'+
		'<head>\n'+
		'	<meta charset="UTF-8">\n'+
		'	<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'+
		'	<title>diving</title>\n'+
		'	<script src="https://code.jquery.com/jquery-3.7.1.js">'+cierreScript+'\n'+
		'\n'+
		'	<link rel="stylesheet" href="../../css/diving-4.0.1.css">\n'+
		'	<script type="text/javascript" d-role="d-editor-script" src="../../js/diving-4.0.1.js">'+cierreScript+'\n'+
		'\n'+
		'	<link  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"    rel="stylesheet">\n'+
		'	<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" >'+cierreScript+'\n'+
		'	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" 	>'+cierreScript+'\n'+
		'</head>\n'+
		'<body>\n';

function create(frame,text){
	$('#cntSalida').empty();
	$('#cntSalida').append('<iframe src="" frameborder="0" id="salida"></iframe>');
	var ifrm = $('#'+frame)[0].contentWindow;
	var doc = ifrm.document;
	var head = text.match(/<head([a-zA-Z0-9\,\.\/\:\@\<\>\s\"\=\-]+)head>/gm)[0];
	var body = text.replace(head,'').replace('<html>','').replace('<body>','').replace('</body>\n</html>','');
	doc.open();
    doc.write(head);
    doc.write(body);
    doc.close();
	setTimeout(function(){
		var ifrm = $('#'+frame)[0].contentWindow;
		var doc = ifrm.document;
		var jsCript = doc.body.querySelectorAll('script');
		var js = '';
		$.each(jsCript,function(i,v){
			js+=v.childNodes[0].textContent;
		});
		try{
			ifrm.eval(js);
		}catch(e){
			console.log( e );
		}
	},100);
	setTimeout(function(){
		var he = $($('#codigo')[0].nextElementSibling)[0].offsetHeight;
		$('#salida')[0].style.height=he+'px';
		$('#salida')[0].style.width='100%';
		$('#salida')[0].style.border='solid 1px #f4f4f4';
	},100);
}

var myModeSpec = {
  name: "htmlmixed",
  tags: {
    style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
            [null, null, "css"]],
    custom: [[null, null, "customMode"]]
  }
};


function create_2(frame,text,idIfrOut){
	$('#'+idIfrOut).empty();
	$('#'+idIfrOut).append('<iframe src="" frameborder="0" id="'+frame+'"></iframe>');
	var ifrm = $('#'+frame)[0].contentWindow;
	var doc = ifrm.document;
	var head = text.match(/<head([a-zA-Z0-9\,\.\/\:\@\<\>\s\"\=\-]+)head>/gm)[0];
	var body = text.replace(head,'').replace('<html>','').replace('<body>','').replace('</body>\n</html>','');
	doc.open();
	head.replaceAll('pages/complementos/','../../');
    doc.write(head);
    doc.write(body);
    doc.close();
	setTimeout(function(){
		var ifrm = $('#'+frame)[0].contentWindow;
		var doc = ifrm.document;
		var jsCript = doc.body.querySelectorAll('script');
		var js = '';
		$.each(jsCript,function(i,v){
			js+=v.childNodes[0].textContent;
		});
		try{
			ifrm.eval(js);
		}catch(e){
			console.log( e );
		}
	},100);
}