class Budgets extends React.Component{
  constructor(props){
    super(props);
    this.addBudgetForm = this.addBudgetForm.bind(this);
    this.toggleAddBudget = this.toggleAddBudget.bind(this);
    this.state = {budgets: []};
  }

  componentDidMount(){
    $.ajax({
      url: '/budgets',
      type: 'GET'
    }).success( data => {
      this.setState({budgets: data.budgets});
    })
  }

  toggleAddBudget(){
    this.setState({showForm: !this.state.showForm});
  }

  createBudget(){
    $.ajax({
      url: '/budgets',
      type: 'POST',
      data: {budget: {amount: this.refs.budgetAmount.value}}
    }).success( data => {
      let budgets = data.state.budgets;
      budgets.push(data.budget);
      this.setState(budgets);
    });
  }

  addBudgetForm(){
    if(this.state.showForm){
      return(<div>
              <form onSubmit={() => this.createBudget()}>
                <input autoFocus={true} type="number" step="any" ref="budgetAmount" placeholder="Budget Amount" required />
                <button type="submit" className="waves-effect waves-light btn">Submit</button>
                <a onClick={this.toggleAddBudget}>Cancel</a>
              </form>
            </div>);
    }
  }

  render(){
    let budgets = this.state.budgets.map(budget => {
      return(<Budget key={`budget-${budget.id}`} {...budget} />);
    });
    if(budgets.length == 0){
      return(<div className="container center">
              <h2 className="center">Budget Total</h2>
              <button className="waves-light waves-effect btn" onClick={this.toggleAddBudget}>Add Budget</button>
              {this.addBudgetForm()}
            </div>);
    } else {
      return(<div className="container row">
              <h2 className="center">Budget Total</h2>
              <div className="card-small blue-grey col s4 offset-s4">
                <div className="card-content white-text">
                  {budgets}
                </div>
              </div>
            </div>);
    }
  }
}
