/**
 * Oboro
 * An easy way to print all your Blogger blog-posts in a simple list with links and dates.
 * @author Ulises López
 * MIT license
 */
(function () {
	"use strict";

	var _feedUrl = "";

	var _$container = null;

	var _dateFormat = "({m} {d}, {y})";

	var _monthsLabels = [
		"january",   "february", "march",    "april",
		"may",       "june",     "july",     "august",
		"september", "october",  "november", "december"
	];

	function _toInt(value) {
		return parseInt(value) || 0;
	}

	function _getNode(cssExpr) {
		return document.querySelector(cssExpr);
	}

	function _newHtmlNode(type) {
		return document.createElement(type);
	}

	function _newTextNode(content) {
		return document.createTextNode(content);
	}

	function _isTypeOf(data, type) {
		return data !== null && typeof data === type;
	}

	function _formatDate(date) {
		var arr = date.split(/[\-T]/).slice(0, 3);
		var day = _toInt(arr[2]);
		var year = _toInt(arr[0]);
		var month = _toInt(arr[1]) - 1;

		return _dateFormat.replace(/\{[dmy]\}/g, function (match) {
			switch (match) {
				case "{d}": return day;
				case "{m}": return _monthsLabels[month];
				case "{y}": return year;
				default   : return "";
			}
		});
	}

	function _render(response) {
		var $ul = _newHtmlNode("ul");
		    $ul.className = "oboro";

		response.feed.entry.forEach(function (item) {
			var $a = _newHtmlNode("a");
			var $li = _newHtmlNode("li");
			var $text = _newTextNode(" ");
			var $span = _newHtmlNode("span");

			$a.className = "oboro-item__link";
			$li.className = "oboro-item";
			$span.className = "oboro-item__date";

			$a.href = item.link[2].href;
			$a.title = item.title.$t;
			$a.innerText = item.title.$t;
			$span.innerText = _formatDate(item.published.$t);

			$li.appendChild($a);
			$li.appendChild($text);
			$li.appendChild($span);
			$ul.appendChild($li);
		});

		_$container.appendChild($ul);
	}

	function _error(message) {
		console.error(new Error(message));
	}

	function _load() {
		return new Promise(function (resolve, reject) {
			var error = null;
			var request = new XMLHttpRequest();

			request.open("GET", _feedUrl, true);
			request.responseType = "json";
			request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			request.onload = function () {
				if (request.status === 200) {
					resolve(request.response);
				} else {
					reject("Oh, no! Server responded with status: " + request.statusText);
				}
			};

			request.onerror = function () {
				reject("Oh, no! Something went wrong...");
			};

			request.send();
		});
	}

	function _setDateFormat(dateFormat) {
		if (_isTypeOf(dateFormat, "string")) {
			_dateFormat = dateFormat;
		}
	}

	function _setMonthsLabels(monthsLabels) {
		if (Array.isArray(monthsLabels)) {
			monthsLabels = monthsLabels.slice(0, 12);
			
			monthsLabels.forEach(function (label, index) {
				if (_isTypeOf(label, "string")) {
					_monthsLabels[index] = label;
				}
			});
		}
	}

	function _init(options) {
		_$container = _getNode(options.container);

		if (_$container) {
			_setDateFormat(options.dateFormat);
			_setMonthsLabels(options.monthsLabels);

			_load().then(_render, _error);
		} else {
			console.warn("Container selector references a non-existing DOM element");
		}
	}

	window.addEventListener("load", function () {
		var data = this._WidgetManager._GetAllData();
		_feedUrl = data.blog.homepageUrl + "feeds/posts/summary?alt=json";
		
		this.oboro = _init;
	});
}());
