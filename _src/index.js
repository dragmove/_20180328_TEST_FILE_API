import aid from 'aid.js';

(function ($) {
  'use strict';

  const browser = aid.browser;

  /*
   * implement
   */
  $(document).ready(init);

  function setOneFileInput() {
    let fileInput = $('#file-input');

    fileInput.on('change', function (evt) {
      console.log('evt :', evt);

      let files = this.files;
      console.log('files :', files);

      for (let i = 0, max = files.length; i < max; i++) {
        let file = files[i];
        console.log('file :', file);

        /*
         let reader = new FileReader();
         reader.onload = function () {
         let img = document.createElement('img');
         img.onload = function () {
         console.log('image natural width, height :', img.naturalWidth, img.naturalHeight);
         };

         img.onerror = function () {
         console.log('can not load image');
         };

         img.src = reader.result;

         $('body').append(img);
         };

         reader.readAsDataURL(file);
         */

        let img = document.createElement('img'),
          objectURL = window.URL.createObjectURL(file); // get blob url
        console.log('objectURL :', objectURL);

        img.src = objectURL;

        $('body').append(img);
      }
    });
  }

  function setMultipleFileInput() {

  }

  function setDropAndDropFile() {
    if (!browser.isSupportDraggable()) window.alert('this browser does not support draggable attribute');
    if (!browser.isSupportDragAndDrop()) window.alert('this browser does not support methods related drag.');
    if (!browser.isSupportFileApi()) window.alert('this browser does not support File API.');

    let files = [];

    $('#drop-zone').on({
      'dragenter': function (event) {
        console.log('enter');
      },
      'dragleave': function (event) {
        console.log('leave');
      },
      'dragover': function (event) {
        event.preventDefault();
        console.log('over');
      },
      'drop': function (event) {
        event.preventDefault();
        console.log('drop');

        files = event.originalEvent.dataTransfer.files || [];
        if (files && files.length) {
          let output = '';
          for (let i = 0, max = files.length; i < max; i++) {
            let file = files[i];
            console.log('file :', file);

            output += '<p>name : ' + file.name + '</p>';
            output += '<p>type : ' + file.type + '</p>';
            output += '<p>size : ' + file.size + '</p>';
            output += '<p>lastModifiedDate : ' + file.lastModifiedDate + '</p>';
            output += '<br>';
          }

          $('#desc-file').html(output);

        } else {
          window.alert('no file');
        }
      }
    });

    $('#btn-upload').on('click', function (event) {
      event.preventDefault();

      if (files.length <= 0) {
        window.alert('no file is selected.');
        return;
      }

      var formData = new FormData();
      for (var i = 0; i < files.length; ++i) {
        formData.append('userfile', files[i]);
      }

      console.log('formData :', formData);
      return;

      $.ajax({
        type: 'POST',
        url: 'upload_dropzone_files.php',
        data: formData,
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
        },
        success: function (data, textStatus, jqXHR) {
          console.log('success data :', data);
        },
        error: function (jqXHR, textStatus, error) {
          console.log('error :'.jqXHR);
        }
      });

      files = [];
    });
  }

  function init() {
    setOneFileInput();
    setMultipleFileInput();
    setDropAndDropFile();
  }
}(jQuery));