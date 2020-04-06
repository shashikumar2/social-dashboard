import React from 'react'
import axios from 'axios'

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            email: localStorage.getItem('email'), 
            users: [],
            posts: [],
            userInfo: {},
            company: '',
            catchphrase: '',
            status: true
           
        }
    }

    handleStatus = () => {
        this.setState(prevState => ({
            status: !prevState.status
        }))
    }
  

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            let users = response.data
            let object = users.find(user => {
                if(user.email == this.state.email) {
                    return (user.id)
                }
            })
            let id = object.id
            //console.log(users)
            //console.log(id)
            
            this.setState({users})
            axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then((response) => {
                let posts = response.data
                //console.log(posts)
                this.setState({posts})
            })
            
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response) => {
                let userInfo = response.data
                let company = userInfo.company.name
                let catchPhrase = userInfo.company.catchPhrase
                //console.log(userInfo.company.catchPhrase)
                this.setState({userInfo, company, catchPhrase})
                
            })
        })
    }

    render(){
        return (
            <div>
                {(this.state.status) && (<div>
                <p>SwitchDash</p><button onClick={this.handleStatus}>Logout</button><br/>
                <h3>NAME: {this.state.userInfo.name} </h3> <br/>
                
                <p>email: {this.state.userInfo.email} </p>
                <p>Phone number: : {this.state.userInfo.phone} </p>
                <p>Company: {this.state.company} </p> 
                <p>CatchPhrase: {this.state.catchPhrase} </p><br/>
                <h4>All posts of {this.state.userInfo.name}: </h4>
                
                <ul>
                    {
                        this.state.posts.map(post => {
                            return (
                                <li key={post.id}>{post.title}</li>
                            )
                        })
                    }
                </ul> </div>)}
            </div>
        )
    }
}

export default Dashboard