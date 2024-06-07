import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRef } from "react";
const Container = styled.div``;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #999;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  width: max-content;
  padding: 10px;
  background: #666;
  border: none;
  border-radius: 3px;
  fosnt-size: 14px;
  color: white;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  const comment = useRef();

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/comments", {
        desc: comment.current.value,
        videoId,
      });
      comment.current.value = "";
    } catch (error) {}
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get("/comments/" + videoId);
        setComments(res.data);
      } catch (error) {}
    };
    fetchComments();
  }, [videoId]);

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input ref={comment} placeholder="Add a commenmt" />
        <Button onClick={addComment}>Comment</Button>
      </NewComment>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment._id} />
      ))}
    </Container>
  );
};

export default Comments;
