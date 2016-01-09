class Bills extends React.Component{
  constructor(props){
    super(props);
    this.refreshBills = this.refreshBills.bind(this);
    this.toggleAddBill = this.toggleAddBill.bind(this);
    this.addBillForm = this.addBillForm.bind(this);
    this.state = {bills: []};
  }

  componentDidMount(){
    this.refreshBills();
  }

  refreshBills(){
    $.ajax({
      url: "/bills",
      type: "GET"
    }).success( data => {
      this.setState({bills: data.bills});
    });
  }

  toggleAddBill(){
    this.setState({showForm: !this.state.showForm});
  }

  createBill(){
    let name = this.refs.billName.value;
    let amount = this.refs.billAmount.value;
    $.ajax({
      url: "/bills",
      type: "POST",
      data: {bill: {name, amount}}
    }).success( data => {
      let bills = data.state.bills;
      bills.push(data.bill)
      this.setState(bills);
    });
  }

  addBillForm(){
    if(this.state.showForm){
      return(<div>
              <form onSubmit={() => this.createBill()}>
                <input autoFocus={true} type="text" ref="billName" placeholder="Bill Name" required />
                <input type="number" step="any" ref="billAmount" placeholder="Bill Amount" required />
                <button type="submit" className="waves-effect waves-light btn">Submit</button>
                <a onClick={this.toggleAddBill}>Cancel</a>
              </form>
            </div>);
    }
  }

  render(){
    let bills = this.state.bills.map( bill => {
      return(<Bill refreshBills={this.refreshBills} key={`bill-${bill.id}`} {...bill} />);
    });
    if(bills.length == 0){
      return(<div className="container">
              <h2 className="center">Bills</h2>
              <div className="row">
                <div>
                  <button className="waves-effect waves-light btn" onClick={this.toggleAddBill}>Add Bill</button>
                  {this.addBillForm()}
                  <h5 className="center">No bills. Please add some.</h5>
                </div>
              </div>
            </div>);
    } else {
      return(<div className="container">
              <h2 className="center">Bills</h2>
              <div className="row">
                <div>
                  <button className="waves-effect waves-light btn" onClick={this.toggleAddBill}>Add Bill</button>
                  {this.addBillForm()}
                </div>
                <br />
                <div className="row">
                  {bills}
                </div>
              </div>
            </div>);
    }
  }
}
