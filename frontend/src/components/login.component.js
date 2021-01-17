import React, { Component, useContext} from 'react';
import md5 from 'md5-hash';
import '../css/login.css';
import axios from 'axios';

class Login extends Component {
	constructor(props){
		super(props)
		sessionStorage.clear()
		this.state = {
			username: null,
			password: null,
			errors: [],
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	errorOccured = (status,err,msg) => {
		let error = { "id": this.state.errors.length + 1, "status": status, "error": err, "message": msg }
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




	handleSubmit = (e) => {
		e.preventDefault();
		axios.post(window.API_URL+"/api/token/", { 'username': this.state.username, 'password': this.state.password })
			.then(response => {
				console.log(response.status)
				if (response.status == 200){
					var token=response.data.access
					sessionStorage.setItem('Token','Bearer '+token)
					var headers={
						'Authorization':'Bearer '+token
					}
					axios.post(window.API_URL+"/api/login/", { 'username': this.state.username, 'password': this.state.password },{headers:headers})
						.then(response=>{
							if(response.data.Status==200)
							{
								console.log(response.data.Data.id)
								sessionStorage.setItem('DoctorID',response.data.Data.id)
								sessionStorage.setItem('DoctorFname',response.data.Data.fname)
								sessionStorage.setItem('DoctorLname',response.data.Data.lname)
								sessionStorage.setItem('DoctorEmail',response.data.Data.email)
								sessionStorage.setItem('IsLoggedIn','true')
								this.props.history.push('/scans')

							}
							if(response.data.Status==401)
							{
								this.errorOccured(401,response.data.Error)
							}
							if(response.data.Status==500)
							{
								this.errorOccured(500,response.data.Error)
							}
						})
						.catch(error=>{
							this.errorOccured(404,"Error Occurred",String(error))
						})

			}
			})
			.catch(error => {
				this.errorOccured(401,"Error Occurred","Invalid Username and Password")
			});

	}

	render() {
		var Error = this.state.errors.length ? this.state.errors.map(error => {
			return (<div data-key={error.id} className='alert alert-danger alert-dismissible'>
				<a href="#" onClick={this.deleteError} class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<div><strong>error!</strong> {error.error}</div>
				<div><strong>message</strong> {error.message}</div>
				<div><strong>status</strong> {error.status}</div></div>)
		}) : ("")



		return (
			<div className="container">
				{Error}
				<div className="d-flex justify-content-center h-100">
					<div className="card">
						<div className="card-header">
							<h3>{window.SIGN_IN_MESSAGE}</h3>
						</div>
						<div className="card-body">
							<form onSubmit={this.handleSubmit} id="login_form">
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fas fa-user"></i></span>
									</div>
									<input onChange={this.handleChange} type="text" className="form-control" id="username" name="username" placeholder="username" required></input>

								</div>
								<div className="input-group form-group">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="fas fa-key"></i></span>
									</div>
									<input onChange={this.handleChange} type="password" className="form-control" id="password" name="password" placeholder="password" required></input>
								</div>
								<div className="form-group">
									<input type="submit" value="Login" className="btn-lg float-right login_btn" />
								</div>
							</form>
<a href={window.API_URL+"/admin/"} target="blank"><button type="button" width="100%" class="btn btn-primary btn-block">Hospital Login</button></a>

						</div>

					</div>
				</div>
			</div>
		)
	}
}
export default Login;