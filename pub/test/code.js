//to identify links in a given doc and add them to markbook
function openFile(callBack)
{
    var element = document.createElement('input');
    element.setAttribute('type', "file");
    element.setAttribute('id', "btnOpenFile");
    element.onchange = function()
    {
        readText(this,callBack);
        document.body.removeChild(this);
    }//end function onchange (L6)

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
}//end function openFile (L2)

function readText(filePath,callBack)
{
    var reader;
    if (window.File && window.FileReader && window.FileList && window.Blob)
    {
        reader = new FileReader();
    }
    else
    {
        alert('file APIs not supported. case fallback.');
        return false;
    }//end else
    var output = ""; //placeholder for text output
    if(filePath.files && filePath.files[0])
    {           
        reader.onload = function (e)
        {
            output = e.target.result;
            callBack(output);
        };//end function onload() (L27)
        reader.readAsText(filePath.files[0]);
    }//end if html5 filelist support
    else
    { //this is where you could fallback to Java Applet, Flash or similar
        return false;
    }//end else      
    return true;
}//end function readText (L17)

function execCode()
{
    console.log ("start of code");
    document.getElementById('btnOpen').onclick = function()
    {
        openFile(function(txt)
        {
            hit = new Array();
            document.getElementById('tbMain').value = txt;
            //console.log (txt);
            var textArea = document.getElementById('tbMain');
            var line = textArea.value.split("\n");
            for(var i = 0;i < line.length-1;i++)
            {
                console.log (i+":"+line[i]+line[i].length);

                for (var j=0; j<line[i].length; j++)
                {
                    //search for "<a href = \'"
                    var expression=line[i].substr(j,11);
                    if (expression == "<a href = \'") 
                    {
                        //console.log("hit");
                        var anfang = j+11;
                        for (var k=anfang; k<line[i].length; k++)
                        {
                            if (line[i].substr(k,1) == "\'")
                            {
                                //console.log ("the end");
                                var ende = k;
                                hit[i] = 1;
                                console.log("true:"+line[i].substr(anfang, ende-anfang));
                            }//end if k
                            else { hit[i] = 0; }
                        }//end for k
                    }//end if expression
				
                }//end for j
            }//end for i
       	});//end function openFile (L43)
    }//end function onclick (L42)
    
    //markbook add turtle, PATCH INSERT DATA{}
	
}//end function execCode (L39)
