import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from "axios"
import { useState } from 'react';
import {format} from "timeago.js"


const Container = styled.div`
display: flex;
gap: 10px;
margin: 30px 0;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  background: #999;
`;

const Details = styled.div`
display: flex;
flex-direction: column;
color: ${({theme})=> theme.text};
gap: 5px;

`
const Name = styled.span`
font-size: 13px;
font-weight: 500;
`
const Date = styled.span`
font-size: 13px;
font-weight: 400;
color: ${({theme})=> theme.textSoft};
margin-left: 10px;
`
const Text = styled.span`
font-size: 14px;

`

const Comment = ({comment}) => {
  
  const [commentUser, setCommentUser] = useState({})
  // getting the channel/user name of the user who commented on that video

  useEffect(() => {
    const getCommentor = async () => {
      const res = await axios.get("/users/find/"+comment.userId)
      setCommentUser(res.data)
    }
    getCommentor()
  }, [comment])
  
  return (
    <Container>
      <Avatar src={commentUser.img} />
      <Details>
        <Name>{commentUser.name} <Date>{format(comment.createdAt)}</Date></Name> 
         <Text>{comment.desc}</Text>

      </Details>
    </Container>
  )
}

export default Comment
