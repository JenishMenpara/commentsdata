import React, { useState } from "react";
import "./Createcomments.css";
import axios from "axios";

function Createcomments(props) {
  const [getCommetsdata, setgetCommetsdata] = useState({
    name: "",
    textarea: "",
  });

  const handelchange = (e) => {
    const { name, value } = e.target;
    setgetCommetsdata((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const submitcomments = () => {
    props.setview(false);
    axios
      .post(
        `https://61fd0f51f62e220017ce42da.mockapi.io/comments`,
        {
          name: getCommetsdata.name,
          comment: getCommetsdata.textarea,
          like: false,
        }
      )
      .then((response) => {
        console.log(getCommetsdata);
        props.getmockdata();
      });
  };

  const submitreply = (e) => {
    props.setview(false);
    e.preventDefault();
    axios
      .post(
        `https://61fd0f51f62e220017ce42da.mockapi.io/reply`,
        {
          commentId: props.replyid.id,
          name: getCommetsdata.name,
          replycomment: getCommetsdata.textarea,
          like: false,
        }
      )
      .then((responce) => {
        props.getmockdata();
        props.getmockreplydata();
      });
      //console.log(getCommetsdata)
      console.log(props.replyid)
  };
  //console.log(showCommetsdata)
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
              onChange={handelchange}
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
              onChange={handelchange}
              className="textareabox"
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
              {props.replyid ? (
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
                onClick={() => props?.setview(false)}
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

export default Createcomments;
