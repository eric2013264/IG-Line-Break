function detectmob() { 
  if (navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/Windows Phone/i))
  {
    return true;
  }
  else {
    return false;
  }
}

function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
    }
}

$(document).ready(function(){

  // Scale the elements according to screen size
  if (detectmob() == true) {
    $("#mytextarea").width(window.innerWidth-27) + "px";
    $("#copy").width($("#mytextarea").width()/2-30) + "px";
    $("#clear").width($("#mytextarea").width()/2-30) + "px";
  } else {
    $("#mytextarea").width(300) + "px";
    $("#copy").width($("#mytextarea").width()/2-16) + "px";
    $("#clear").width($("#mytextarea").width()/2-16) + "px";
  }

  // Copy button click
  $("button#copy").click(function(){
    var copyTextarea = document.getElementById('mytextarea');
    copyTextarea.focus();
    copyTextarea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      alert('Copied text to Clipboard.');
    } catch (err) {
      alert('Oops, unable to copy');
    }
  });
  // Clear button click
  $("button#clear").click(function(){
    $('textarea#mytextarea').val(""); 
  });
  // Textarea keydown
  $("#mytextarea").keydown(function(e) {
    if (e.which == 13) {
        //var out = getCaretPosition(document.getElementById('mytextarea'));
        var blankSpace = '\u2063';
        insertAtCursor(document.getElementById('mytextarea'), blankSpace);
        //alert(out.start);
    }
  });
});
