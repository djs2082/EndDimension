import React, { Component } from 'react'
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Image from './images.component.js'
class Scans extends Component {
  constructor(props) {
    super(props);    
    if (!(this.loggedIn = sessionStorage.getItem('IsLoggedIn') === 'true')){
      this.props.history.push('/')
    }
    this.state = {
      datatable: {
        columns: [
          {
            label: 'FirstName',
            field: 'fname',
            width: 150,
          },
          {
            label: 'LastName',
            field: 'lname',
            width: 270,
          },
          {
            label: 'Age',
            field: 'age',
            width: 270,
          },
          {
            label: 'Mobile',
            field: 'mobile',
            width: 200,
          },
          {
              label: 'Gender',
              field: 'gender',
              width: 100,
          },
          {
              label: 'Email',
              field: 'email',
              width: 300,
          }
        ],
        rows: [],
      },
      errors: []
    }

  }

  errorOccured = (status, err, message) => {
    let error = { "id": this.state.errors.length + 1, "status": status, "error": err, "message": message }
    let errors = this.state.errors
    errors.push(error)
    this.setState(errors)
  }

  deleteError = (e) => {
    let key = e.currentTarget.parentNode.getAttribute("data-key");
    let errors = this.state.errors.filter(error => {
      return parseInt(error.id) !== parseInt(key);
    })
    this.setState({ errors: errors })
  }

  handleClick(params)
  {
    sessionStorage.setItem('patientId',params)
    const win=window.open("http://localhost:3000/images","_blank")
    win.focus()
  }
  update_rows = (response) => {
    try {
      let columns = this.state.datatable.columns
      let rows = this.state.datatable.rows
      response.Data.forEach(element => { 
      element.clickEvent=()=>this.handleClick(element.id)
      rows.push(element)
      })
      let datatable = { columns: columns, rows: rows }
      this.setState({ datatable: datatable })
    }
    catch (error) {
      this.errorOccured(400, "error occurred", error.toString())
    }
  }

  componentDidMount = () => {
    const headers = {
      'Authorization': 'Token ' + sessionStorage.getItem('Token')
    }
    var apiEndPoint=window.API_URL+'/api/patients/'+sessionStorage.getItem('DoctorID')
    axios.get(apiEndPoint, {
      headers: headers
    })
      .then(response => {
        console.log(response)
        if (response.status == 200) {
          if (response.data.Status == 200) {
            this.update_rows(response.data);
          }
          if (response.data.status == 404) {
            this.errorOccured(404,response.data.Error)
            // this.get_next(response.data.Data.links.next)
          }
        }
      })
      .catch(error => {
        this.errorOccured(500, "error occurred", error.toString())
      });


  }


  render() {

    var Error = this.state.errors.length ? this.state.errors.map(error => {
      return (<div data-key={error.id} className='alert alert-danger alert-dismissible override'>
        <a href="#" onClick={this.deleteError} class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <div><strong>error!</strong> {error.error}</div>
        <div><strong>message</strong> {error.message}</div>
        <div><strong>status</strong> {error.status}</div></div>)
    }) : ("")

    return (
      <div>
        {Error}
        <div title="see scans" style={{ backgroundColor: "black", fontSize: "15px", color: "green" }}>
          <MDBDataTableV5 className="table-responsive" style={{ textAlign: "left", backgroundColor: "black", fontSize: "20px", color: "white" }} hover entriesOptions={[10, 20, 25]} entries={10} pagesAmount={4} data={this.state.datatable} searchTop searchBottom={false} />
        </div>
      </div>

    )

  }
}
export default Scans;