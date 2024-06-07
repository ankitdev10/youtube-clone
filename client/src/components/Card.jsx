import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import axios from "axios";

const Container = styled.div`
  width: ${(props) => props.type !== "small" && "360px"};
  margin-bottom: ${(props) => (props.type === "small" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "small" && "flex"};
  gap: 10px;
`;

const Img = styled.img`
  width: ${(props) => (props.type === "small" ? "200px" : "360px")};
  height: ${(props) => (props.type === "small" ? "120px" : "200px")};
  object-fit: cover;
  border-radius: 5px;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "small" && "16px"};
  gap: 12px;
  flex: 1;
 
`;

const ChannelImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #999;
`;

const Texts = styled.div``;
const Title = styled.h1`
  font-size: ${(props) => (props.type === "small" ? "14px" : "16px")};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 8px 0;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, getChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      getChannel(res.data);
    };

    fetchChannel();
  }, [video.userId]);

  const addView = async () => {
    try {
      await axios.put("/videos/view/" + video._id);
    } catch (error) {}
  };

  return (
    <Link
      style={{ textDecoration: "none", color: "inherit" }}
      to={`/video/${video._id}`}
    >
      <Container onClick={addView} type={type}>
        <Img type={type} src={video.imgUrl} />
        <Details type={type}>
          {type !== "small" && <ChannelImg src={channel.img} />}
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views - {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
