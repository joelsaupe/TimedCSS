# TimedCSS.js

TimedCSS.js allows for style sheets to be loaded dynamically based on the time of day. This is a great tool for adding a night mode, but flexible enough to be fullfill other use cases.

## Installation

1. Clone it. `git clone https://github.com/joelsaupe/TimedCSS.git`
2. Include JavaScript file in `<head>` of project.
3. Initialize `TimedCSS(params)` with parameters. (See **Usage** for implementation details)

## Usage
### Implementation Location
In order to ensure that the proper stylesheets are loaded before the content of the page, it is recommended that TimedCSS.js be implemented in the `<head>` of your project as follows:
```
<head>
  ...
  <script src="timed-css.min.js"></script>
	<script>
		TimedCSS(params);
	</script>
	...
</head>
```
----
### Implementation Method
#### Single Stylesheet (option 1)
######`TimedCSS(filepath, startTime, stopTime, interval)`

#### Single Stylesheet (option 2)
If preferred, you may pass the filepath with start/end time as an object, followed by the interval if desired.
######`TimedCSS({filepath, startTime, stopTime}, interval)`

#### Multiple Stylesheets
Following the object format of option 2 above, you may include multiple stylesheets by adding them to an `Array` and including this as the first parameter.
######`TimedCSS([{filepath, startTime, stopTime}, ...], interval)`

---
### Parameters
Each of the implementation methods above uses the following parameters.

***filepath*** is the path to the stylesheet. *required*

***startTime*** is the time that the stylesheet should be enabled. *required*

***endTime*** is the time that the stylesheet should be disabled. *required*

***interval*** is the interval (in ms) at which the stylesheets should be checked to be enabled/disabled. *default: 10000ms*

#####Time Format
*startTime* and *stopTime* will accept a standard timestamp string where the hour, minutes, and seconds will be parsed to determine the start/stop time.

#####Interval
The *interval* parameter is optional and by default is set to 10000ms (10sec). This means that after the page is loaded, TimedCSS will rerun in order to determine if there are any changes to the stylesheets that should and shouldn't be loaded. If you would like to disable this feature and only have the css add on page load then you may set this parameter to either `false`, or any number less than 0.

***Note:*** The 10sec default is arbitrary, it was chosen to make sure that stylesheets would be loaded at relatively the requested time, but wouldn't be too costly on the page's performance.
Time may also be formatted as a string of `'hh:mm:ss'`.

If TimedCSS.js is unable to parse the time, then the current system time will be used instead.


## Contributing

1. Fork it.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.
 
## Future

Some things that could possibly be added in the future are:
1. Allow a stylesheet to never be enabled once it is disabled.
2. Allow a stylesheet to never be disabled once it is enabled.
3. Add public methods to check which stylesheets are loaded, as well as to be able to get/set parameters after initialization.
4. Add public methods to allow additional stylesheets to be added/removed dynamically.

## Credits

Written as a proof of concept by on 17 August 2015 Joel Saupe.

http://joelsaupe.com

## License

The MIT License (MIT)

Copyright (c) 2015 Joel Saupe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.