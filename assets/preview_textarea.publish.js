/*
 * Preview Textarea
 * 
 * Grab value of a textarea and run it through that textarea's formatter,
 * then display a live preview of the result.
 */

jQuery(document).ready(function($) {
	// Add a "Preview" link next to each textarea, as well as divs we'll be using to store stuff
	$('body').append('<div id="preview-textarea"><div id="preview-textarea-title"></div><div id="preview-textarea-content"></div></div><div id="preview-textarea-overlay"></div>');
	$('textarea').before('<a class="preview-textarea-button">Preview</a>');

	$('a.preview-textarea-button').click(function(event) {
		event.preventDefault();
		var thePackage = $(this).parent().find('textarea');
		if (thePackage.val().length == 0) {
			$(this).after('&#160;<strong>This textarea is empty!</strong>').next().delay(5000).fadeOut('slow');
		}
		else {
			// Let's drop some AJAX.
			$.ajax({
				type: 'POST',
				dataType: 'html',
				url: Symphony.Context.get('root') + '/symphony/extension/preview_textarea/preview/',
				data: { 
					formatText: thePackage.val(),
					formatter: thePackage.attr('class')
				},
				success: function(xml) {
					var windowHeight = $(window.top).height();
					var windowWidth = $(window.top).width();
					
					var fieldLabel = thePackage.parent().clone().children().remove().end().text();
					var formatter_name = ($(xml).find("formatter").text() == 'None') ? 'no formatter' : 'the <em>' + $(xml).find("formatter").text() + '</em> formatter';
					$('#preview-textarea-title', top.document).html('Preview of <em>' + fieldLabel + '</em> using ' + formatter_name + ' <a title="Close preview">Close</a>');

					// Magic to determine the width and height of the preview box and the overlay
					$('#preview-textarea-content', top.document).html(($(xml).find("preview").html()));
					var previewTop = windowHeight/2 - $('#preview-textarea', top.document).height()/2;
					if(previewTop < 0) { previewTop = 100; }
					$('#preview-textarea', top.document).css({
						'top': previewTop,
						'left': windowWidth/2 - $('#preview-textarea', top.document).width()/2
						});

					var overlayHeight = ($(top.document).height() > $('#preview-textarea', top.document).height()) ? $(top.document).height() : $('#preview-textarea', top.document).height() + 200;

					// Close the preview if the overlay or the "Close" anchor are clicked
					$('#preview-textarea-overlay', top.document).width(windowWidth).height(overlayHeight).fadeTo('fast',0.75);
					$('#preview-textarea', top.document).fadeIn('fast');
					$('#preview-textarea-title a, #preview-textarea-overlay', top.document).click(function() {
						$('#preview-textarea, #preview-textarea-overlay', top.document).fadeOut();
					});
				},
				cache: false
			});
		}
	});
});