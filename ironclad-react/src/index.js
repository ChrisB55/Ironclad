import React from 'react'
import ReactDOM from 'react-dom'
import events from 'events'
import ajax from './ajax'
import './index.css';


const emitter = new events.EventEmitter();

const App = () => (
    <div>
        <div className="header">Ironclad Headless React App </div>
        <div className="content">
            <NodeList />
            <NodeForm />
        </div>
        <div className="info">Basic Info: This app is a React based App that can can interact with the associated Drupal installation, if the user is logged in with appropriate user permissions. It uses axios and the
RESTful Web Services, serialization  and a custom module to enable the data to move between applications without triggering a CORS error.
    </div>
    </div >
)

class NodeList extends React.Component {
    constructor() {
        super()
        this.state = {
            nodes: []
        }
        this.refresh = this.refresh.bind(this)
    }

    componentWillMount() {
        emitter.addListener('NODE_UPDATED', this.refresh)
    }

    componentWillUnmount() {
        emitter.addListener('NODE_UPDATED', this.refresh)
    }

    async componentDidMount() {
        await this.refresh()
    }

    async refresh() {
        try {
            const axios = await ajax()
            const response = await axios.get('/node/rest')
            if (response.data) {
                this.setState({ nodes: response.data })
            }
        } catch (e) {
            alert(e)
        }
    }

    render() {
        const deleteNode = async (nid) => {
            try {
                const axios = await ajax()
                const response = await axios.delete(`/node/${nid}`)
                console.log('Node deleted', response)
                emitter.emit('NODE_UPDATED')
            } catch (e) {
                alert(e)
            }
        }
        return (
            <div className="nodes">
                <h2>Drupal Content Items</h2>
                <div>
                    <div className="row">
                        <ul>
                            <li>ID </li>
                            <li>Title </li>
                            <li>Delete Node</li>
                        </ul>
                    </div>
                </div>
                <div>
                    {this.state.nodes.map((node, index) => {
                        return (
                            <div className="row" key={index}>
                                <ul>
                                    <li>{node.nid} </li>
                                    <li><a href={node.path} >{node.title} </a></li>
                                    <li><button onClick={e => deleteNode(node.nid)}> x </button></li>
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
const NodeForm = () => {
    const data = {}

    const handleSubmit = async (e) => {
        e.preventDefault()
        var node = {
            type: [{
                target_id: 'article',
                target_type: 'node_type',
            }],
            title: [{
                value: data.title,
            }],
            body: [{
                value: data.body,
                format: 'plain_text',
            }],
        };
        try {
            const axios = await ajax()
            const response = await axios.post('/node', node)
            console.log('Node created: ', response)
            emitter.emit('NODE_UPDATED')
        } catch (e) {
            alert(e)
        }
    }
    const handleChange = (e, propName) => {
        data[propName] = e.target.value
    }

    return (
        <div>
            <h4>Create New Content</h4>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <br />
                <input type="text" onChange={e => handleChange(e, 'title')}></input>
                <br />
                <label>Body</label>
                <br />
                <textarea onChange={e => handleChange(e, 'body')}></textarea>
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

