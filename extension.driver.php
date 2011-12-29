<?php

	Class Extension_Preview_Textarea extends Extension {

		public function about() {
			return array(
				'name' => 'Preview Textarea',
				'version' => '1.0.3',
				'release-date' => '2011-12-28',
				'author' => array(
					'name' => 'Ben Babcock',
					'website' => 'http://tachyondecay.net/',
					'email' => 'ben@tachyondecay.net',
				),
				'description' => 'Preview the formatted version of a textbox while editing an entry.'
			);
		}

		public function getSubscribedDelegates() {
			return array(
				array(
					'page' => '/backend/',
					'delegate' => 'AdminPagePreGenerate',
					'callback' => '__appendAssets'
				),
			);
		}

		public function __appendAssets(&$context) {
			if(class_exists('Administration')
				&& Administration::instance() instanceof Administration
				&& Administration::instance()->Page instanceof HTMLPage
			) {
				$callback = Administration::instance()->getPageCallback();

				// Let the jQuery magic flow 
				if($context['oPage'] instanceof contentPublish) {
					Administration::instance()->Page->addStylesheetToHead(URL . '/extensions/preview_textarea/assets/preview_textarea.publish.css', 'screen', 100, false);
					Administration::instance()->Page->addStylesheetToHead(URL . '/extensions/preview_textarea/assets/preview_textarea.user.css', 'screen', 1000, false);
					Administration::instance()->Page->addScriptToHead(URL . '/extensions/preview_textarea/assets/preview_textarea.publish.js', 100, false);
				}
			}
		}
	}