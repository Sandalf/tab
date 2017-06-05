const referralParams = {
    REFERRING_USER: 'referringUser',
}

// 'utm_medium'
// 'utm_source'
// 'utm_campaign'
// 'utm_term'
// 'utm_content'
// 'tfac_id'

function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

function validateCode(code) {
	return (new RegExp('^\\d+$')).test(code);
}

function validatePassword(password, config) {
	var regex = {
		lowercase: "^(?=.*[a-z])",
		uppercase: "^(?=.*[A-Z])",
		numeric: "^(?=.*[0-9])",
		special: "^(?=.*[!@#\$%\^&\*])",
	};

	if(config.minSize) {
		regex['minSize'] = "^(?=.{" + config.minSize + ",})";
	}

	const result = {
		valid: true,
	};

	for(var prop in config) {
		if(config[prop] && regex[prop]) {
			result[prop] = (new RegExp(regex[prop])).test(password)
			if(!result[prop]) 
				result.valid = false;
		} else {
			result[prop] = true;
		}
	}	
	
	return result;
}

function getUrlParameters() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
}

function updateReferralData(urlParams) {
	for(var fieldKey in referralParams){
		var field = referralParams[fieldKey];
		if(urlParams[field]){
			// update in local storage
		}
	}
}

function getReferralData() {
	var data = {};
	for(var fieldKey in referralParams){
		var field = referralParams[fieldKey]; 
		data[field] = null; // get field from localstorage.
	}
	return data;
}


export {
	validateEmail,
	validatePassword,
	validateCode,
	getUrlParameters,
	getReferralData,
	updateReferralData
}