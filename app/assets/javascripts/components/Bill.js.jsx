class Bill extends React.Component{
  constructor(props){
    super(props);
    this.state = {bill: []};
  }

  render(){
    return(<div className="card-small blue-grey">
            <div className="card-content white-text center-align">
              <h5>{this.props.name}</h5>
              <p>${this.props.amount}</p>
            </div>
          </div>);
  }
}
