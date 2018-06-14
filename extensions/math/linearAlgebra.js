function d(a,b)
{
    var temp = 0;
    if(a.value.length != b.value.length)
    {
        return "math/vector - The two vectors are not in the same dimention"
    }
    for (let i = 0; i < a.value.length; i++) {
        temp += Math.pow((a.value[i]-b.value[i]),2);
    }
    return Math.sqrt(temp);
}
