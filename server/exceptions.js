function AccessDenied() {}

AccessDenied.prototype = Object.create(Error.prototype, { 
  constructor: { value: AccessDenied } 
});

function InvalidUser() {}
InvalidUser.prototype = Object.create(Error.prototype, { 
	  constructor: { value: InvalidUser } 
});

exports.AccessDenied = AccessDenied;
exports.InvalidUser = InvalidUser;
