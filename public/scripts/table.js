class Table extends Render {
    static tableEl = "";

    constructor() {
        super();
    }

    init(el) {
        el.innerHTML +=
            `<table class="table caption-top" id="tabel_mobil">
            <caption>List of users</caption>
            <thead class="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">PLAT</th>
                    <th scope="col">MANUFACTURE</th>
                    <th scope="col">MODEL</th>
                    <th scope="col">YEAR</th>
                    <th scope="col">TYPE</th>
                    <th scope="col">AVILIABLE AT</th>
                    <th scope="col">TRANSMISION</th>
                    <th scope="col">JUMLAH ORANG</th>
                    <th scope="col">STATUS</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>`
        this.tableEl = document.getElementById('tabel_mobil')
    }
    renderBody(data) {
        // const tbody = this.tableEl.childNodes[3];
        const tbody = this.tableEl.querySelector('tbody');
        let result = "";
        for (let i = 0; i < data.length; i++) {
            result += `<tr>
                <td>${i + 1}</td>
                <td>${data[i].id}</td>
                <td>${data[i].plate}</td>
                <td>${data[i].manufacture}</td>
                <td>${data[i].year}</td>
                <td>${data[i].model}</td>
                <td>${data[i].type}</td>
                <td>${data[i].availableAt}</td>
                <td>${data[i].transmission}</td>
                <td>${data[i].capacity}</td>
                <td>${data[i].available ? `<button type="button" class="btn btn-primary">Available</button>`:`<button type="button" class="btn btn-danger">Not Available</button>`}</td>
            </tr>`
        }
        tbody.innerHTML = result;
    }
}