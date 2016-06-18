(function ($) {
	$.extend({
		eChatApi: function() {
			var api = {};
			var host_url = 'http://139.198.2.25:8080/rt';

			api.onAjaxError= function(e) {
				alert(e);
			};
			api.listenServerEvent = function(opt) {
				api.server_sse = $.SSE(host_url + '/server/pub',opt);
				api.server_sse.start();
			};

			api._getStaticUrl = function(url,callback) {
				$.ajax({
					url: host_url + url,
					method: 'GET',
					success: function(receivedData,status,info) {
						if( typeof(receivedData) === 'string' ) {
							callback(JSON.parse(receivedData));
						} else {
							callback(receivedData);
						}
					},
					error: api.onAjaxError
				});
			};
			api._getEntityAttrib = function(entity,id,attrib,callback) {
				$.ajax({
					url: host_url + '/' + entity + '/' + id + '/' + attrib,
					method: 'GET',
					success: function(receivedData,status,info) {
						if( typeof(receivedData) === 'string' ) {
							callback(JSON.parse(receivedData));
						} else {
							callback(receivedData);
						}
					},
					error: api.onAjaxError
				});
			};
			api._getEntityAttribWithParam = function(entity,id,attrib,options,callback) {
				$.ajax({
					url: host_url + '/' + entity + '/' + id + '/' + attrib,
					method: 'GET',
					data: options,
					success: function(receivedData,status,info) {
						if( typeof(receivedData) === 'string' ) {
							callback(JSON.parse(receivedData));
						} else {
							callback(receivedData);
						}
					},
					error: api.onAjaxError
				});
			};

			api.agentCount = function(callback) {
				api._getStaticUrl('/agent/count',callback);
			};
			api.agentList = function(callback) {
				api._getStaticUrl('/agent/list',callback);
			};
			api.agentCompany = function(agent,callback) {
				api._getEntityAttrib('agent',agent,'company',callback);
			};
			api.agentSubs = function(agent,callback) {
				api._getEntityAttrib('agent',agent,'subs',callback);
			};

			api.getDeviceSet= function(callback) {
				api._getStaticUrl('/dev/info',callback);
			};

			api.getServerList = function(callback) {
				api._getStaticUrl('/server/list',callback);
			};
			api.serverUserCount = function(server,callback) {
				api._getEntityAttrib('server',server,'usercount',callback);
			};
			api.serverUser = function(server,callback) {
				api._getEntityAttrib('server',server,'users',callback);
			};
			api.serverUserLoad = function(server,options,callback) {
				api._getEntityAttribWithParam('server',server,'userload',options,callback);
			};
			api.serverSpeakLoad = function(options,callback) {
				api._getEntityAttribWithParam('server',server,'speakload',options,callback);
			};

			api.userCount = function(callback) {
				api._getStaticUrl('/user/count',callback);
			};
			api.userCompany = function(uid,callback) {
				api._getEntityAttrib('user',uid,'company',callback);
			};
			api.userState = function(uid,callback) {
				api._getEntityAttrib('user',uid,'state',callback);
			};
			api.userServer = function(uid,callback) {
				api._getEntityAttrib('user',uid,'server',callback);
			};
			api.userGroup = function(uid,callback) {
				api._getEntityAttrib('user',uid,'group',callback);
			};
			api.userDevice = function(uid,callback) {
				api._getEntityAttrib('user',uid,'device',callback);
			};
			api.userLastLogin = function(uid,callback) {
				api._getEntityAttrib('user',uid,'lastlogin',callback);
			};
			api.userLastLogout = function(uid,callback) {
				api._getEntityAttrib('user',uid,'lastlogout',callback);
			};
			api.userActions = function(uid,options,callback) {
				api._getEntityAttribWithParam('user',uid,'actions',options,callback);
			};
			api.userSessions = function(uid,options,callback) {
				api._getEntityAttribWithParam('user',uid,'sessions',options,callback);
			};
			api.userBrokens = function(uid,options,callback) {
				api._getEntityAttribWithParam('user',uid,'brokens',options,callback);
			};
			api.companyCount = function(callback) {
				api._getStaticUrl('/company/count',callback);
			};
			api.companyList = function(callback) {
				api._getStaticUrl('/company/list',callback);
			};
			api.companyAgent = function(company,callback) {
				api._getEntityAttrib('company',company,'agent',callback);
			};
			api.companySubs = function(company,callback) {
				api._getEntityAttrib('company',company,'subs',callback);
			};
			api.companyUserCount = function(company,callback) {
				api._getEntityAttrib('company',company,'usercount',callback);
			};
			api.companyUsers = function(company,callback) {
				api._getEntityAttrib('company',company,'users',callback);
			};
			api.companyGroupCount = function(company,callback) {
				api._getEntityAttrib('company',company,'groupcount',callback);
			};
			api.companyGroups = function(company,callback) {
				api._getEntityAttrib('company',company,'groups',callback);
			};
			api.companyTempGroupCount = function(company,callback) {
				api._getEntityAttrib('company',company,'tempgroupcount',callback);
			};
			api.companyTempGroups = function(company,callback) {
				api._getEntityAttrib('company',company,'tempgroups',callback);
			};
			api.companyUserLoad = function(company,options,callback) {
				api._getEntityAttribWithParam('company',company,'userload',options,callback);
			};
			api.companySpeakLoad = function(company,options,callback) {
				api._getEntityAttribWithParam('company',company,'speakload',options,callback);
			};
			api.companySessions = function(company,options,callback) {
				api._getEntityAttribWithParam('company',company,'sessions',options,callback);
			};

			api.groupCount = function(callback) {
				api._getStaticUrl('/group/count',callback);
			};
			api.groupList = function(callback) {
				api._getStaticUrl('/group/list',callback);
			};
			api.groupServer = function(group,callback) {
				api._getEntityAttrib('group',group,'server',callback);
			};
			api.groupUsers = function(group,callback) {
				api._getEntityAttrib('group',group,'users',callback);
			};

			api.tempgroupCount = function(callback) {
				api._getStaticUrl('/tempgroup/count',callback);
			};
			api.tempgroupList = function(callback) {
				api._getStaticUrl('/tempgroup/list',callback);
			};
			api.tempgroupServer = function(group,callback) {
				api._getEntityAttrib('tempgroup',group,'server',callback);
			};
			api.tempgroupUsers = function(group,callback) {
				api._getEntityAttrib('tempgroup',group,'users',callback);
			};

			return api;
		}
	});
})(jQuery)
