import React, {Component, Fragment} from 'react';
import NeoPostItem from "./NeoPostItem";
import axios from "axios";
import '../App.css';

class NeoPosts extends Component {
    state = {
        posts:[],
        inputPost:'',
        text:''
    }

    deletePost = async (id) =>{

        await axios.delete('http://localhost:3002/codebook/posts/'+id).then((res)=>{
            console.log(res)
        });
        let postsData = await axios.get('http://localhost:3002/codebook/posts',
            {
                headers:{
                    "x-auth-token": localStorage.getItem('token')
                }
            })
        console.log(postsData)
        this.setState({
            posts:postsData.data
        })

    }

    componentDidMount = async () => {
        {
            localStorage.getItem('token') === null &&
            this.props.history.push('/sign-in')
        }

        let postsData = await axios.get('http://localhost:3002/codebook/posts',
                                          {
                                              headers:{
                                                  "x-auth-token":localStorage.getItem('token'),
                                              }
                                          })
        console.log(postsData)
        this.setState({
                          posts:postsData.data
                      })
    }

    // async componentDidUpdate  (prevProps, prevState, snapshot) {
    //     if(prevState.posts!==this.state.posts) {
    //         let postsData = await axios.get('http://localhost:3002/codebook/posts',
    //             {
    //                 headers: {
    //                     "x-auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU5NGM1ZGE3NTJiNjMwMDA0NGUxYTk0In0sImlhdCI6MTU4NjgwODI4MiwiZXhwIjoxNTg3MTY4MjgyfQ.c5VZhqxOpUogyqrPNL9rM-yDIP5GhXT6upMmDTvOqHI'
    //                 }
    //             });
    //
    //         this.setState({
    //             posts: postsData.data
    //         })
    //     }
    // }

    submitPost = async ()=>{
        await axios.post('http://localhost:3002/codebook/posts',{text:this.state.text});
        const postsData = await axios.get('http://localhost:3002/codebook/posts',
                                          {
                                              headers:{
                                                  "x-auth-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU5NGM1ZGE3NTJiNjMwMDA0NGUxYTk0In0sImlhdCI6MTU4NjgwODI4MiwiZXhwIjoxNTg3MTY4MjgyfQ.c5VZhqxOpUogyqrPNL9rM-yDIP5GhXT6upMmDTvOqHI'
                                              }
                                          });
        console.log(postsData);
        this.setState({
                          posts:postsData.data,
                          text:''
                      })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    render() {
        return (
            <div class="container">
                <h1 className='large text-primary'>Posts</h1>
                <p className='lead'>
                    <i className='fa fa-user' /> Welcome to the community
                </p>
                <div className='post-form'>
                    <div className='bg-primary p'>
                        <h3>Say Something...</h3>
                    </div>
                    <form
                        className='form my-1'
                        onSubmit={e => {
                            e.preventDefault();
                        }}
                    >
        <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            value={this.state.text}
            required
            onChange={(e)=>this.handleChange(e)}
        />
                        <button type='submit' className='btn btn-dark my-1' onClick={()=> this.submitPost()} >
                            Submit
                        </button>
                    </form>
                </div>

                {this.state.posts && this.state.posts.map(post=>(
                    <li>{post.text}</li>
                    ))}

                {this.state.posts && this.state.posts.map(post=>(
                    <NeoPostItem showDelete={true} delete={this.deletePost} {...post} />
                ))}
            </div>
        );
    }
}

export default NeoPosts;
