function distance(a,b)
{
    var temp = 0;
    if(a.length != b.length)
    {
        return "math/vector - The two vectors are not in the same dimention"
    }
    for (let i = 0; i < a.length; i++) {
        temp += Math.pow((a[i]-b[i]),2);
    }
    return Math.sqrt(temp);
}