options = {
    success: function(files){
        
        for(i = 0; i &amp;amp;amp;amp;lt; files.length; i++){
            console.log(files[i].link);
    }
    },
    cancel: function(){
             
    },
  };
var button2 = Dropbox.createChooseButton(options);
document.getElementById("dropboxContainer").appendChild(button2);

