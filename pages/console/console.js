var mem = [];
var his = [];

var windows = [];
var extensions = [];
var defaultExtensions = [
    "../../node_modules/mathjs/dist/math.min.js",
    "../../node_modules/p5/p5.min.js"
];

var lineCount = 0;

var historySelected = -1;

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
//
function initialize()
{
    for (let i = 0; i < defaultExtensions.length; i++) {
        var script = document.createElement("script"); // Make a script DOM node
        script.src = defaultExtensions[i];
        script.type = "text/javascript";
        document.head.appendChild(script);
        addLine('<font color="gray"> Loaded ' + defaultExtensions[i].substr(defaultExtensions[i].lastIndexOf("/")+1) + '<font>');
    }
    /*addLine("Welcome To Mathline");
    addLine("");*/
}
//
function cval()
{
    var input = $("#inputField").val();
    his.unshift(input.toString());
    historySelected = -1;
    try {
        eval(input);
        $("#inputField").val("");
    }
    catch(err) {
        console.error(err);
        addLine('<font color="#DE3C4B">'+err+'</font>');
    }
}
//
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
//
function push(input)
{
    mem.push(input);
    addLine("Added: " + input + " to memory in slot " + (mem.length-1).toString() )
}
//
function fill(input)
{
    mem.fill(input);
    addLine("Filled memeory with: " + input)
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
    var decal =">";

    if(value != "")
    {
        decal = "-";
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

// -------- Extensions --------
//
function addex(input, opts)
{
    var script = document.createElement("script"); // Make a script DOM node
    var source = "../../extensions/" + input;
    if(!source.endsWith(".js"))
        source+= ".js";
    script.src = source;
    document.head.appendChild(script);
    addLine('<font color="gray"> Loaded ' + source.substr(source.lastIndexOf("/")+1) + '<font>');
}
//
function using(input, opts)
{
    addex(input, opts)
}