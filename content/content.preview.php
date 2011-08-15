<?php

	require_once(TOOLKIT . '/class.ajaxpage.php');
	require_once(TOOLKIT . '/class.textformattermanager.php');
	
	class contentExtensionPreview_textareaPreview extends AjaxPage {

		public function view() {
			

			$fM = new TextformatterManager($this);
			$formatter = $fM->create($_POST['formatter']);
			$formatter_about = $formatter->about();

			$format_name = new XMLElement('formatter');
			$format_name->setValue($formatter_about['name']);
			$this->_Result->appendChild($format_name);

			$preview = new XMLElement('preview');
			$preview->setValue($formatter->run($_POST['formatText']));
			$this->_Result->appendChild($preview);
		}

	}