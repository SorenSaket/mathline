var mem = [];
var his = [];

var settings = {
    rad: "false"
}
var windows = [];
var extensions = [];
var defaultExtensions = [
    "../../extensions/math/mathjs/math.min.js",
    "../../extensions/graphicsjs/graphics.js"
];

var lineCount = 0;

var historySelected = -1;

var isInIframe = (window.location != window.parent.location) ? true : false;

// -------- Event Listeners --------
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 38) {
        if(his.length > 0)
        {
            if(historySelected < his.length-1)
                historySelected += 1;
            $("#inputField").val(his[historySelected].toString());
        }
    }
    if(event.keyCode == 40) {
        if(his.length > 0)
        {
            if(historySelected > 0)
                historySelected -=  1;
            $("#inputField").val(his[historySelected].toString());
        }
    }
});

// --------  --------
//Run on startup
function initialize()
{
    if(!isInIframe)
    {
        var el = $( ".showInIframe" );
        for (let i = 0; i < el.length; i++) {
            el[i].remove();
        }
    }
    
    addLine('<div style="text-align: center;"> ---- Welcome To Mathline ---- </div>');
    for (let i = 0; i < defaultExtensions.length; i++) {
        var script = document.createElement("script"); // Make a script DOM node
        script.src = defaultExtensions[i];
        script.type = "text/javascript";
        document.head.appendChild(script);
        addLine('<font color="gray"> Loaded ' + defaultExtensions[i].substr(defaultExtensions[i].lastIndexOf("/")+1) + '<font>');
    }
}
// CUstom evaluate
function cval()
{
    var command;
    var input = $("#inputField").val();
    his.unshift(input.toString());
    historySelected = -1;
    /*
    // Splits input into array
    var splitInput = input.split(" ");
    // Function to call is the first item in array
    command = splitInput[0];
    command += "(";
    if(splitInput.length > 1)
    {
        for (let i = 1; i < splitInput.length; i++) {
            command+= splitInput[i] + ",";
        }
        command = command.substring(0, command.length - 1);
    }
    command += ")";*/

    try {
        eval(input);
        $("#inputField").val("");
    }
    catch(err) {
        console.error(err);
        addLine('<font color="#DE3C4B">'+err+'</font>');
    }
}
// WIP
function save(input)
{
    switch (input) {
        case "mem":
            break;
        case "history":
            break;
        case "extensions":
            break;
        default:
            break;
    }
}

// -------- Memory Management --------
// Add variable to memory
function push(input)
{
    mem.push(input);
    addLine("Added: " + input + " to memory in slot " + (mem.length-1).toString() )
}
// Edits varible in memory at index with value
function edit(index, value)
{
    console.log("a");
    addLine("Edited " + mem[index] +  " in memory slot " + index + " with " +  value)
    mem.splice(index, 0, value);
}
//
function fill(input)
{
    mem.fill(input);
    addLine("Filled memory with: " + input)
}
//
function pop()
{
    addLine("Removed: " + mem[mem.length-1] + " from memory at slot " + (mem.length-1).toString())
    mem.pop();
}
//
function find(input)
{
    var temp = mem.indexOf(input);
    if(temp == -1)
        addLine('<font color="#DE3C4B">Item not found in memory</font>');
    else
        addLine("Found " + input + " at " + mem.indexOf(input));
}
//
function memf(input)
{
    for (let i = 0; i < mem.length; i++) {
        if(mem[i].key == input)
        {
            return mem[i];
        }
    }
}
//
function edit(index, input)
{
    mem[index] = input;
}

// -------- Visuals --------

//Add new line
function addLine(value){
    var theTemplateScript = $("#line-template").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);
    var decal ="";

    if(value != "")
    {
        decal = "";
    }

    // Define our data object
    var context = {
        "num": lineCount + 1,
        "val":  value,
        "decal": decal
    }
    lineCount += 1;
    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
    
    // Add the compiled html to the page
    $("#lineContainer").append(theCompiledHtml);
    
}
//Clears the commandline or memory
function clear(opts)
{
    if(opts == "mem")
    {
        mem = [];
        addLine("Cleared memory");
    }
    else if(opts == "history")
    {
        his = [];
        addLine("Cleared history");
    }
    else
    {
        $('#lineContainer').empty();
        lineCount = 0;
    }
}
//
function print(input)
{
    addLine(input);
}
//
function display(input)
{
    addLine(input);
}
//
function dump(input)
{
    for (let i = 0; i < input.length; i++) {
        addLine(input[i]);
    }
}

function showCanvas()
{
    $("#canvasContainer").show();
    $("#input").hide();
    $("#lineContainer").hide();
}

function hideCanvas()
{
    $("#canvasContainer").hide();
    $("#input").show();
    $("#lineContainer").show();
}


// -------- Extensions --------

//
function addex(input, opts)
{
    var script = document.createElement("script"); // Make a script DOM node
    var source = "../../extensions/" + input;
    if(!source.endsWith(".js"))
        source+= ".js";
    script.src = source;
    script.type = "text/javascript"
    document.head.appendChild(script);
    addLine('<font color="gray"> Loaded ' + source.substr(source.lastIndexOf("/")+1) + '<font>');
}
//
function using(input, opts)
{
    addex(input, opts)
}