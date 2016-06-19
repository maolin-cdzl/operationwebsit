api = undefined;
current_gid = 0;

function initFromUrl() {
	var gid = api.getURLParameter('gid');
	if( gid ) {
		$('#gid-edit').val(gid);
		refresh();
	}
}

function refresh() {
	var gid = $('#gid-edit').val();
	if( !gid || gid == current_gid ) {
		return;
	}
	current_gid = gid;
	updateGroupInfo();
	updateUserList();
}

function updateGroupInfo() {
	$('#server-hold').children().remove();
	api.groupServer(current_gid,function(servers,err){
		if( !servers ) {
			return;
		}
		for(var i=0; i < servers.length; i++) {
			$('#server-hold').append('<a href="/runtime/server/?server="' + servers[i] + '">所在服务器: ' + servers[i] + '</a>');
		}
	});
}

function updateUserList() {
	$('#user-list').children().remove();
	api.groupUsers(current_gid,function(users,err){
		if( !users ) {
			return;
		}
		for(var i=0; i < users.length; i++) {
			$('#user-list').append('<a href="/runtime/user/detail/?uid=' + users[i] + '" class="list-group-item">' + users[i] + '</a>');
		}
	});
}

$(document).ready(function(){
	api = $.eChatApi();
	$('#gid-btn').click(function(){
		refresh();
	});
	$('#gid-edit').keydown(function(e){
		if(e.keyCode == 13) {
			refresh();
		}
	});

	initFromUrl();
});
