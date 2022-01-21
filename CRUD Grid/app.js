// Some DataSets are massive and will bring any web browser to its knees if you
// try to load the entire thing. To keep your app performing optimally, take
// advantage of filtering, aggregations, and group by's to bring down just the
// data your app needs. Do not include all columns in your data mapping file,
// just the ones you need.
//
// For additional documentation on how you can query your data, please refer to
// https://developer.domo.com/docs/dev-studio/dev-studio-data
var selectedRow = null;
var loadonce = 0;

console.log('hello',loadonce);

getDomoData();



function getDomoData() {

    console.log('Getting Domo Dataset');
    domo.get('/data/v1/lsmDS')
        .then(lsmDS => drawTable(lsmDS,'lsmtbl'));
    loadonce++;

}



function addColumnToTable(table, pos, content){
    console.log('addcol');
    if (typeof table === 'string'){
        table = document.getElementById(table);
        console.log(table.rows.length);
    }
    var columns = 2;
    if (!pos && pos !==0){
        pos=columns;
    }
    var rowregex = new RegExp('{ROWINDEX}', 'g');
    var colregex = new RegExp('{COLINDEX}', 'g');
    for (var r=0; r<table.rows.length; r++){
        console.log(r);
        var cell = table.rows[r].insertCell(pos);
        cell.innerHTML = content
        .replace(rowregex, String.fromCharCode(65 +r))
        .replace(colregex,columns + 1);
    }
}

function onFormSubmit(){
var formData = readFormData();
if (selectedRow== null)
    insertNewRecord(formData);
    else
        updateRecord(formData);

console.log('here');
resetForm();

}

function readFormData() {
console.log('readformdata');
var formData = {};

formData["existingsource"] = document.getElementById("es").value;
formData["maptosource"] = document.getElementById("mts").value;
// console.log('formdata');
return formData;
}


function resetForm() {
    console.log('Got to reset form');

    document.getElementById("es").value = "";
    document.getElementById("mts").value = "";
    selectedRow = null
    console.log('Exit reset form');
}

function insertNewRecord(data) {
    console.log('inserting');
    var table = document.getElementById("lsmtbl").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.existingsource;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.maptosource;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
    console.log('Insert Complete');

}
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    console.log('row:',selectedRow);

    document.getElementById("es").value = selectedRow.cells[0].innerHTML;
    document.getElementById("mts").value = selectedRow.cells[1].innerHTML;

}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.existingsource;
    selectedRow.cells[1].innerHTML = formData.maptosource;
}

function onDelete(td) {
    if (confirm('Are you sure you wnat to delete this row?')){
        row = td.parentElement.parentElement;
        document.getElementById("lsmtbl").deleteRow(row.rowIndex);
        console.log('del:',row)
        resetForm();
    }
    
}

console.log('hellop');