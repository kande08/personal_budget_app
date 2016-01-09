class Budget extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(<div>
            <h5 className="center">Budget: ${this.props.amount}</h5>
          </div>);
  }
}
