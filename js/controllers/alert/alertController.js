
$('#salidaCofigura').divAlert({
	text:$('#mensaje'),
	class:'personal'
});


$('#not1').divAlert({
	text:'Lorem ipsum dolor sit amet.<br/>'+
		 'Eum numquam eaque voluptates quibusdam.<br/>'+
		 'Quam tempora iusto architecto ipsam!',
	type:'success',
	icon:{
		class:'icon-flashed-face-glasses1',
		dir:'left'
	}
});



$('#not2').divAlert({
	text:'Lorem ipsum dolor sit amet.<br/>'+
		 'Eum numquam eaque voluptates quibusdam.<br/>'+
		 'Quam tempora iusto architecto ipsam!',
	icon:{
		class:'icon-alert-triangle',
		dir:'right'
	}
});



$('#not3').divAlert({

	text:'Lorem ipsum dolor sit amet.<br/>'+
		 'Eum numquam eaque voluptates quibusdam.<br/>'+
		 'Quam tempora iusto architecto ipsam!',
	close:true

});



$('#not4').divAlert({
	text:'Lorem ipsum dolor sit amet.<br/>'+
		 'Eum numquam eaque voluptates quibusdam.<br/>'+
		 'Quam tempora iusto architecto ipsam!'
}).data('divAlert').closeTime(1000);