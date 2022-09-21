
function sub(mat1, mat2)
{
    const ret = [];

    if (mat1.length != mat2.length)
        console.error("Lenghts differ");
    else {
        for (var i = 0; i < mat1.length; i++)
            ret.push(mat1[i] - mat2[i]);
    }

    return ret;
}

function vectProdVec(vec1, vec2) {
    const ret = new THREE.Vector3();

    ret.x = (vec1.y * vec2.z) - (vec1.z * vec2.y);
    ret.y = -((vec1.x * vec2.z) - (vec1.z * vec2.x));
    ret.z = (vec1.x * vec2.y) - (vec1.y * vec2.x);

    return ret;
}

 function vectProd(vec1, vec2) {

    const ret = [];

    if (vec1.length != 3 || vec2.length != 3)
        console.error("Lenght different from 3");
    else {
        ret.push((vec1[1] * vec2[2]) - (vec1[2] * vec2[1]));
        ret.push(-((vec1[0] * vec2[2]) - (vec1[2] * vec2[0])));
        ret.push((vec1[0] * vec2[1]) - (vec1[1] * vec2[0]));
    }

    return ret;
}

 function takeNormal(p1, p2, p3) {
    const vec1 = sub(p1, p2);
    const vec2 = sub(p3, p2);
    const normal = vectProd(vec1, vec2);
    var normalized = normalize(normal);
    normalized[0] = Math.round(normalized[0]);
    normalized[1] = Math.round(normalized[1]);
    normalized[2] = Math.round(normalized[2]);

    return normalized;
}

function normalize(vec) {

    const ret = [];

    if (vec.length != 3)
        console.error("Length differs from 3");
    else {
        const n = Math.sqrt((vec[0] * vec[0]) + (vec[1] * vec[1]) + (vec[2] * vec[2]));
        ret.push(vec[0] / n);
        ret.push(vec[1] / n);
        ret.push(vec[2] / n);
    }

    return ret;
}

 function dot(vec1, vec2) {
    if (vec1.length != 3 || vec2.length != 3)
        console.error("Lenght different from 3");
    else
        return (Math.acos((vec1[0] * vec2[0]) + (vec1[1] * vec2[1]) + (vec1[2] * vec2[2])));
}