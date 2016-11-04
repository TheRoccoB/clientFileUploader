(function() {

    var TEMPLATE = '' +
        '<div id="drop_area" class="area">' +
        '    <label for="files" class="upload-label" style="">' +
        '        <div class="img-container" style="">' +
        '            <div class="file-img" style="">' +
        '                <div class="drop-text" style="">Drop your files</div>' +
        '            </div>' +
        '        </div>' +
        '        <div class="file-info"></div>' +
        '    </label>' +
        '</div>' +
        '<input type="file" id="files" class="super-hidden" visibility="hidden" style="" title="&nbsp;"/>';

    //svg of file icon from font awesome
    var FILE_SVG = 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNTk2IDM4MHEyOCAyOCA0OCA3NnQyMCA4OHYxMTUycTAgNDAtMjggNjh0LTY4IDI4aC0xMzQ0cS00MCAwLTY4LTI4dC0yOC02OHYtMTYwMHEwLTQwIDI4LTY4dDY4LTI4aDg5NnE0MCAwIDg4IDIwdDc2IDQ4em0tNDQ0LTI0NHYzNzZoMzc2cS0xMC0yOS0yMi00MWwtMzEzLTMxM3EtMTItMTItNDEtMjJ6bTM4NCAxNTI4di0xMDI0aC00MTZxLTQwIDAtNjgtMjh0LTI4LTY4di00MTZoLTc2OHYxNTM2aDEyODB6Ii8+PC9zdmc+")'


    function dragHandler(event) {
        event.stopPropagation();
        event.preventDefault();

        var drop_area = document.getElementById("drop_area");
        drop_area.className = "area drag";
    }

    function uploadFile(file){
        var reader = new FileReader();

        reader.onload = function(data) {
            var base64 = data.target.result;
            var fileImg = document.querySelector('.file-img');
            var fileInfo = document.querySelector('.file-info');
            var dropText = document.querySelector('.drop-text');
            var file = this.myFile;
            var type = file.type;
            var spl = file.name.split('.');
            var ext = spl.length > 1 ? spl[spl.length - 1] : '';

            switch(type){
                case 'image/png':
                case 'image/jpg':
                case 'image/jpeg':
                case 'image/gif':
                case 'image/svg':
                case 'image/svg+xml':
                    fileImg.style.backgroundImage = FILE_SVG;
                    dropText.innerHTML = '';
                    break;
                default:
                    fileImg.style.backgroundImage = FILE_SVG;
                    dropText.innerHTML = "." + ext;
            }

            fileInfo.innerHTML = file.name;

        };

        reader.onprogress = function(data){
            if (data.lengthComputable) {
                var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                console.log(progress);
            }
        }

        reader.readAsDataURL(file);

        //don't know why the closure isn't working so doing some data smuggling here.
        reader.myFile = file;
    }

    function filesDropped(event) {
        event.stopPropagation();
        event.preventDefault();

        drop_area.className = "area";

        //event.dataTransfer occurs when the the file is dropped, this.files works when
        var files = event.dataTransfer ? event.dataTransfer.files : this.files;
        var file = files[0];

        uploadFile(file);
    }

    function registerDropArea() {

        //Check File API support
        if (window.File && window.FileList) {
            var drop_area = document.getElementById("drop_area");

            drop_area.addEventListener("dragover", dragHandler);
            drop_area.addEventListener("drop", filesDropped);

            var input = document.getElementById('files');

            input.addEventListener("change", filesDropped, false);
        }
        else {
            throw 'invalid selector' + "Your browser does not support File API";
        }
    }

    window.clientFileUploader = function(selector){
        var el = document.querySelector(selector);
        if (!el){
            throw 'invalid selector' + selector;
        }
        el.innerHTML = TEMPLATE;
        registerDropArea();
    }
})();
