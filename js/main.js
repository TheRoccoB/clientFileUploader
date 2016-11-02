(function() {

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

            //var info = "<li>Name: " + file.name + "</br>" + " Size: " + file.size + " bytes</br>" + " Type: " + file.type + "</br>" + " Modified Date: " + file.lastModifiedDate + "</li>";

            switch(type){
                case 'image/png':
                case 'image/jpg':
                case 'image/jpeg':
                case 'image/gif':
                case 'image/svg':
                case 'image/svg+xml':
                    fileImg.style.backgroundImage = 'url(' + base64 + ')';
                    dropText.innerHTML = '';
                    break;
                default:
                    fileImg.style.backgroundImage = 'url("img/file-o.svg")';
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

    window.onload = function() {

        //Check File API support
        if (window.File && window.FileList) {
            var drop_area = document.getElementById("drop_area");

            drop_area.addEventListener("dragover", dragHandler);
            drop_area.addEventListener("drop", filesDropped);

            var input = document.getElementById('files');

            input.addEventListener("change", filesDropped, false);
        }
        else {
            console.log("Your browser does not support File API");
        }
    }
})();
