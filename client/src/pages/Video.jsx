import {
  AddTask,
  Delete,
  ReplyOutlined,
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { format } from "timeago.js";
import { api } from "../axios";
import { fetchSuccess, like, dislike } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import Recomendation from "../components/Recomendation";
const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const VideoFrame = styled.video`
  ${"" /* height: 480px; */}
  max-height: 720px;
  max-width: 720px;
  widht: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  background: #999;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const ChannelDesc = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  background-color: #cc1a00;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 14px !important;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const dispatch = useDispatch();
  const [channel, setChannel] = useState({});

  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const video = await api.get("/videos/find/" + path);
        dispatch(fetchSuccess(video.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, []);

  useEffect(() => {
    const fetchChanel = async () => {
      try {
        const channel = await api.get("/users/find/" + currentVideo.userId);
        setChannel(channel.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChanel();
  }, [currentVideo]);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      !currentUser && navigate("/signin");
      await api.put("/users/like/" + currentVideo._id);
      dispatch(like(currentUser._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async (e) => {
    e.preventDefault();
    try {
      !currentUser && navigate("/signin");
      await api.put("/users/dislike/" + currentVideo._id);
      dispatch(dislike(currentUser._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      !currentUser && navigate("/signin");
      currentUser.subscribedUsers.includes(channel._id)
        ? await api.put("/users/unsub/" + channel._id)
        : await api.put("/users/sub/" + channel._id);
      dispatch(subscription(channel._id));
    } catch (error) {}
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete("/videos/" + currentVideo._id);
      navigate("/");
    } catch (error) {}
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views- {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpOutlined />
              )}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes.includes(currentUser?._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOutlined />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlined />
              Share
            </Button>
            <Button>
              <AddTask />
              Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <ChannelDesc>{currentVideo?.desc}</ChannelDesc>
            </ChannelDetail>
          </ChannelInfo>
          {currentVideo?.userId !== currentUser?._id ? (
            <Subscribe onClick={handleSubscribe}>
              {currentUser?.subscribedUsers?.includes(channel._id)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </Subscribe>
          ) : (
            <DeleteBtn onClick={handleDelete}>{<Delete />} Delete</DeleteBtn>
          )}
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recomendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
