import './App.css';
import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = { items: [], text: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  render(){
  return (
    <div className="App">
        <h2 className="App-header">
          TO DO LIST
        </h2>
      <div className='form'>
        <form onSubmit={this.handleSubmit}>
          <label> Enter new items</label>
          <br/>
          <input onChange={this.handleChange} value={this.state.text}/>
          <button type='submit'> Add </button>
        </form>
      </div>
      <Todolist items={this.state.items.filter((item) => item.isDone === false)} handleDelete={this.handleDelete} handleChecked={this.handleChecked}/>
      <DoneHistory doneItems={this.state.items.filter((item) => item.isDone === true)}/>
      {console.log("Items", this.state.items)}
    </div>
  );}
  
  handleDelete(id){
    const updatedItems = this.state.items.filter(obj => obj.id !== (id));
    this.setState({items: updatedItems});
  };

  handleChecked(id){
    let currentStateItems = this.state.items;
    var indexOfObject = currentStateItems.findIndex(obj => obj.id === id);
    currentStateItems[indexOfObject].isDone = ! currentStateItems[indexOfObject].isDone;
    this.setState({items:currentStateItems});
  }

  handleChange(e){
    this.setState({text: e.target.value});
  };

  handleSubmit(e){
    e.preventDefault();
    if (this.state.text.length === 0){
      return;
    }
    const pendingItems = this.state.items.filter((item) => item.isDone === false)
    const itemsArray = pendingItems.map((item) => item.text);
    const itemsSet = new Set(itemsArray)
    if (itemsSet.has(this.state.text)){
      alert("it is added already");
      this.setState({text: ""});
      return
    }

    const newItem = {
      isDone: false,
      text: this.state.text,
      id: Date.now()
    };

    this.setState(state => (
      { items: state.items.concat(newItem),
        text: ""
      }
    ))
  };
}


class Todolist extends React.Component{
  constructor(props){
    super(props);
    this.state = {items: this.props.items};
  }


  validateNodata(items){
    if (items.length === 0){document.getElementById("no-data").innerHTML = "Everything is Done...!";}
    else{document.getElementById("no-data").innerHTML = "";}
  }

  static getDerivedStateFromProps(props, state){
    return {items: props.items}
  }

  componentDidMount(){
    this.validateNodata(this.state.items);
  }

  componentDidUpdate(){
    this.validateNodata(this.state.items);
  }

  render(){
    return (
      <div className='toDoList'>
      <h4>Checklist Items</h4>
      <p id="no-data"></p>
      <ul>
        {this.state.items.map((item)=> 
        (
          <li key={item.id}>
          {item.text}
          <input className= 'checkbox' type="checkbox" checked={item.isDone} onChange={() =>{this.props.handleChecked(item.id)}}/>
          <button className='delete-btn' onClick={() => this.props.handleDelete(item.id)}>Delete</button>
          {console.log("item done", item.text, item.isDone)}
          </li> 
        ))}
      </ul>
      </div>
    )
  }
}

function DoneHistory(props){
  return (
    <div className='toDoListHistory'>
    <h4>Done History</h4>
    <p id="no-data"></p>
    <ul>
      {props.doneItems.map((item)=> 
      (
        <li key={item.id}>
        {item.text}
        </li> 
      ))}
    </ul>
    </div>
  )
}


export default App;
