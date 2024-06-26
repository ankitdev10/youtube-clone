import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Card from "./Card";
import { api } from "../axios";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const query = useLocation().search;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await api.get(`/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);
  return (
    <Container>
      {videos.map((video) => (
        <Card video={video} key={video._id} />
      ))}
    </Container>
  );
};

export default Search;
