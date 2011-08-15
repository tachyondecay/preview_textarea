/*

 */

jQuery(document).ready(function($) {
	/*
	 * Add a "Preview" link next to each textarea, as well as divs we'll be using to store stuff
	 */
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
					var windowHeight = $(window).height();
					var windowWidth = $(window).width();
					
					var fieldLabel = thePackage.parent().clone().children().remove().end().text();
					
					$('#preview-textarea-title').html('Preview of ' + fieldLabel + ' using the ' + $(xml).find("formatter").text() + ' formatter <a title="Close preview">Close</a>');

					$('#preview-textarea-content').html(($(xml).find("preview").html()));
					var previewTop = windowHeight/2 - $('#preview-textarea').height()/2;
					if(previewTop < 0) { previewTop = 100; }
					$('#preview-textarea').css({
						'top': previewTop,
						'left': windowWidth/2 - $('#preview-textarea').width()/2
						});

					var overlayHeight = ($(document).height() > $('#preview-textarea').height()) ? $(document).height() : $('#preview-textarea').height() + 200;

					$('#preview-textarea-overlay').width(windowWidth).height(overlayHeight).fadeTo('fast',0.75);
					$('#preview-textarea').fadeIn('fast');
					$('#preview-textarea-title a, #preview-textarea-overlay').click(function() {
						$('#preview-textarea, #preview-textarea-overlay').fadeOut();
					});
				},
				cache: false
			});
		}
	});
});