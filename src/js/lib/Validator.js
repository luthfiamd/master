export default class Validator {
  constructor(data) {
    this.data = data;
    this.errors = {
      nama_barang: [],
      harga_jual: [],
      harga_beli: [],
      stock:[]
    };
  }

  validatePresence(attr) {
    if(this.data[attr] == ""){ 
      this.errors[attr].push("can't be blank");
    }
    return this;
  }

  isValid() {
    let count = Object.keys(this.errors.nama_barang).length +
    Object.keys(this.errors.harga_jual).length +
    Object.keys(this.errors.harga_beli).length +
    Object.keys(this.errors.stock).length ;

    return count == 0;
  }
}

