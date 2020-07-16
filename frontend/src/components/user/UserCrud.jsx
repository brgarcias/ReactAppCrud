import React, { Component } from 'react'
import './UserCrud.css'
import Main from '../template/Main'
import axios from 'axios'
import { Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const headerProps = {
    icon: "users",
    title: 'Users',
    subtitle: 'User registration: Create, Retrieve, Update and Delete'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user).then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ user: initialState.user, list })
        })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (

            <Form className="form">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" value={this.state.user.name}
                        onChange={e => this.updateField(e)} type="text"
                        placeholder="Enter your name" />
                    <Form.Text className="text-muted">
                        We'll never share your name with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" value={this.state.user.email}
                        onChange={e => this.updateField(e)} type="email"
                        placeholder="Enter e-mail" />
                </Form.Group>

                <Button className="btnSuccess" variant="btn btn-outline-success" type="submit"
                    onClick={e => this.save(e)} >
                    Save
                </Button>

                <Button variant="btn btn-outline-danger" type="submit"
                    onClick={e => this.clear(e)} >
                    Cancel
                </Button>
                <hr/>
            </Form>

        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </Table>
        )
    }
    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <FontAwesomeIcon icon="edit" />
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <FontAwesomeIcon icon="trash" />
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {

        return (
            <Main {...headerProps}>
                <FontAwesomeIcon icon="users" /> User registration
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}