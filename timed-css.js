/**
* TimedCSS dynamically adds/removes stylesheets based on the time of day.
* This is useful for adapting the design of a page for night time viewing.
*
* Author: Joel Saupe
* Version: 0.1 
* Last Updated: 17 August 2015
*/
function TimedCSS() {
	
	_parseArguments(arguments);

	function _parseArguments(arguments) {
		var files, checkAfterLoad, timeInterval;
		if (arguments.length < 1) {
			throw new TimedCSSError('No arguments provided.');
		}
		// Array of objects, then settings format.
		if (arguments[0].constructor === Array) {
			files = arguments[0];
			timeInterval = !arguments[1] ? 10000 : +arguments[1];
			checkAfterLoad = +arguments[1] > 0;
		}
		// Object, then settings format.
		else if (typeof arguments[0] === 'object') {
			files = [arguments[0]];
			timeInterval = !arguments[1] ? 10000 : +arguments[1];
			checkAfterLoad = +arguments[1] > 0;
		}
		// All arguments format. Requires at least 3 arguments to work.
		else if (arguments.length >= 3) {
			files = [{
				src: arguments[0],
				start: arguments[1],
				stop: arguments[2],
			}];
			timeInterval = !arguments[3] ? 10000 : +arguments[3];
			checkAfterLoad = +arguments[3] > 0;
			
		}
		// Unable to parse arguments.
		else {
			throw new TimedCSSError('Invalid Arguments');
		}
		_addFiles(files, checkAfterLoad, timeInterval);
	}

	/**
	*	Custom Error class for displaying TimedCSS errors to the user.
	*/
	function TimedCSSError(message) {
		this.message = message;
		this.name = 'TimedCSS Error';
	}
	
	/**
	* Adds given stylesheets to the dom. Begins a timer to check if requested.
	*/
	function _addFiles(files, checkAfterLoad, interval){
		// Loop through the files given and add them to the head.
		for (var i = 0; i < files.length; i++) {
			// Build the new link object to add to the dom.
			var file = files[i];
		    var link  = document.createElement('link');
		    link.className = 'timed-css-link-file';
		    link.rel  = 'stylesheet';
		    link.type = 'text/css';
		    link.href = file.src;
		    link.media = 'all';
		    link.disabled = !_isActiveFile(file);
		    // Add the link to the dom.
		    var head  = document.getElementsByTagName('head')[0];
		    head.appendChild(link);
		}
		// Start a timer to check the stylesheets if requested.
		if (checkAfterLoad) {
			setInterval(
				function() {
					_checkFiles(files);
			}, interval);
		}
	}

	/**
	* Enables/disables css files added with TimedCSS based on the user's current time and the
	* start/stop time variables specified for each css file.
	*/
	function _checkFiles(files) {
		// Make a list of inactive css files.
		var inactiveFiles = [];
		for (var i = 0; i < files.length; i++) {
			if (!_isActiveFile(files[i])) {
				inactiveFiles.push(files[i].src);
			}
		}
		// Enable/disable the stylesheets as appropriate.
		var cssFiles = document.getElementsByClassName('timed-css-link-file');
		for (var i = 0; i < cssFiles.length; i++) {
			cssFiles[i].disabled = inactiveFiles.indexOf(cssFiles[i].getAttribute('href')) > -1;
		}
	}

	/**
	* Parses the times related to this file and returns true if the css file should be active.
	*/
	function _isActiveFile(file) {
		var currentTime = _parseTime();
		var startTime = _parseTime(file.start);
		var endTime = _parseTime(file.stop);
		return currentTime >= startTime && currentTime < endTime;
	}

	/**
	* Parses time based on a given timestring. Accepts default timestrings,
	* as well as strings formated as 'hh:mm:ss'. If unable to parse the time then the user's
	* current time is used.
	*
	* Returns the number of seconds since 12:00am.
	*/
	function _parseTime(timeString) {
		var time;
		// Try to parse the time given, otherwise just return the current time.
		try {
			var parsed = Date.parse(timeString);
			if (parsed) {
				time = new Date(parsed);
			} else {
				var split = timeString.split(':');
				time = new Date();
				time.setHours(+split[0] ? +split[0] % 24 : 0);
				time.setMinutes(+split[1] ? +split[1] % 60 : 0);
				time.setSeconds(+split[2] ? +split[2] % 60 : 0);	
			}
		}
		catch(e) {
			time = new Date();
		}
		return time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
	}
}