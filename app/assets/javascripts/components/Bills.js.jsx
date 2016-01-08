class Bills extends React.Component{
  constructor(props){
    super(props);
    this.refreshBills = this.refreshBills.bind(this);
    this.toggleBill = this.toggleBill.bind(this);
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
      this.setState({bills: data});
    });
  }

  toggleBill(){
    this.setState({showForm: !this.state.showForm});
  }

  updateBill(){
    let name = this.refs.billName.value;
    let amount = this.refs.billAmount.value;
    $.ajax({
      url: "/bills",
      type: "PUT",
      data: {bill: {name, amount}}
    }).success( data => {
      this.props.refreshBills();
    });
  }

  addBillForm(){
    if(this.state.showForm){
      return(<div>
              <form onSubmit={() => this.updateBill}>
                <input autoFocus={true} type="text" ref="billName" placeholder="Bill Name" />
                <input type="number" step="any" ref="billAmount" placeholder="Bill Amount" />
                <button type="submit" className="waves-effect waves-light btn">Submit</button>
                <a onClick={this.toggleBill}>Cancel</a>
              </form>
            </div>);
    } else {
      return(<div>
              <h6 className="center">You have no bills. Please add bills.</h6>
            </div>);
    }
  }

  render(){
    let bills = this.state.bills.map( bill => {
      return(<Bill refreshBills={this.refreshBills} key={`bill-${bill.id}`} {...bill} />);
    });
    return(<div className="container">
            <h2 className="center">Bills</h2>
            <div className="row">
              <div>
                <button className="waves-effect waves-light btn" onClick={this.toggleBill}>Add Bill</button>
                {this.addBillForm()}
              </div>
              <div className="row">
                {bills}
              </div>
            </div>
          </div>);
  }
}
