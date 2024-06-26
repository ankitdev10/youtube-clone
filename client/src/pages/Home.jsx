import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { api } from "../axios";
const Container = styled.div`
  display: flex;
  ${"" /* justify-content: space-between; */}
  gap: 40px;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getRandomVideos = async () => {
      const res = await api.get(`/videos/${type}`);
      setVideos(res.data);
    };

    getRandomVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
