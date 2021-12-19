import React from 'react';
import Item from './Item';
import Store from './../stores/Store';
import * as AppActions from './../actions/AppActions';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.get().list;
  }

  componentWillMount() {
    Store.on('change', function() {
      this.setState(Store.get().list);
    }.bind(this));
  }

  _handleAddUser(e) {
     e.preventDefault();
     AppActions.openPopup();
  }

  render() {
    let items = Object.keys(this.state.items).map(function(k) {
      let i = this.state.items[k];
      return <Item key={k} id={i.id} nama_barang={i.nama_barang} harga_jual={i.harga_jual} harga_beli={i.harga_beli} stock={i.stock}/>;
    }.bind(this));

    return (
      <div className="panel">
        <p className="panel-heading">
          Daftar Barang
        </p>
        <div className="panel-block has-text-centered">
          {(function() {
            if(items.length > 0){
              return <table className="table">
                       <thead>
                         <tr>
                           <th>Nama Barang</th>
                           <th>Harga Jual</th>
                           <th>Harga Beli</th>
                           <th>Stock</th>
                           <th></th>
                         </tr>
                       </thead>
                       <tbody>
                         { items }
                       </tbody>
                     </table>;
            }
          })()}
          <a className="button is-link" onClick={this._handleAddUser}>Tambah Barang</a>
        </div>
      </div>
    );
  }
}
