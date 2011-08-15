/*

 */

jQuery(document).ready(function($) {
	/*
	 * Add a "Preview" link next to each textarea, as well as divs we'll be using to store stuff
	 */
	var ownerDocument = top.document;
	$('body')
		.append(
			$(document.createElement('div')).attr('id','preview-textarea')
				.append(
					$(document.createElement('div')).attr('id','preview-textarea-title')
				).append(
					$(document.createElement('div')).attr('id','preview-textarea-content')
				)
		).append(
			$(document.createElement('div')).attr('id','preview-textarea-overlay')
		);

	$('textarea[class!=""]').before(
		$(document.createElement('a')).text('Preview').addClass('preview-textarea-button')
	);

	$('a.preview-textarea-button').click(function(event) {
		event.preventDefault();
		var thePackage = $(this).siblings('textarea');
		if (thePackage.val().length == 0) {
			$(this).after('&#160;<strong>This textarea is empty!</strong>').next().delay(5000).fadeOut('slow');
		}
		else {
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
					
					$('#preview-textarea-title', ownerDocument).html('Preview of ' + fieldLabel + ' using the ' + $(xml).find("formatter").text() + ' formatter <a title="Close preview">Close</a>');

					$('#preview-textarea-content', ownerDocument).html(($(xml).find("preview").html()));
					var previewTop = windowHeight/2 - $('#preview-textarea', ownerDocument).height()/2;
					if(previewTop < 0) { previewTop = 100; }
					$('#preview-textarea', ownerDocument).css({
						'top': previewTop,
						'left': windowWidth/2 - $('#preview-textarea', ownerDocument).width()/2
						});

					var overlayHeight = ($(ownerDocument).height() > $('#preview-textarea', ownerDocument).height()) ? $(ownerDocument).height() : $('#preview-textarea', ownerDocument).height() + 200;

					$('#preview-textarea-overlay', ownerDocument).width(windowWidth).height(overlayHeight).fadeTo('fast',0.75);
					$('#preview-textarea', ownerDocument).fadeIn('fast');
					$('#preview-textarea-title a, #preview-textarea-overlay', ownerDocument).click(function() {
						$('#preview-textarea, #preview-textarea-overlay', ownerDocument).fadeOut();
					});
				},
				cache: false
			});
		}
	});
});