let selectedFile;

document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[]


document.getElementById('button').addEventListener("click", () => {

    let rows=[]
    try {
        XLSX.utils.json_to_sheet(data, 'out.xlsx');
        
        if(selectedFile){
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(selectedFile);
            fileReader.onload = (event)=>{
             let data = event.target.result;
             let workbook = XLSX.read(data,{type:"binary"});
             console.log(workbook);
             workbook.SheetNames.forEach(sheet => {
                  let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                  rows.push(rowObject)

                  document.getElementById("jsondata").innerHTML = JSON.stringify(rows,undefined,4)
             });
            }
        }else{
            //algun mensaje
        }
    } catch (error) {
        console.log('este '+error)
    }
   
});