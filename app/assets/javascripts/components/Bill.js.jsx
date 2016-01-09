class Bill extends React.Component{
  constructor(props){
    super(props);
    this.toggleEditBill = this.toggleEditBill.bind(this);
    this.state = {edit: false };
  }

  deleteBill(){
    $.ajax({
      url: `/bills/${this.props.id}`,
      type: 'DELETE'
    }).success( data => {
      this.props.refreshBills();
    });
  }

  toggleEditBill(){
    this.setState({edit: !this.state.edit});
  }

  updateBill(){
    $.ajax({
      url: `/bills/${this.props.id}`,
      type: 'PUT',
      data: { bill: { name: this.refs.billName.value, amount: this.refs.billAmount.value }}
    }).success( data => {
      this.props.refreshBills();
    });
  }

  editBill(){
    return(<div className="card-small blue-grey">
            <div className="card-content white-text">
              <form onSubmit={() => this.updateBill()}>
                <input autoFocus={true} type="text" ref="billName" defaultValue={this.props.name} />
                <input type="number" step="any" ref="billAmount" defaultValue={this.props.amount} />
                <button type="submit" className="waves-effect waves-light btn">Submit</button>
                <a onClick={this.toggleEditBill}>Cancel</a>
              </form>
            </div>
          </div>);
  }

  bill(){
    return(<div className="card-small blue-grey col s3 offset-s1">
            <div className="card-content white-text">
              <h5 className="left-align">{this.props.name}</h5>
              <p className="left-align">${this.props.amount}</p>
              <br />
              <button className="waves-light waves-effect btn" onClick={() => this.deleteBill()}>Delete</button>
              <button className="waves-light waves-effect btn" onClick={this.toggleEditBill}>Edit</button>
            </div>
          </div>);
  }

  render(){
    if(this.state.edit)
      return(this.editBill());
    else
      return(this.bill());
  }
}
