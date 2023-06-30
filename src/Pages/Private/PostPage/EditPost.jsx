import { useContext, useEffect, useState } from "react";
import "../../Public/HomePage/Home.css";
import { useNavigate, useParams } from "react-router";
import { usePost } from "../../../context/PostContext";
import { useAuth } from "../../../context/AuthContext";

export default function EditPost() {
  const { postId } = useParams();
  const { getPost, thisPost, editPost } = useContext(usePost);
  const [editedPost, setEditedPost] = useState({ ...thisPost });
  const navigate = useNavigate();
  const { userDetail } = useAuth();

  const eventHandler = (e) => {
    setEditedPost({ ...editedPost, content: e.target.value });
    // console.log(editedPost);
  };

  const imageHandler = async (e) => {
    try {
      const image = e.target.files[0];
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "Toemedia");
      data.append("cloud_name", "dbehxf29s");
      if(image.type === "video/mp4"){
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dbehxf29s/video/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const uri = await res.json();
      setEditedPost({ ...editPost, videoUrl: uri.url });
      }
      else{
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dbehxf29s/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const uri = await res.json();
      setEditedPost({ ...editPost, imageUrl: uri.url });}
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <div className="home-page-head">
      <div className="home-page-title">
        <h2>Edit Post</h2>
      </div>
      <div className="home-page-content">
        <div className="new-post-button">
          <div className="new-post-box">
            <img
              className="profile-image"
              src={
                userDetail?.profileImage
                  ? userDetail?.profileImage
                  : "https://picsum.photos/id/1/200/300"
              }
              alt="profile"
              width="50"
              height="50"
              style={{ alignSelf: "flex-start" }}
            />
            <textarea
              className="new-post"
              contenteditable="true"
              style={{ height: "400px", border: "1px solid #666666" }}
              placeholder="Kick something out of your mind....."
              defaultValue={thisPost.content}
              onChange={eventHandler}
            />
          </div>
          {editedPost?.imageUrl && <img src={editedPost?.imageUrl} alt="sfads" height="100" width="100" />}
          <input type="file" onChange={imageHandler} />
          <button
            type="submit"
            onClick={() => {
              editPost(postId, editedPost);
              navigate("/");
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
