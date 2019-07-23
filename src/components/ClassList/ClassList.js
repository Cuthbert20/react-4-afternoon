import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios';

export default class ClassList extends Component {
  constructor() {
    super()

    this.state = {
      students: []
    }
    
  }
  componentDidMount() {
    //destructuring params
    let { params } = this.props.match
    //console.log(params)
    Axios.get(`http://localhost:3005/students?class=${params.class}`)
    .then(res => {
      this.setState({
        students: res.data
      })
    })
  }

  render() {
    //destructering history and using it on our Go back button using .goBack built in react method.
    const { history } = this.props
    const students = this.state.students.map((student,i) => (
      // using () after a arrow function give us a impliced return
      //we are returning an h3 with the key set to the index from when we mapped over students and then destructering first_name & last_name to display
      //with the Link tag the url has to be a string so we have to escape it first {} then we can use backticks
      <Link to={`/student/${student.id}`} key={ i } ><h3>{ student.first_name }{ student.last_name }</h3></Link>
    ))
    return (
      <div className="box">
        {/* here we are updating the h1 element to display the current class. */}
        <h1>{this.props.match.params.class}</h1>
        <h2>ClassList:</h2>
        { students }
        <button onClick={() => history.goBack()} >Go Back</button>
      </div>
    )
  }
}