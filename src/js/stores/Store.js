import EventEmitter from 'events';
import Validator from './../lib/Validator';
import AppDispatcher from './../AppDispatcher';

let _list = {
  items: {},
  index: 0
};

let _form = {
  data: {
    nama_barang: '',
    harga_jual: '',
    harga_beli: '',
    stock: ''
  },
  errors: {
    nama_barang: [],
    harga_jual: [],
    harga_beli: [],
    stock:[]
  },
  mode: 'create'
};

let _modal = {
  open: false
};


const Store = Object.assign({}, EventEmitter.prototype, {

  addUser: function(data) {
    let validator = new Validator(data);
    validator.validatePresence('nama_barang').
    validatePresence('harga_jual').
    validatePresence('harga_beli').
    validatePresence('stock');
    if(validator.isValid()){
      _list.items[_list.index+=1] = {
        nama_barang: data.nama_barang,
        harga_jual: data.harga_jual,
        harga_beli: data.harga_beli,
        stock: data.stock,
        id: _list.index
      }
      _form.data = {
        nama_barang: '',
        harga_jual: '',
        harga_beli: '',
        stock: ''
      };
      _form.errors = {
        nama_barang: [],
        harga_jual: [],
        harga_beli: [],
        stock: []
      };
      _modal.open = false;
    }else{
      _form.errors = validator.errors;
    }
    this.emit('change');
  },

  editUser: function(data) {
    let validator = new Validator(data);
    validator.validatePresence('nama_barang').
    validatePresence('harga_jual').
    validatePresence('harga_beli').
    validatePresence('stock');
    if(validator.isValid()){
      _list.items[_list.index+=1] = {
        nama_barang: data.nama_barang,
        harga_jual: data.harga_jual,
        harga_beli: data.harga_beli,
        stock: data.stock,
        id: _list.index
      }
      _form.data = {
        nama_barang: '',
        harga_jual: '',
        harga_beli: '',
        stock: ''
      };
      _form.errors = {
        nama_barang: [],
        harga_jual: [],
        harga_beli: [],
        stock: []
      };
      _modal.open = false;
    }else{
      _form.errors = validator.errors;
    }
    this.emit('change');
  },

  removeUser: function(id) {
    delete _list.items[id];

    this.emit('change');
  },

  setData: function(name, value) {
    _form.data[name] = value;
    this.emit('change');
  },

  setError: function(name, value) {
    _form.errors[name] = value;
    this.emit('change');
  },

  openPopup: function(mode, id) {
    _modal.open = true;
    _form.mode = mode;

    if(mode == 'edit')
      _form.data = {
        nama_barang: _list.items[id].nama_barang,
        harga_jual: _list.items[id].harga_jual,
        harga_beli: _list.items[id].harga_beli,
        stock: _list.items[id].stock,
        id: id
      }

    this.emit('change');
  },

  closePopup: function() {
    _modal.open = false;
    _form.mode = 'create';
    this.emit('change');
  },

  get: function() {
    return {
      list: _list,
      form: _form,
      modal: _modal
    };
  }

});


AppDispatcher.register(function(payload) {

  switch(payload.actionType) {
    case 'ADD_USER':
      Store.addUser(_form.data);
    break;
    case 'REMOVE_USER':
      Store.removeUser(payload.id);
    break;
    case 'EDIT_USER':
      Store.editUser(_form.data);
    break;
    case 'SET_DATA':
      Store.setData(payload.name, payload.value);
    break;
    case 'SET_ERROR':
      Store.setError(payload.name, payload.value);
    break;
    case 'OPEN_POPUP':
      Store.openPopup(payload.mode, payload.id);
    break;
    case 'CLOSE_POPUP':
      Store.closePopup();
    break;
    default:
      return true;
  }

});

export default Store;
