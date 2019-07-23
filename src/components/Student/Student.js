import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Student extends Component {
  constructor() {
    super()

    this.state = {
      studentInfo: {}
    }

  }
  componentDidMount(){
    const { params } = this.props.match
    //creating an axios.get request and use the data to update the value of studentInfo on state ie studentInfo: res.data
    return axios.get(`http://localhost:3005/students/${params.id}`)
    .then(res => {
      this.setState({
        studentInfo: res.data
      })
    })
  }

  render()
  {
    const { history } = this.props
    //when you console.log this.state.studentInfo you will see all of the data that we can access inside of the studentInfo obj such as email, grade, first_name, last_name
    //console.log(this.state.studentInfo)
    return (
      <div className="box">
        <h1>{this.state.studentInfo.first_name} {this.state.studentInfo.last_name}</h1>
        <h3>Grade: {this.state.studentInfo.grade}</h3>
        <h3>Email: {this.state.studentInfo.email}</h3>
        <button onClick={() => history.goBack()} >Go Back</button>

      </div>
    )
  }
}