import React, { useState } from "react";
import "./Editdata.css";
import axios from "axios";

function Editdata(props) {
  const [getCommetsdata, setgetCommetsdata] = useState({
    name: props.commentdata.name,
    textarea: props.commentdata.comment,
  });
  

  const submitcomments = (e) => {
    props.seteditview(false);
    axios
      .put(
        `https://61fd0f51f62e220017ce42da.mockapi.io/comments/${props.commentdata.id}`,
        {
          name: getCommetsdata.name,
          comment: getCommetsdata.textarea,
          like: props.commentdata.Like,
        }
      )
      .then((response) => {
        console.log(getCommetsdata);
        props.getmockdata();
      });
  };

  const submitreply = (e) => {
    props.seteditview(false);
    e.preventDefault();
    axios
      .put(
        `https://61fd0f51f62e220017ce42da.mockapi.io/reply/${props.commentdata.id}`,
        {
          commentId: props.commentdata.replyid,
          name: getCommetsdata.name,
          replycomment: getCommetsdata.textarea,
          like: props.commentdata.Like,
        }
      )
      .then((responce) => {
        props.getmockdata();
        props.getmockreplydata();
      });
  };

  const commentdata = (e) => {
    const { name, value } = e.target;
    setgetCommetsdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="mainbox">
        <div className="addcommetsbox">
          <div className="boxiteam">
            <h1>{props.title}</h1>
            <br />
            <hr />
            <span>Add Name</span>
            <br />
            <input
              onChange={commentdata}
              value={getCommetsdata.name}
              type="text"
              name="name"
              id="text"
              required
              placeholder="Enter Your Name"
              autoComplete="off"
            />
            <br />
            <hr />
            <span>Comments</span>
            <br />
            <textarea
              onChange={commentdata}
              className="textareabox"
              value={getCommetsdata.textarea}
              name="textarea"
              id=""
              cols="100"
              rows="10"
              placeholder="Enter New Comment Here..."
              required
            ></textarea>
            <br />
            <hr />
            <div className="boxitembtn">
              {props.commentdata ?.commentId ? (
                <button
                  className="boxitembtnadd"
                  onClick={(e) => submitreply(e)}
                >
                  Add reply
                </button>
              ) : (
                <button
                  className="boxitembtnadd"
                  onClick={(e) => submitcomments(e)}
                >
                  Add comment
                </button>
              )}

              <button
                className="boxitembtnclose"
                onClick={() => props?.seteditview(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editdata;
