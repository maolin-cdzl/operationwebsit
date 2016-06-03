(function ($) {
	$.extend({
		eChatApi: function() {
			var api = {};
			var url_prefix = '/rt';

			api.onAjaxError= function(e) {
				alert(e);
			};
			api.getDeviceSet= function(callback) {
				$.ajax({
					url: url_prefix + '/dev/info',
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
			}
			return api;
		}
	});
})(jQuery)
