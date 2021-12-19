import React from 'react';
import TextField from './TextField';
import Modal from './Modal';
import Store from './../stores/Store';
import * as AppActions from './../actions/AppActions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = Store.get().form;
  }

  componentWillMount() {
    Store.on('change', function() {
      this.setState(Store.get().form);
    }.bind(this));
  }

  _handleSubmit(e) {
    e.preventDefault();

    if(this.state.mode == 'create'){
      AppActions.addUser();
    }else {
      AppActions.editUser(this.props.id);
    }

  }

  _handleClose(e) {
    e.preventDefault();
    AppActions.closePopup();
  }

  render() {

    let title;

    if (this.state.mode == 'edit'){
      title = "Ubah Barang: " + this.state.data.nama_barang
    }
    else {
      title = "Barang Baru"
    }


    return (
      <Modal>
        <form onSubmit={this._handleSubmit}>
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" onClick={this._handleClose}></button>
          </header>
          <section className="modal-card-body">
            <TextField label="Nama Barang" name="nama_barang" value={this.state.data.nama_barang} errors={this.state.errors['nama_barang']} />
            <TextField label="Harga Jual" name="harga_jual" value={this.state.data.harga_jual}  errors={this.state.errors['harga_jual']} />
            <TextField label="Harga Beli" name="harga_beli" value={this.state.data.harga_beli} errors={this.state.errors['harga_beli']}/>
            <TextField label="Stock" name="stock" value={this.state.data.stock} errors={this.state.errors['stock']}/>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary">Save</button>
            <a className="button" onClick={this._handleClose}>Cancel</a>
          </footer>
        </form>
      </Modal>
    );
  }
}

export default Form;
