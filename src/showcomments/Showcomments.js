import React, { useEffect, useState } from "react";
import "./Showcomments.css";
import axios from "axios";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Createcomments from "../Createcommets/Createcomments";
import Editdata from "../editedata/Editdata";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

function Showcomments() {
  const [showCommetdata, setshowCommetdata] = useState([]);
  const [showReplycommentsdata, setshowReplycommentsdata] =
    useState([]);
  const [view, setview] = useState(false);
  const [editview, seteditview] = useState(false);
  const [title, settitle] = useState("");
  const [replyid, setreplyId] = useState();
  const [commentdata, setCommentdata] = useState();

  const getmockdata = () => {
    axios
      .get(
        "https://61fd0f51f62e220017ce42da.mockapi.io/comments"
      )
      .then((response) => {
        setshowCommetdata(response.data);
      });
  };

  const getmockreplydata = () => {
    axios
      .get(
        `https://61fd0f51f62e220017ce42da.mockapi.io/reply`
      )
      .then((response) => {
        setshowReplycommentsdata(response?.data);
      });
  };
  useEffect(() => {
    getmockdata();
    getmockreplydata();
  }, []);

  const dataDelete = (id, table) => {
    if (window.confirm(`please confirm  deleting ${id} `)) {
      axios
        .delete(
          `https://61fd0f51f62e220017ce42da.mockapi.io/${table}/${id}`
        )
        .then(() => {
          getmockdata();
          getmockreplydata();
        });
    }
  };

  const Like = (id, status, table) => {
    axios
      .put(
        `https://61fd0f51f62e220017ce42da.mockapi.io/${table}/${id}`,
        {
          like: status,
        }
      )
      .then((responce) => {
        getmockdata();
        getmockreplydata();
      });
  };

  const viewcomment = () => {
    setview(true);
    settitle("Add Comments");
    setreplyId();
  };

  const replydata = (id) => {
    setview(true);
    settitle("Reply Comments");
    setreplyId(id);
  };

  const editdata = (comment) => {
    seteditview(true);
    setCommentdata(comment);
    settitle("Edit Comments");
    //alert(comment)
  };

  function Replydata(props) {
    return (
      <>
        {showReplycommentsdata
          .filter(
            (filterreply) =>
              filterreply.commentId === props.id
          )
          .map((showreplydata, key) => {
            return (
              <>
                <div className="replydatabox" key={key}>
                  <div className="useritemlogo">
                    <AccountCircleOutlinedIcon className="userlogo" />
                  </div>
                  <div>
                    <div className="showname">
                      <span className="textname">
                        {showreplydata.name}
                      </span>
                    </div>
                    <div className="showcomment">
                      <span className="textcomments">
                        {showreplydata.replycomment}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="replyfunction">
                  <div className="like">
                    {/* <ThumbUpAltOutlinedIcon />
                    <ThumbDownAltOutlinedIcon/> */}
                    {showreplydata.like ? (
                      <button
                        type="button"
                        className="like"
                        onClick={() =>
                          Like(
                            showreplydata?.id,
                            !showreplydata?.like,
                            "reply"
                          )
                        }
                      >
                        <ThumbDownAltOutlinedIcon/>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="like"
                        onClick={() =>
                          Like(
                            showreplydata?.id,
                            !showreplydata?.like,
                            "reply"
                          )
                        }
                      >
                        <ThumbUpAltOutlinedIcon />
                      </button>
                    )}
                  </div>
                  <div className="edit">
                    <EditOutlinedIcon
                      onClick={() =>
                        editdata(showreplydata)
                      }
                    />
                  </div>

                  <div className="del">
                    <DeleteOutlineOutlinedIcon
                      type="button"
                      onClick={() =>
                        dataDelete(
                          showreplydata.id,
                          "reply"
                        )
                      }
                    />
                  </div>
                </div>
              </>
            );
          })}
      </>
    );
  }

  return (
    <>
      {view ? (
        <Createcomments
          setview={setview}
          title={title}
          getmockdata={getmockdata}
          replyid={replyid}
          getmockreplydata={getmockreplydata}
        />
      ) : null}

      {editview ? (
        <Editdata
          title={title}
          getmockreplydata={getmockreplydata}
          getmockdata={getmockdata}
          commentdata={commentdata}
          seteditview={seteditview}
        />
      ) : null}

      <div className="createbtnbox">
        <button
          type="button"
          className="createbtn"
          onClick={() => viewcomment()}
        >
          CreateComments
        </button>
      </div>

      {showCommetdata.map((showdata, key) => {
        return (
          <>
            <div className="showcommentsmainbox" key={key}>
              <div className="useritemlogo">
                <AccountCircleOutlinedIcon className="userlogo" />
              </div>
              <div>
                <div className="showname">
                  <span className="textname">
                    {showdata.name}
                  </span>
                </div>
                <div className="showcomment">
                  <span className="textcomments">
                    {showdata.comment}
                  </span>
                </div>
              </div>
            </div>
            <div className="commentfunction">
              <div className="like">
                {showdata.like ? (
                  <button
                    type="button"
                    className="like"
                    onClick={() =>
                      Like(
                        showdata?.id,
                        !showdata?.like,
                        "comments"
                      )
                    }
                  >
                    <ThumbDownAltOutlinedIcon/>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="like"
                    onClick={() =>
                      Like(
                        showdata?.id,
                        !showdata?.like,
                        "comments"
                      )
                    }
                  >
                   <ThumbUpAltOutlinedIcon />
                  </button>
                )}
              </div>
              <div className="edit">
                <EditOutlinedIcon
                  onClick={() => editdata(showdata)}
                />
              </div>
              <div className="reply">
                <ReplyOutlinedIcon
                  onClick={() => replydata(showdata)}
                />
              </div>
              <div className="del">
                <DeleteOutlineOutlinedIcon
                  type="button"
                  onClick={() =>
                    dataDelete(showdata.id, "comments")
                  }
                />
              </div>
            </div>
            <Replydata id={showdata.id} />
          </>
        );
      })}
    </>
  );
}

export default Showcomments;
