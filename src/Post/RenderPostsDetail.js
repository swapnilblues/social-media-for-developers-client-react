import React, {Component} from 'react';
import axios from "axios";
import PostBlockDetail from "./PostBlockDetail";

class RenderPostsDetail extends Component {

    state = {
        posts:[]
    }

    componentDidMount = async () => {
        const postsData = await axios.get('http://localhost:3002/codebook/posts',
                                          {
                                              headers:{
                                                  "x-auth-token":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU5NGM1ZGE3NTJiNjMwMDA0NGUxYTk0In0sImlhdCI6MTU4NjgwODI4MiwiZXhwIjoxNTg3MTY4MjgyfQ.c5VZhqxOpUogyqrPNL9rM-yDIP5GhXT6upMmDTvOqHI'
                                              }
                                          });
        this.setState({
                          posts:postsData.data
                      })
    }

    render() {
        return (
            <div>
                <PostBlockDetail posts={this.state.posts}/>
            </div>
        );
    }
}

export default RenderPostsDetail;
