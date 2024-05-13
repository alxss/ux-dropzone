import { Controller } from '@hotwired/stimulus';

class default_1 extends Controller {
  connect() {
    this.clear();
    this.previewClearButtonTarget.addEventListener('click', () => this.clear());
    this.inputTarget.addEventListener('change', (event) => this.onInputChange(event));
    this.dispatchEvent('connect');
  }
  clear() {
    this.inputTarget.value = '';
    this.inputTarget.style.display = 'block';
    this.placeholderTarget.style.display = 'block';
    this.previewTarget.style.display = 'none';
    this.previewImageTarget.style.display = 'none';
    this.previewImageTarget.style.backgroundImage = 'none';
    this.previewFilenameTarget.textContent = '';
    document.querySelectorAll('.dropzone-preview-image-container').forEach(function (e) {
      return e.remove();
    });
    this.dispatchEvent('clear');
  }
  onInputChange(event) {
    for (var fileItem in event.target.files) {
      var file = event.target.files[fileItem];

      if (typeof file === 'undefined') {
        return;
      } // Hide the input and placeholder


      this.inputTarget.style.display = 'none';
      this.placeholderTarget.style.display = 'none';
      this.previewTarget.style.display = 'flex'; // If the file is an image, load it and display it as preview

      this.previewImageTarget.style.display = 'none';

      if (file.type && file.type.indexOf('image') !== -1) {
        this._populateImagePreview(file);
      }

      this.dispatchEvent('change', file);
    }
  }
  _populateImagePreview(file) {
    var _this2 = this;

    if (typeof FileReader === 'undefined') {
      // FileReader API not available, skip
      return;
    }

    var reader = new FileReader();
    reader.addEventListener('load', function (event) {
      var parentDiv = document.createElement("div");
      parentDiv.classList.add('dropzone-preview-image-container');
      var divPreview = document.createElement("div");
      divPreview.classList.add('dropzone-preview-image');
      divPreview.style.backgroundImage = 'url("' + event.target.result + '")';
      var divFileName = document.createElement("div");
      divFileName.textContent = file.name;
      parentDiv.appendChild(divPreview);
      parentDiv.appendChild(divFileName);

      _this2.previewImageTarget.parentNode.appendChild(parentDiv);
    });
    reader.readAsDataURL(file);
  }
  dispatchEvent(name, payload = {}) {
    this.dispatch(name, { detail: payload, prefix: 'dropzone' });
  }
}
default_1.targets = ['input', 'placeholder', 'preview', 'previewClearButton', 'previewFilename', 'previewImage'];

export { default_1 as default };
