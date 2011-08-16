<?php

	require_once(TOOLKIT . '/class.ajaxpage.php');
	require_once(TOOLKIT . '/class.textformattermanager.php');
	
	class contentExtensionPreview_textareaPreview extends AjaxPage {

		public function view() {
			// Determine which formatter to use
			// The textarea keeps this info in its class attribute, but sometimes there might be additional classes.
			// We'll grab one that matches the installed formatters.
			$fM = new TextformatterManager($this);
			$formatter_handle = array_pop(array_intersect(array_keys($fM->listAll()), explode(' ', $_POST['formatter'])));

			// We pass the full formatter name back for use in the preview display
			$format_name = new XMLElement('formatter');
			$preview = new XMLElement('preview');

			if(empty($formatter_handle)) {
				$format_name->setValue('None');
				$preview->setValue($_POST['formatText']);
			}
			else {
				$formatter = $fM->create($formatter_handle);
				$formatter_about = $formatter->about();

				$format_name->setValue($formatter_about['name']);
				$preview->setValue($formatter->run($_POST['formatText']));
			}

			$this->_Result->appendChild($format_name);
			$this->_Result->appendChild($preview);
		}

	}