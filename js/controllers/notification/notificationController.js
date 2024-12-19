
$('#salidaCofigura').divNotification({
	text:$('#mensaje'),
	type:'warning'
});
$('#not1').divNotification({
	text:'Lorem ipsum dolor sit amet.<br/>'+
		 'Eum numquam eaque voluptates quibusdam.<br/>'+
		 'Quam tempora iusto architecto ipsam!',
	type:'success',
	icon:{
		class:'icon-alert-triangle',
		dir:'left'
	}
});
$('#not2').divNotification({
	text:'Lorem ipsum dolor sit amet.<br/>'+
		 'Eum numquam eaque voluptates quibusdam.<br/>'+
		 'Quam tempora iusto architecto ipsam!',
	type:'success',
	icon:{
		class:'icon-alert-triangle',
		dir:'right'
	}
});