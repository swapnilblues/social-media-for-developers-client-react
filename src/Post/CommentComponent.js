import React, {Component} from 'react';
import axios from "axios";

class CommentComponent extends Component {

    state={
        show:true
    }

    handleDeleteComment =()=>{
        axios.delete('http://localhost:3002/codebook/posts/comment/'+this.props.postId+'/'+this.props.comment._id,{text: this.state.inputComment}).then((res)=>{
            if(res){
                this.setState({
                        show:false
                              })
                this.props.handleDeleteOfComment()
            }
        });
    }

    render() {
        return (
                     <div>
                         {
                             this.state.show ?
                             <div>
                         <li type="text" className="form-control" placeholder="Comment"
                             aria-label="Comment"
                             aria-describedby="basic-addon2">{this.props.comment.text}</li>
                         <div className="input-group-append">
                             <span onClick={this.handleDeleteComment} className="input-group-text"
                                   id="basic-addon2">Delete</span>
                         </div>
                             </div>
                             :
                             null
                             }
                     </div>

        );
    }
}

export default CommentComponent;
