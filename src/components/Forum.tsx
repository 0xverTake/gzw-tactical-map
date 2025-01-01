import { useState } from 'react';
import { motion } from 'framer-motion';

interface ForumPost {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
}

const mockPosts: ForumPost[] = [
  {
    id: 1,
    title: "Guide des meilleures positions sur la carte Duga",
    author: "TacticalPlayer",
    date: "2023-12-28",
    content: "Dans ce guide, je vais vous montrer les meilleurs spots de sniper...",
    category: "Guides",
    likes: 45,
    replies: 12
  },
  {
    id: 2,
    title: "Bug avec le système de commerce",
    author: "BugHunter",
    date: "2023-12-27",
    content: "J'ai remarqué un problème avec le système de commerce...",
    category: "Bugs",
    likes: 15,
    replies: 8
  },
  {
    id: 3,
    title: "Recherche équipe pour raids nocturnes",
    author: "NightRaider",
    date: "2023-12-26",
    content: "Je cherche des joueurs expérimentés pour faire des raids de nuit...",
    category: "Recrutement",
    likes: 32,
    replies: 24
  }
];

const categories = ["Tous", "Guides", "Bugs", "Recrutement", "Discussion"];

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Tous" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="forum-container">
      <div className="forum-header">
        <h1>Forum Communautaire</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher dans le forum..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="categories">
        {categories.map(category => (
          <motion.button
            key={category}
            className={`category-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className="posts-list">
        {filteredPosts.map(post => (
          <motion.div
            key={post.id}
            className="post-card"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>{post.title}</h2>
            <div className="post-meta">
              <span className="author">{post.author}</span>
              <span className="date">{post.date}</span>
              <span className="category">{post.category}</span>
            </div>
            <p className="post-preview">{post.content}</p>
            <div className="post-stats">
              <span>👍 {post.likes}</span>
              <span>💬 {post.replies}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
