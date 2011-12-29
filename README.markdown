# Preview Textarea

Generates a live preview lightbox of the formatted version of a textarea while editing an entry.

I've tested this extension with Symphony's default textarea field as well as Rowan's [text box](https://github.com/rowan-lewis/textboxfield) field. If you encounter issues with other textarea fields, please let me know.

- Version: 1.0.3
- Author: Ben Babcock <ben@tachyondecay.net>
- Updated: December 28, 2011
- GitHub Repository: https://github.com/tachyondecay/preview_textarea

## Installation & Use

You can always install the latest version through git: `git clone git://github.com/tachyondecay/preview_textarea.git`

- Make sure that the extension is in a folder named `preview_textarea`. Upload this to your Symphony `extensions` folder.
- Enable the extension from the **Extensions** page in the Symphony backend.
- On the publishing page for a section, textareas will now have a `Preview` link next to their labels. This link will generate a formatted version of the textarea's content and display it as a preview lightbox.

If you want to change the styling on the preview, edit `assets/preview_textarea.user.css` and add your own styles.

## Changelog

### 1.0.3 (December 28, 2011)

- [#5](https://github.com/tachyondecay/preview_textarea/issues/5): Users can override the lightbox's default styling by editing a custom CSS file.

### 1.0.2 (August 20, 2011)

- [#3](https://github.com/tachyondecay/preview_textarea/pull/3): Changed jQuery selector to work with 'MarkItUp' enhanced fields. (Thanks to [@henrysingleton](https://github.com/henrysingleton))

### 1.0.1 (August 19, 2011)

- [#2](https://github.com/tachyondecay/preview_textarea/issues/2): Override some of the backend styles for the preview box.

### 1.0 (August 16, 2011)

- Initial release.
