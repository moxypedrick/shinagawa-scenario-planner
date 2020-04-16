options = {
    success: function(files){
        console.log(files.link);
    },
    cancel: function(){
             
    },
  };
  var button2 = Dropbox.createChooseButton(options);
document.getElementById("dropboxContainer").appendChild(button2);

