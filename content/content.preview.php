<?php

	require_once(TOOLKIT . '/class.ajaxpage.php');
	require_once(TOOLKIT . '/class.textformattermanager.php');
	
	class contentExtensionPreview_textareaPreview extends AjaxPage {

		public function view() {
			$preview = new XMLElement('preview');

			$fM = new TextformatterManager($this);
			$formatter = $fM->create($_POST['formatter']);
			$preview->setValue($formatter->run($_POST['formatText']));
			$this->_Result->appendChild($preview);
		}

	}