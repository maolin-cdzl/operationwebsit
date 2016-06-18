$(document).ready(function(){
	var api = $.eChatApi();
	api.getDeviceSet(function(devices){
		devices.sort(function(a,b){
			if( a.count > b.count ) {
				return -1;
			} else if( a.count < b.count ) {
				return 1;
			} else {
				return 0;
			}
		});
		$.each(devices, function(i, item) {
			console.log(item);
			var $tr = $('<tr>').append(
					$('<td>').text(item.name),
					$('<td>').text(item.count)
					);
			$tr.appendTo('#device-list');
		});
	});
});
