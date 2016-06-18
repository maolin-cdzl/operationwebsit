$(document).ready(function(){
	var api = $.eChatApi();
	api.getServerList(function(servers){
		var dom = document.getElementById("server-count");
		dom.innerHTML = servers.length;
	});
	api.userCount(function(count){
		var dom = document.getElementById("user-count");
		dom.innerHTML = count;
	});
	api.groupCount(function(count){
		var dom = document.getElementById("group-count");
		dom.innerHTML = count;
	});
	api.companyCount(function(count){
		var dom = document.getElementById("company-count");
		dom.innerHTML = count;
	});
	api.getDeviceSet(function(devices){
		console.info('devices length: %d', devices.length);
		var map = { 'GD83': 0, 'GD85': 0, 'G180': 0,'G500': 0, 'GH700':0,'other': 0};
		for(var i=0; i < devices.length; i++) {
			var dev = devices[i];
			if( dev.name.indexOf('GD83') > -1 ) {
				map['GD83'] += dev.count; 
			} else if( dev.name.indexOf('GD85') > -1 ) {
				map['GD85'] += dev.count;
			} else if( dev.name.indexOf('G180') > -1 ) {
				map['G180'] += dev.count;
			} else if( dev.name.indexOf('G500') > -1 ) {
				map['G500'] += dev.count;
			} else if( dev.name.indexOf('GH700') > -1 ) {
				map['GH700'] += dev.count;
			} else {
				map['other'] += dev.count;
			}
		}

		var data = [];
		for(var name in map) {
			data.push({ label: name, data: map[name] });
		}
		var opt = {
			series: {
				pie: {
					show: true
				}
			},
			grid: {
				hoverable: true
			},
			tooltip: true,
			tooltipOpts: {
				content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
				shifts: {
					x: 20,
					y: 0
				},
				defaultTheme: false
			}
		};
		var plotObj = $.plot($("#device-load"), data,opt);
	});
});
