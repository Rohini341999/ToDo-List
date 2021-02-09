import React, { Component } from 'react'
//import { BrowserRouter as Router, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
//import Todo from './Todo'
import List from '../List'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            username: ''
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken
        //localStorage.clear()
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.identity.first_name,
            last_name: decoded.identity.last_name,
            username: decoded.identity.username
        })
        
    }

    render () {
        return (
            <div>
                <div className="container">
                    <div className="jumbotron mt-5">
                        <div className="col-sm-8 mx-auto">
                            <h1 className="text-center">PROFILE</h1>
                        </div>
                        <table className="table col-md-6 mx-auto">
                            <tbody>
                                <tr>
                                    <td>First Name</td>
                                    <td>{this.state.first_name}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>{this.state.last_name}</td>
                                </tr>
                                <tr>
                                    <td>Username</td>
                                    <td>{this.state.username}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <List />
            </div>
        )
    }
}

export default Profile