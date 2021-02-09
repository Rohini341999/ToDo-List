import React, { Component } from 'react'
import { getList, addToList, deleteItem, updateItem } from './ListFunctions'


class List extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            term: '',
            completed: false,
            items: []
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount () {
        this.getAll()
    }

    onChange = event => {
        this.setState({
            term: event.target.value,
            completed: 'disabled'
        })
    }

    getAll = () => {
        getList().then(data => {
            this.setState(
                {
                    term: '',
                    items: [...data]
                },
                () => {
                    console.log(this.state.term)
                }
            )
        })
    }

    onSubmit = e => {
        e.preventDefault()
        this.setState({ completed: '' })
        addToList(this.state.term).then(() => {
            this.getAll()
        })
    }

    onUpdate = e => {
        e.preventDefault()
        updateItem(this.state.term, this.state.id).then(() => {
            this.getAll()
        })
    }

    onEdit = (item, itemid, e) => {
        e.preventDefault()
        this.setState({
            id: itemid,
            term: item
        })
        console.log(itemid)
    }

    onDelete = (val, e) => {
        e.preventDefault()
        deleteItem(val)
        console.log("val:  ",val)

        var data = [...this.state.items]
        data.filter((item, index) => {
            if (item[1] === val) {
                let spliced = data.splice(index, 1)
                console.log("spliced",spliced);
            }
            return true
        })
        this.setState({ items: [...data] })
    }

    

    render () {
        return (
            <div className="col-md-12">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="input1">Task Name</label>
                        <div className="row">
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="input1"
                                    value={this.state.term || ''}
                                    onChange={this.onChange.bind(this)}
                                />
                            </div>
                            
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={this.onSubmit.bind(this)}
                        className="btn btn-success btn-block">
                        Submit
                    </button>
                </form>
                <table className="table">
                    <tbody>
                        {this.state.items.map((item, index) => (
                            <tr key={index}>
                                <td className="text-left">{item[0]}</td>
                                <td className="text-right">
                                    <button
                                        className="btn btn-info mr-1"
                                        disabled={this.state.completed}
                                        onClick={this.onEdit.bind(this, item[0], item[1])}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        disabled={this.state.completed}
                                        onClick={this.onDelete.bind(this, item[1])}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List