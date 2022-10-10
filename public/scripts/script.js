//const json = new load();
//var json = require("https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json");
const cari = document.getElementById("cari");
const date = document.getElementById("datepicker");
const app = document.getElementById("mobil");
const jml = document.getElementById("jumlah_p");
const table = new Table();
//let car = json.run();
table.init(app);
const filter = {
    tanggal: '',
    jumlah_p:''

}
fetch('https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    table.renderBody(myJson);
    function filterMotor(){
        const filteredMotor = myJson.filter(function(el) {
            const filterTransmisi = filter.tanggal ? el.availableAt.substring(0,10) === filter.tanggal : true;
            const filterManufaktur = filter.jumlah_p ? el.capacity == filter.jumlah_p : true;
            return filterTransmisi && filterManufaktur 
        });
    
        table.renderBody(filteredMotor);
    }
    cari.addEventListener('click',function(event){
        const tanggal1 = date.value
        const jumlah = jml.value
        filter.tanggal = tanggal1
        filter.jumlah_p = jumlah
        filterMotor()
        //alert(tanggal); 
    })
    // const filteredMotor = myJson.filter(function(el) {
    //     return el.available == true;
    // });
    // table.renderBody(filteredMotor);

  });
//table.renderBody(cars);
