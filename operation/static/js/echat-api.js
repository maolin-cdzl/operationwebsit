(function ($) {
	$.extend({
		eChatApi: function() {
			var api = {};
			var host_url = 'http://localhost:3000/rt';

			api.onAjaxError= function(e) {
				alert(e);
			};
			api.getDeviceSet= function(callback) {
				$.ajax({
					url: host_url + '/dev/info',
					method: 'GET',
					success: function(receivedData, status, info) {
						console.info(receivedData);
						var text = '{ \"devices\" : ' + receivedData + '}';
						console.info('text: %s',text);
						var jobj = JSON.parse(text);

						console.info('devices length: %d', jobj.devices.length);
						callback(jobj.devices);
					},
					error: api.onAjaxError
				});
			};
			api.getServerList = function(callback) {
				$.ajax({
					url: host_url + '/server/list',
					method: 'GET',
					success: function(receivedData,status,info) {
						console.info(receivedData);
						var servers = JSON.parse(receivedData);
						callback(servers);
					},
					error: api.onAjaxError
				});
			};

			api.listenServerEvent = function(opt) {
				api.server_sse = $.SSE(host_url + '/server/pub',opt);
				api.server_sse.start();

			};
			return api;
		}
	});
})(jQuery)
