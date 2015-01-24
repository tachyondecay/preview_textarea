<?php

	require_once(TOOLKIT . '/class.jsonpage.php');
	require_once(TOOLKIT . '/class.textformattermanager.php');
	
	class contentExtensionPreview_textareaPreview extends JSONPage {

		public function view() {
			// Determine which formatter to use
			// The textarea keeps this info in its class attribute, but sometimes there might be additional classes.
			// We'll grab one that matches the installed formatters.
			//$fM = new TextformatterManager($this);
			$formatter_handle = array_pop(array_intersect(array_keys(TextformatterManager::listAll()), explode(' ', $_POST['formatter'])));

			// We pass the full formatter name back for use in the preview display
			$response = array(
				'formatter' => '',
				'preview' => ''
				);

			if(!empty($formatter_handle)) {
				$formatter = TextformatterManager::create($formatter_handle);
				$formatter_about = $formatter->about();

				$response['formatter'] = $formatter_about['name'];
				$response['preview'] = $formatter->run($_POST['formatText']);
			}

			$this->_Result = $response;
		}
	}