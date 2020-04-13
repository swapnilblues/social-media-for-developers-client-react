import React, {Component} from 'react';
import axios from "axios";
import PostComponent from "./PostComponent";
import PostBlock from "./PostBlock";
import {InputGroup} from "react-bootstrap";
import {FormControl} from "react-bootstrap";

class RenderPosts extends Component {

    state = {
        posts:[],
        inputPost:''
    }

    componentDidMount = async () => {
        const postsData = await axios.get('https://group-32-node-server.herokuapp.com/codebook/posts',
                                      {
                                          headers:{
                                              "x-auth-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU5NGM1ZGE3NTJiNjMwMDA0NGUxYTk0In0sImlhdCI6MTU4NjgwODI4MiwiZXhwIjoxNTg3MTY4MjgyfQ.c5VZhqxOpUogyqrPNL9rM-yDIP5GhXT6upMmDTvOqHI'
                                          }
                                      });
        console.log(postsData.data)
        this.setState({
            posts:postsData.data
                      })
    }

    handleCreatePost= async ()=>{
        await axios.post('http://localhost:3002/codebook/posts',{text:this.state.inputPost});
        const postsData = await axios.get('http://localhost:3002/codebook/posts',
                                          {
                                              headers:{
                                                  "x-auth-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU5NGM1ZGE3NTJiNjMwMDA0NGUxYTk0In0sImlhdCI6MTU4NjgwODI4MiwiZXhwIjoxNTg3MTY4MjgyfQ.c5VZhqxOpUogyqrPNL9rM-yDIP5GhXT6upMmDTvOqHI'
                                              }
                                          });
        this.setState({
                          posts:postsData.data,
                          inputPost:''
                      })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                <div className="container">
                    <InputGroup>
                        <FormControl name="inputPost"
                                     onChange={this.handleChange}
                                     as="textarea"
                                     aria-label="Create Post" />
                        <InputGroup.Prepend>
                            <button onClick={this.handleCreatePost}><InputGroup.Text>Create Post</InputGroup.Text></button>
                        </InputGroup.Prepend>
                    </InputGroup>
                    <br/>
                </div>
                <PostBlock posts={this.state.posts}/>
            </div>

        );
    }
}

export default RenderPosts;
