"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const regex = new RegExp(e.target.value, "i");
    const filteredPosts = posts.filter((post) => {
      return (
        regex.test(post.prompt) ||
        regex.test(post.tag) ||
        regex.test(post.creator.email) ||
        regex.test(post.creator.username)
      );
    });

    setFilteredPosts(filteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const listPosts = searchText ? filteredPosts : posts;

  return (
    <section className="feed">
      <form className="relative w-full flex-center" action="">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={listPosts} handleTagClick={() => {}} />
    </section>
  );
};

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default Feed;
