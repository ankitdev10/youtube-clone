import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";
import { api } from "../axios";
const Container = styled.div`
  flex: 2;
`;

const Recomendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await api.get("/videos/tags?tags=" + tags);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} type={"small"} />
      ))}
    </Container>
  );
};

export default Recomendation;
