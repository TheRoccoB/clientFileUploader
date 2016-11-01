$(function() {

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
            //var img = document.createElement('img');
            //img.src = base64;

            var fileImg = document.querySelector('.file-img');
            fileImg.style.backgroundImage = 'url(' + base64 + ')';

            //$('body').append('<img src="' + base64 + '" />')
        };

        reader.onprogress = function(data){
            if (data.lengthComputable) {
                var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                console.log(progress);
            }
        }

        reader.readAsDataURL(file);
    }

    function filesDropped(event) {
        debugger;
        event.stopPropagation();
        event.preventDefault();

        drop_area.className = "area";

        //event.dataTransfer occurs when the the file is dropped, this.files works when
        var files = event.dataTransfer ? event.dataTransfer.files : this.files;
        var file = files[0];
        var info = "<li>Name: " + file.name + "</br>" + " Size: " + file.size + " bytes</br>" + " Type: " + file.type + "</br>" + " Modified Date: " + file.lastModifiedDate + "</li>";

        uploadFile(file);
        console.log(info);
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
});
