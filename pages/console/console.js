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
    addLine("Welcome To Mathline");
    addLine("");
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
function clear(opts)
{
    if(opts == "mem")
    {
        mem = [];
        addLine("Cleared Memory");
    }
    else
    {
        $('#lineContainer').html("");
        lineCount = 0;
    }
}
function cval(num)
{
    var input = $("#input" + num)
    try {
        eval(input.val());
    }
    catch(err) {
        console.error(err);
        addLine(err);
    }
    input.prop( "disabled", true );
    addLine("");
    $("#input" + lineCount).focus();
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
    $('#lineContainer').append(theCompiledHtml);
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