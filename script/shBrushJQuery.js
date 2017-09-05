/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83.2 (Jan 25 2013)
 *
 * @auther
 * Yohei (logroid)
 *
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush()
	{
		var constants =	'window location history document Math console'
						;
		var keywords =	'break case catch continue ' +
						'default delete do else false  ' +
						'for function if in instanceof ' +
						'new null return super switch ' +
						'this throw true try typeof var while with'
						;
		var jquery =	'add addBack addClass after ajax ajaxComplete ajaxError ajaxPrefilter ajaxSend ajaxSetup ajaxStart ajaxStop ajaxSuccess ajaxTransport always animate append appendTo attr ' +
						'before bind blur ' +
						'Callbacks change children clearQueue click clone closest contains contents context css cssHooks currentTarget ' +
						'data dblclick Deferred delay delegate delegateTarget dequeue detach disable disabled done ' +
						'each empty end eq error extend ' +
						'fadeIn fadeOut fadeTo fadeToggle fail filter find finish fire fired fireWith first focus focusin focusout fx.interval fx.off ' +
						'get getJSON getScript globalEval grep ' +
						'has hasClass hasData height hide holdReady hover html ' +
						'inArray index innerHeight innerWidth insertAfter insertBefore is isArray isDefaultPrevented isEmptyObject isFunction isImmediatePropagationStopped isNumeric isPlainObject isPropagationStopped isWindow isXMLDoc ' +
						'jquery jQuery ' +
						'keydown keypress keyup ' +
						'last length load lock locked ' +
						'makeArray map merge metaKey mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup ' +
						'namespace next nextAll nextUntil noConflict noop not notify notifyWith now ' +
						'off offset offsetParent on one outerHeight outerWidth ' +
						'pageX pageY param parent parents parentsUntil parseHTML parseJSON parseXML position post prepend prependTo prev prevAll preventDefault prevUntil progress promise prop proxy pushStack ' +
						'queue ' +
						'ready reject rejectWith relatedTarget remove removeAttr removeClass removeData removeProp replaceAll replaceWith resize resolve resolveWith result ' +
						'scroll scrollLeft scrollTop select selector serialize serializeArray show siblings slice slideDown slideToggle slideUp state stop stopImmediatePropagation stopPropagation submit support ' +
						'target text then timeStamp toArray toggle toggleClass trigger triggerHandler trim type ' +
						'unbind undelegate unique unwrap ' +
						'val ' +
						'when which width wrap wrapAll wrapInner'
						;
		var jqueryDeprecatedRemoved =	
						// version deprecated: 1.3
						'boxModel ' +
						// version deprecated: 1.3, removed: 1.9
						'browser ' +
						// version deprecated: 1.7
						'isRejected ' +
						// version deprecated: 1.7, removed: 1.8
						'isResolved ' +
						// version deprecated: 1.7, removed: 1.9
						'die live sub ' +
						// version deprecated: 1.8
						'andSelf pipe size unload'
						;

		var r = SyntaxHighlighter.regexLib;
		
		this.regexList = [
			{ regex: r.multiLineDoubleQuotedString,					css: 'string' },			// double quoted strings
			{ regex: r.multiLineSingleQuotedString,					css: 'string' },			// single quoted strings
			{ regex: r.singleLineCComments,							css: 'comments' },			// one line comments
			{ regex: r.multiLineCComments,							css: 'comments' },			// multiline comments
			{ regex: /\s*#.*/gm,									css: 'preprocessor' },		// preprocessor tags like #region and #endregion
			{ regex: new RegExp(this.getKeywords(constants), 'gm'),	css: 'constants' },			// constants
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),	css: 'keyword' },			// keywords
			{ regex: new RegExp(this.getKeywords(jquery), 'gm'),	css: 'color2' },			// jquery
			{ regex: new RegExp(this.getKeywords(jqueryDeprecatedRemoved), 'gm'),	css: 'color3' }			// jquery deprecated/removed
			];
	
		this.forHtmlScript(r.scriptScriptTags);
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['jq', 'jquery', 'jQuery'];

	SyntaxHighlighter.brushes.JQuery = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
