var mem = [];
var history = [];
var windows = [];
var extensions = [];
var defaultExtensions = [
    "../../node_modules/mathjs/dist/math.min.js"
];

var lineCount = 0;

function initialize()
{
    for (let i = 0; i < defaultExtensions.length; i++) {
        var script = document.createElement("script"); // Make a script DOM node
        script.src = defaultExtensions[i];
        script.type = "text/javascript";
        document.head.appendChild(script);
    }
    /*addLine("Welcome To Mathline");
    addLine("");*/
}

function memf(input)
{
    for (let i = 0; i < mem.length; i++) {
        if(mem[i].key == input)
        {
            return mem[i];
        }
    }
}
function print(input)
{
    addLine(input);
}
function dump(input)
{
    for (let i = 0; i < input.length; i++) {
        addLine(input[i]);
    }
}

function cval()
{
    var input = $("#inputField").val();
    
    try {
        eval(input);
        $("#inputField").val("");
    }
    catch(err) {
        console.error(err);
        addLine(err);
    }
}
function using(input, opts)
{
    addex(input, opts)
}
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
function push(input)
{
    mem.push(input);
    addLine("Added: " + input + " to memory in slot " + (mem.length-1).toString() )
}

function fill(input)
{
    mem.fill(input);
    addLine("Filled memeory with: " + input)
}

function pop()
{
    addLine("Removed: " + mem[mem.length-1] + " from memory at slot " + (mem.length-1).toString())
    mem.pop();
}

function find(input)
{
    var temp = mem.indexOf(input);
    if(temp == -1)
        addLine("Item not found in memory");
    else
        addLine("Found " + input + " at " + mem.indexOf(input));
}

// -------- Visuals --------
function addLine(value){
    var theTemplateScript = $("#line-template").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);
    var disabled = "";
    var decal =">";

    if(value != "")
    {
        disabled = "disabled";
        decal = "-";
    }

    // Define our data object
    var context={
        "num": lineCount + 1,
        "val": value,
        "disabled": disabled,
        "decal": decal
    };
    lineCount += 1;
    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);
    
    // Add the compiled html to the page
    $("#lineContainer").append(theCompiledHtml);
    
}

function addText()
{

}

function clear(opts)
{
    if(opts == "mem")
    {
        mem = [];
        addLine("Cleared Memory");
    }
    else
    {
        $('#lineContainer').empty();
        lineCount = 0;
    }
}

// -------- Extensions --------
function addex(input, opts)
{
    var script = document.createElement("script"); // Make a script DOM node
    var source = "../../extensions/" + input;
    if(!source.endsWith(".js"))
        source+= ".js";
    script.src = source;
    document.head.appendChild(script);
}