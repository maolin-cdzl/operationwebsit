function setupDatePicker() {
	$('#dp-start').datetimepicker({locale: 'zh_CN'});
	$('#dp-end').datetimepicker({
		locale: 'zh_CN',
		useCurrent: false //Important! See issue #1075
	});
	$("#dp-start").on("dp.change", function (e) {
		$('#dp-end').data("DateTimePicker").minDate(e.date);
	});
	$("#dp-end").on("dp.change", function (e) {
		$('#dp-start').data("DateTimePicker").maxDate(e.date);
	});

	var now = new Date();
	$('#dp-end').data('DateTimePicker').date(now);
	now.setHours(0);
	now.setMinutes(0);
	now.setSeconds(0);
	now.setMilliseconds(0);
	$('#dp-start').data('DateTimePicker').date(now);
}

api = undefined;
current_uid = 0;

function updateUserInfo() {
	$('#user-info').find("tr:gt(0)").remove();
	api.userInfo(current_uid,function(user,err){
		if( user == null ) {
			return;
		}
		$('#user-info').find('tbody:last').append('<tr>'
			+ '<td>' + user.uid + '</td>'
			+ '<td>' + user.account + '</td>'
			+ '<td>' + user.name + '</td>'
			+ '<td>' + user.role + '</td>'
			+ '<td><a href="/runtime/company/detail/?cid=' + user.company + '">' + user.company + '</a></td>'
			+ '<td>' + user.create_time + '</td>'
			+ '<td>' + user.service_begin + '</td>'
			+ '<td>' + user.service_end + '</td>'
			+ '</tr>'
		);
	});
}

function updateUserRuntimeInfo() {
	$('#user-runtime').find("tr:gt(0)").remove();
	var userRuntime = {	};
	function setUserRuntime() {
		$('#user-runtime').find('tbody:last').append('<tr>'
			+ '<td>' + current_uid + '</td>'
			+ '<td>' + userRuntime.state + '</td>'
			+ '<td><a href="/runtime/server/?server=' + userRuntime.server + '">' + userRuntime.server + '</a></td>'
			+ '<td><a href="/runtime/group/detail/?gid=' + userRuntime.group + '">' + userRuntime.group + '</a></td>'
			+ '<td>' + userRuntime.device+ '</td>'
			+ '<td>' + userRuntime.lastLogin + '</td>'
			+ '<td>' + userRuntime.lastLogout + '</td>'
			+ '</tr>'
		);
	}
	api.userState(current_uid,function(state,err){
		if( state ) {
			userRuntime.state = state;
		} else {
			userRuntime.state = 'unknown';
		}
		if( Object.keys(userRuntime).length >= 6 ) {
			setUserRuntime();
		}
	});
	api.userServer(current_uid,function(ser,err){
		if( ser ) {
			userRuntime.server = ser;
		} else {
			userRuntime.server = 'unknown';
		}
		if( Object.keys(userRuntime).length >= 6 ) {
			setUserRuntime();
		}
	});
	api.userGroup(current_uid,function(group,err){
		if( group ) {
			userRuntime.group = group;
		} else {
			userRuntime.group = 0;
		}
		if( Object.keys(userRuntime).length >= 6 ) {
			setUserRuntime();
		}
	});
	api.userDevice(current_uid,function(dev,err){
		if( dev ) {
			userRuntime.device = dev;
		} else {
			userRuntime.device = 'unknown';
		}
		if( Object.keys(userRuntime).length >= 6 ) {
			setUserRuntime();
		}
	});
	api.userLastLogin(current_uid,function(login,err){
		if( login ) {
			userRuntime.lastLogin = login.datetime;
		} else {
			userRuntime.lastLogin = 'unknown';
		}
		if( Object.keys(userRuntime).length >= 6 ) {
			setUserRuntime();
		}
	});
	api.userLastLogout(current_uid,function(logout,err){
		if( logout ) {
			userRuntime.lastLogout = logout.datetime;
		} else {
			userRuntime.lastLogout = 'unknown';
		}
		if( Object.keys(userRuntime).length >= 6 ) {
			setUserRuntime();
		}
	});
}

