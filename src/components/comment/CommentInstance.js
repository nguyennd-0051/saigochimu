import React, { createElement, useState, Component } from 'react';
import { Comment, Tooltip, Avatar, Popconfirm } from 'antd';
import "./Comment.css";
import moment from 'moment';
import { DeleteOutlined } from '@ant-design/icons';

// const Demo = () => {
//   const [likes, setLikes] = useState(0);
//   const [dislikes, setDislikes] = useState(0);
//   const [action, setAction] = useState(null);

//   const like = () => {
//     setLikes(1);
//     setDislikes(0);
//     setAction('liked');
//   };

//   const dislike = () => {
//     setLikes(0);
//     setDislikes(1);
//     setAction('disliked');
//   };

//   const actions = [
//     <Tooltip key="comment-basic-like" title="Like">
//       <span onClick={like}>
//         {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
//         <span className="comment-action">{likes}</span>
//       </span>
//     </Tooltip>,
//     <Tooltip key="comment-basic-dislike" title="Dislike">
//       <span onClick={dislike}>
//         {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
//         <span className="comment-action">{dislikes}</span>
//       </span>
//     </Tooltip>,
//     <span key="comment-basic-reply-to">Reply to</span>,
//   ];

//   return (
//     <Comment
//       actions={actions}
//       author={<a>Han Solo</a>}
//       avatar={
//         <Avatar
//           src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
//           alt="Han Solo"
//         />
//       }
//       content={
//         <p>
//           We supply a series of design principles, practical patterns and high quality design
//           resources (Sketch and Axure), to help people create their product prototypes beautifully
//           and efficiently.
//         </p>
//       }
//       datetime={
//         <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
//           <span>{moment().fromNow()}</span>
//         </Tooltip>
//       }
//     />
//   );
// };



class CommentInstance extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        const {
            content,
            avatar,
            author,
            cmtid,
            userid,
            currentUser,
            handleDelete,
          } = this.props;

        var actions =[];  
        if (currentUser)
            if(currentUser.roles == 'ROLE_ADMIN'| currentUser.id == userid) {
            actions =  [
                <Popconfirm title="Bạn muốn xóa bình luận này?" onConfirm={() => handleDelete(cmtid)}>
                    <Tooltip key="comment-basic-like" title="Delete">
                    <span >
                        {createElement(DeleteOutlined)}
                        <span className="comment-action">Xóa</span>
                    </span>
                    </Tooltip>
                </Popconfirm>
                
            ];
        }

        else {
            actions =  [
            ];
        }
        


        return(
            <>
                <Comment
                    actions={actions}
                    author={<a>{author}</a>}
                    avatar={
                        <Avatar
                        src={avatar}
                        alt={author}
                        />
                    }
                    content={
                        <p>
                        {content}
                        </p>
                    }
                    // datetime={
                    //     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    //     <span>{moment().fromNow()}</span>
                    //     </Tooltip>
                    // }
                />
            </>
        );
    }
}

export default CommentInstance;