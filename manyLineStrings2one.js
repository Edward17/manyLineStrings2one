var input;
var lines;

function convert() {
    input = JSON.parse(document.getElementById('input').value);
    lines = input.features;

    while (lines.length > 1) {
        var end_point_index = lines[0].geometry.coordinates.length - 1;
        var end_point = lines[0].geometry.coordinates[end_point_index];
        var end_point_string = end_point.toString();
        var start_point = lines[0].geometry.coordinates[0];
        var start_point_string = start_point.toString();
console.log('start_point: ' + start_point.toString());
console.log('end_point: ' + end_point.toString());
        var ok = false;

        for (var i = 1; i < lines.length; i++) {
console.log(lines[i].geometry.coordinates[0].toString());
            if (lines[i].geometry.coordinates[0].toString() == end_point_string) {
                lines[0].geometry.coordinates = lines[0].geometry.coordinates.concat(lines[i].geometry.coordinates);
                lines.splice(i, 1);
                ok = true;
                break;
            }
        }

        if (!ok) {
            for (var i = 1; i < lines.length; i++) {
                var last_point_index = lines[i].geometry.coordinates.length - 1;
console.log(lines[i].geometry.coordinates[last_point_index].toString());
                if (lines[i].geometry.coordinates[last_point_index].toString() == end_point_string) {
                    lines[0].geometry.coordinates = lines[0].geometry.coordinates.concat(lines[i].geometry.coordinates.reverse());
                    lines.splice(i, 1);
                    ok = true;
                    break;
                }
            }
        }

        if (!ok) {
            for (var i = 1; i < lines.length; i++) {
console.log(lines[i].geometry.coordinates[0].toString());
                if (lines[i].geometry.coordinates[0].toString() == start_point_string) {
                    //lines[0].geometry.coordinates = lines[0].geometry.coordinates.concat(lines[i].geometry.coordinates);
                    lines[0].geometry.coordinates = lines[i].geometry.coordinates.reverse().concat(lines[0].geometry.coordinates);
                    lines.splice(i, 1);
                    ok = true;
                    break;
                }
            }
        }

        if (!ok) {
            for (var i = 1; i < lines.length; i++) {
                var last_point_index = lines[i].geometry.coordinates.length - 1;
console.log(lines[i].geometry.coordinates[last_point_index].toString());
                if (lines[i].geometry.coordinates[last_point_index].toString() == start_point_string) {
                    //lines[0].geometry.coordinates = lines[0].geometry.coordinates.concat(lines[i].geometry.coordinates.reverse());
                    lines[0].geometry.coordinates = lines[i].geometry.coordinates.concat(lines[0].geometry.coordinates);
                    lines.splice(i, 1);
                    break;
                }
            }
        }

        console.log(lines.length);
    }

    /*for (var i = 0; i < lines.length; i++) {
        var last_point_index = lines[i].geometry.coordinates.length - 1;
        document.getElementById('output').innerHTML = document.getElementById('output').innerHTML + 'i = ' + i + ', start_point = ' + lines[i].geometry.coordinates[0].toString() + ', end_point = ' + lines[i].geometry.coordinates[last_point_index].toString() + '<br>';
    }
    */

    input.features = lines;
    document.getElementById('output').value = JSON.stringify(input, "", 4);
}