import React, { Component } from 'react'


class DropDown extends Component {
    constructor(props) {
        super(props)
        this.state = {           
            isOpen:false
        }
        this.toggleDrop = this.toggleDrop.bind(this)
    }
    getSelectedId = (key) => (e) => {
        this.setState((prevState) => ({
            isOpen:!prevState.isOpen
        }), () => this.props.toggleSelected(key))
        
    }
    toggleDrop() {
        this.setState((prevState) => ({
            isOpen:!prevState.isOpen
        }))
    }
    render() {
        const { list, title } = this.props
        const { isOpen } = this.state
        return (
            <div className="dd-block">
                <div className="dd-header-block" onClick={this.toggleDrop}>
                    <div className="dd-header-title">{title}</div>
                </div>
                {
                    isOpen && 
                    <ul className="dd-list-block">
                        {
                            list.map((item, key) => {
                                return (
                                    <li className="dd-list-item" key={item.type} onClick={this.getSelectedId(key)}>{item.name}</li>
                                )
                            })
                        }
                    </ul>
                }
            </div>
        )
    }
}

export default DropDown