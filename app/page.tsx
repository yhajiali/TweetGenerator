"use client";

import Image from "next/image";
import TweetGenerator from "./components/TweetGenerator";

export default function Home() {
  return (
    <div className="container">
      <h1>
        <span className="highlight">Generate</span> your next
        <br /> <span className="highlight">Tweet</span> using{" "}
        <span className="highlight">AI</span>
      </h1>

      <TweetGenerator />
    </div>
  );
}
