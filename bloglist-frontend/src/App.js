import React from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            username: '',
            password: '',
            user: null,
            newTitle: '',
            newAuthor: '',
            newUrl: '',
            notification: '',
            notificationType: ''
        }
    }

    componentDidMount() {
        blogService
            .getAll()
            .then((blogs) => {
                blogs.sort((blog1, blog2) => {
                    return blog2.likes - blog1.likes
                })

                this.setState({ blogs })
            })

        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({ user })
            blogService.setToken(user.token)
        }
    }

    handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleNewBlogFieldChange = (event) => {
        if (event.target.name === 'title') {
            this.setState({ newTitle: event.target.value })
        } else if (event.target.name === 'author') {
            this.setState({ newAuthor: event.target.value })
        } else if (event.target.name === 'url') {
            this.setState({ newUrl: event.target.value })
        }
    }

    login = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            this.setState({ username: '', password: '', user })
        } catch (exception) {
            this.setState({
                notification: 'käyttäjätunnus tai salasana virheellinen'
            })
            setTimeout(() => {
                this.setState({ notification: null })
            }, 4000)
        }
    }

    addBlog = (event) => {
        event.preventDefault()

        var blogObj = {
            title: this.state.newTitle,
            author: this.state.newAuthor,
            url: this.state.newUrl
        }

        blogService
            .create(blogObj)
            .then(newBlog => {
                this.setState({
                    blogs: this.state.blogs.concat(newBlog),
                    newTitle: '',
                    newAuthor: '',
                    newUrl: '',
                    notification: 'Luotiin uusi blogi: ' + newBlog.title
                })
                setTimeout(() => {
                    this.setState({ notification: null })
                }, 4000)
            })
            .catch(error => {
                console.log('error:', error)
            })
    }

    render() {
        const logout = () => {
            window.localStorage.removeItem('loggedUser')
            window.location.reload()
        }

        const loginForm = () => {
            return (
                <Togglable buttonLabel="login" ref={component => this.loginForm = component}>
                    <LoginForm
                        username={this.state.username}
                        password={this.state.password}
                        handleLoginFieldChange={this.handleLoginFieldChange}
                        login={this.login}
                    />
                </Togglable>
            )
        }

        return (
            <div>
                <Notification message={this.state.notification}
                              type={this.state.notificationType}   />

                {this.state.user === null ?
                    loginForm() :
                    <div>
                        <p>{this.state.user.name} logged in
                            <button onClick={logout}>logout</button>
                        </p>
                        {<div>
                            <NewBlog handleNewBlogFieldChange={this.handleNewBlogFieldChange}
                                     addBlog={this.addBlog}
                                     newTitle={this.state.newTitle}
                                     newAuthor={this.state.newAuthor}
                                     newUrl={this.state.newUrl} />

                            <h2>blogs</h2>
                            {this.state.blogs.map(blog => 
                                <Blog key={blog.id} blog={blog}/>
                            )}
                        </div>}
                    </div>
                }
            </div>
        )
    }
}

export default App