function updateSessionList() {
	var start = $('#dp-start').data('DateTimePicker').date();
	var end = $('#dp-end').data('DateTimePicker').date();
	var options = {
		start: start.format('YYYY-MM-DD HH:mm:ss'),
		end: end.format('YYYY-MM-DD HH:mm:ss')
	};
	$('#session-table').find("tr:gt(0)").remove();
	api.userSessions(current_uid,options,function(sessions,err){
		if( !sessions ) {
			return;
		}
		sessions.sort(function(a,b){
			return a['l:tvstart'].localeCompare(b['l:tvstart']);
		});
		for(var i=0; i < sessions.length; i++) {
			var session = sessions[i];
			$('#session-table').find('tbody:last').append('<tr>'
				+ '<td>' + session['l:tvstart'] + '</td>'
				+ '<td>' + session['l:tvend'] + '</td>'
				+ '<td><a href="/runtime/server/?server=' + session['l:svc'] + '">' + session['l:svc'] + '</a></td>'
				+ '<td>' + session['l:dev'] + '</td>'
				+ '<td>' + session['l:dev-id'] + '</td>'
				+ '<td>' + session['l:imsi'] + '</td>'
				+ '<td>' + session['l:ip'] + '</td>'
				+ '<td>' + session['l:ctx'] + '</td>'
				+ '<td>' + session['l:ex-pt'] + '</td>'
				+ '</tr>'
			);
		}
	});
}

function updateActionList() {
	var start = $('#dp-start').data('DateTimePicker').date();
	var end = $('#dp-end').data('DateTimePicker').date();
	var options = {
		start: start.format('YYYY-MM-DD HH:mm:ss'),
		end: end.format('YYYY-MM-DD HH:mm:ss')
	};
	$('#action-table').find("tr:gt(0)").remove();

	api.userActions(current_uid,options,function(actions,err) {
		if( !actions ) {
			return;
		}
		actions.sort(function(a,b){
			return a['l:dt'].localeCompare(b['l:dt']);
		});
		var dom = $('#action-table').find('tbody:last');
		for(var i=0; i<actions.length; i++){
			var action = actions[i];
			dom.append('<tr>'
				+ '<td>' + action['l:dt'] + '</td>'
				+ '<td>' + action['l:event'] + '</td>'
				+ '<td>' + ( action['l:gid'] ? ('<a href="/runtime/group/detail/?gid=' + action['l:gid'] + '">' + action['l:gid'] + '</a>') : '') + '</td>'
				+ '<td>' + ( action['l:tar'] || '') + '</td>'
				+ '<td>' + ( action['l:tar-got'] || '') + '</td>'
				+ '<td>' + ( action['l:tar-dent'] || '') + '</td>'
				+ '<td>' + ( action['l:count'] || '') + '</td>'
				+ '<td>' + ( action['l:sw'] || '') + '</td>'
				+ '<td>' + ( action['l:val'] || '') + '</td>'
				+ '</tr>'
			);
		}
	});
}


function refresh() {
	var uid = $('#uid-edit').val();
	if( !uid || uid == current_uid ) {
		return;
	}
	current_uid = uid;
	updateUserInfo();
	updateUserRuntimeInfo();

	updateSessionList();
	updateActionList();
}

function initFromUrl() {
	var uid = api.getURLParameter('uid');
	if( uid ) {
		$('#uid-edit').val(uid);
		refresh();
	}
}

$(document).ready(function(){
	api = $.eChatApi();
	setupDatePicker();
	$('#uid-btn').click(function(){
		refresh();
	});
	$('#uid-edit').keydown(function(e){
		if(e.keyCode == 13) {
			refresh();
		}
	});
	$('#refresh').click(function(){
		updateSessionList();
		updateActionList();
	});

	initFromUrl();

});


