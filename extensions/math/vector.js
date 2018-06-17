var vector = {
    magnitude: function(a)
    {
        var temp = 0;
        for (let i = 0; i < a.length; i++) {
            temp += Math.pow(a[i],2)
        }
        return Math.sqrt(temp);
    },
    dot: function(a, b)
    {
        var temp = 0;
        if(a.length != b.length)
        {
            return "math/vector - The two vectors are not in the same dimention"
        }
        for (let i = 0; i < a.length; i++) {
            temp += a[i]*b[i];
        }
        return temp;
    },
    angle: function(a, b)
    {
        var dot = math.dot(a,b);
        var amag = math.norm(a);
        var bmag = math.norm(b);
        console.log(dot + " -- " + amag + " -- " + bmag)
        if(settings["rad"] == true)
            return math.acos(dot/(amag*bmag));
        else
            return toDegrees(math.acos(dot/(amag*bmag)));
    }
}

function toRadians (angle) {
	return angle * (Math.PI / 180);
}
function toDegrees (angle) {
	return angle * (180 / Math.PI);
}