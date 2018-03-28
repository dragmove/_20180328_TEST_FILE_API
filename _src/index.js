(function ($) {
  'use strict';

  /*
   * implement
   */
  $(document).ready(init);

  function init() {

    if (!isSupportDraggable()) {
      window.alert('this browser does not support draggable attribute');
    }

    if (!isSupportDragAndDrop()) {
      window.alert('this browser does not support methods related drag.');
    }

    if (!isSupportFileApi()) {
      window.alert('this browser does not support File API.');
    }

    var files = [];
    var dragObj = $('#drag-obj').get(0);

    dragObj.ondragstart = function () {
    };

    dragObj.ondrag = function () {
    };

    dragObj.ondragend = function () {
      window.alert('dragend div.');
    };

    $('#drop-zone').on({
      'dragenter': function (event) {
        // enter
        console.log('enter');
      },
      'dragleave': function (event) {
        // leave
        console.log('leave');
      },
      'dragover': function (event) {
        event.preventDefault();

        console.log('over');
      },
      'drop': function (event) {
        event.preventDefault();
        console.log('drop');

        window.alert('drop file in drop-zone.');

        files = event.originalEvent.dataTransfer.files;

        if (files && files.length) {
          var output = '';
          for (var i = 0, max = files.length; i < max; i++) {
            var file = files[i];
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

      } else {
        sendFiles(files);
      }
    });
  }

  function isSupportDraggable() {
    var div = document.createElement('div');
    return ('draggable' in div);
  }

  function isSupportDragAndDrop() {
    var div = document.createElement('div');
    return ('ondragstart' in div && 'ondrop' in div);
  }

  function isSupportFileApi() {
    return !!(window.File && window.FileReader && window.FileList && window.Blob);
  }

  function sendFiles(files) {
    for (var i = 0; i < files.length; ++i) {
      sendFile(files[i]);
    }
  }

  function sendFile(file) {
    var formData = new FormData();
    formData.append('userfile', file);
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
  }
}(jQuery));