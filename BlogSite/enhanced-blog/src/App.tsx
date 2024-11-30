import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, Search, Heart, MessageCircle, Share2, Sun, Moon, 
  ArrowLeft, ChevronDown, LogIn, PlusCircle, Filter, X 
} from 'lucide-react';

const initialPosts = [
  {
    id: 1,
    title: 'The Future of Artificial Intelligence',
    excerpt: 'Exploring the transformative potential of AI across industries...',
    content: `Artificial Intelligence (AI) is rapidly becoming a cornerstone of technological innovation. From healthcare to finance, AI is reshaping how we work, live, and interact with the world around us.

In healthcare, AI-powered diagnostic tools are helping doctors detect diseases earlier and more accurately. Machine learning algorithms can analyze medical images, recognize patterns, and provide insights that might be missed by human eyes.

In the business world, AI is driving efficiency through predictive analytics, automated customer service, and intelligent decision-making systems. Companies are leveraging AI to personalize user experiences, optimize supply chains, and predict market trends.

The ethical implications of AI are equally fascinating. As these systems become more sophisticated, we must grapple with questions of bias, privacy, and the potential societal impacts of increasingly autonomous technologies.`,
    category: 'Technology',
    tags: ['AI', 'Innovation', 'Future Tech'],
    featuredImage: '/api/placeholder/800/400',
    author: 'Dr. Elena Rodriguez',
    readTime: '8 min read',
    date: 'November 15, 2024',
    likes: 42,
    comments: []
  },
  {
    id: 2,
    title: 'Sustainable Living: Practical Steps for a Greener Future',
    excerpt: 'Discover actionable strategies to reduce your environmental footprint and live more sustainably...',
    content: `In an era of climate change and environmental challenges, individual actions can make a significant difference. Sustainable living is not about perfection, but about making conscious choices that reduce our impact on the planet.

One of the most impactful steps is rethinking our consumption patterns. This means embracing the principles of reduce, reuse, and recycle. Start by minimizing single-use plastics, choosing products with minimal packaging, and supporting brands committed to environmental responsibility.

Diet plays a crucial role in sustainability. Plant-based diets have been shown to significantly reduce carbon emissions. Even adopting a flexitarian approach – reducing meat consumption without completely eliminating it – can have a substantial positive impact.

Energy consumption is another critical area. Investing in renewable energy, using energy-efficient appliances, and implementing simple home modifications like LED lighting and proper insulation can dramatically reduce your carbon footprint.

Transportation is a major contributor to greenhouse gas emissions. Consider alternatives like cycling, public transit, carpooling, or electric vehicles. For shorter distances, walking or cycling not only reduces emissions but also promotes personal health.`,
    category: 'Environment',
    tags: ['Sustainability', 'Climate', 'Lifestyle'],
    featuredImage: 'Photo by Tara Winstead from Pexels: https://www.pexels.com/photo/robot-pointing-on-a-wall-8386440/800/400',
    author: 'Sarah Green',
    readTime: '7 min read',
    date: 'October 22, 2024',
    likes: 35,
    comments: []
  },
  {
    id: 3,
    title: 'The Rise of Remote Work: Navigating the New Professional Landscape',
    excerpt: 'Exploring the transformation of work culture in the post-pandemic world...',
    content: `The global pandemic accelerated a workplace revolution that was already brewing: the widespread adoption of remote work. What was once considered a niche arrangement has now become a mainstream expectation for many professionals across industries.

Remote work offers unprecedented flexibility. Employees can design their work environments, balance personal and professional responsibilities more effectively, and often report higher job satisfaction. Companies benefit from access to global talent pools, reduced overhead costs, and increased productivity.

However, remote work is not without challenges. Communication becomes more intentional, requiring robust digital tools and strategies. Team building and maintaining corporate culture require creative approaches. Mental health and work-life boundaries become critical considerations.

Technology plays a pivotal role in enabling remote work. Cloud computing, collaborative platforms, video conferencing, and advanced project management tools have made seamless remote collaboration possible. Cybersecurity and data protection have consequently become paramount concerns for organizations.

The future of work is likely a hybrid model, blending remote and in-office experiences. This approach offers the best of both worlds: the flexibility of remote work and the collaborative energy of physical workspaces.`,
    category: 'Career',
    tags: ['Remote Work', 'Future of Work', 'Technology'],
    featuredImage: '/api/placeholder/800/400',
    author: 'Michael Chen',
    readTime: '6 min read',
    date: 'September 5, 2024',
    likes: 28,
    comments: []
  },
  {
    id: 4,
    title: 'Mental Health in the Digital Age: Strategies for Digital Wellness',
    excerpt: 'Understanding and managing mental health challenges in our hyper-connected world...',
    content: `The digital age has transformed how we communicate, work, and perceive the world. While technology offers unprecedented connectivity, it also presents unique challenges to our mental health and well-being.

Social media and constant digital connectivity have been linked to increased anxiety, depression, and feelings of isolation. The curated nature of online personas can lead to unhealthy comparisons and diminished self-esteem. The constant stream of information can be overwhelming, leading to digital fatigue.

Mindful technology use is crucial. This involves setting clear boundaries, creating digital-free zones and times, and being intentional about online interactions. Techniques like digital detoxes, meditation apps, and screen time management can help restore balance.

The psychology of digital wellness extends beyond individual habits. It requires a holistic approach that includes understanding the design of digital platforms, recognizing manipulation techniques, and developing critical digital literacy.

Mental health support has also been revolutionized by technology. Teletherapy, mental health apps, online support communities, and AI-driven mental health tools are making support more accessible and personalized than ever before.`,
    category: 'Health',
    tags: ['Mental Health', 'Technology', 'Wellness'],
    featuredImage: '/api/placeholder/800/400',
    author: 'Dr. Rachel Thompson',
    readTime: '7 min read',
    date: 'August 18, 2024',
    likes: 45,
    comments: []
  }
  // ... other initial posts remain the same
];

const PostDetail = ({ post, onBack }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const submitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && commentAuthor.trim()) {
      const newCommentObj = {
        id: Date.now(),
        author: commentAuthor,
        text: newComment,
        date: new Date().toLocaleDateString()
      };
      
      // Update post's comments in the main state
      const updatedPosts = initialPosts.map(p => 
        p.id === post.id 
          ? { ...p, comments: [...(p.comments || []), newCommentObj] }
          : p
      );
      
      setComments(prevComments => [...prevComments, newCommentObj]);
      setNewComment('');
      setCommentAuthor('');
    }
  };

  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button 
        onClick={onBack} 
        className="flex items-center mb-6 text-primary-600 hover:text-primary-700 transition-colors"
      >
        <ArrowLeft className="mr-2" /> Back to Posts
      </button>

      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="w-full h-96 object-cover"
        />
        
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center mb-6 text-gray-600 dark:text-gray-300 space-x-3">
            <span className="font-medium">{post.author}</span>
            <span className="text-xs">•</span>
            <span>{post.date}</span>
            <span className="text-xs">•</span>
            <span>{post.readTime}</span>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-800 dark:text-gray-200">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Enhanced Interaction Buttons */}
          <div className="flex items-center space-x-4 mt-6 mb-8">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 
                ${isLiked 
                  ? 'bg-red-100 text-red-600 scale-105' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-50'}`}
            >
              <Heart 
                className={`w-6 h-6 ${isLiked ? 'text-red-600 animate-pulse' : ''}`} 
                fill={isLiked ? 'currentColor' : 'none'}
              />
              <span>{likes} Likes</span>
            </button>
            <button 
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-50 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              <span>{comments.length} Comments</span>
            </button>
          </div>

          {/* Enhanced Comments Section */}
          <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              Comments ({comments.length})
            </h3>
            
            <form onSubmit={submitComment} className="mb-6 space-y-4">
              <input 
                type="text"
                placeholder="Your Name"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 transition"
              />
              <textarea 
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg h-32 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 transition resize-none"
              />
              <button 
                type="submit" 
                className="w-full bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                Submit Comment
              </button>
            </form>

            {comments.map((comment) => (
              <div 
                key={comment.id} 
                className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 shadow-sm border dark:border-gray-700"
              >
                <div className="flex justify-between mb-2">
                  <strong className="text-gray-800 dark:text-white">{comment.author}</strong>
                  <small className="text-gray-500 dark:text-gray-300">{comment.date}</small>
                </div>
                <p className="text-gray-700 dark:text-gray-200">{comment.text}</p>
              </div>
            ))}
          </section>
        </div>
      </article>
    </div>
  );
};

const BlogApp = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme Toggle Effect with localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Navigation */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary-600">TechBlog</h1>
            <div className="hidden md:flex space-x-4 text-gray-600 dark:text-gray-300">
              <a href="#" className="hover:text-primary-500">Home</a>
              <a href="#" className="hover:text-primary-500">Categories</a>
              <a href="#" className="hover:text-primary-500">About</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <button className="bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors hidden md:block">
              Subscribe
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {selectedPost ? (
          <PostDetail 
            post={selectedPost} 
            onBack={() => setSelectedPost(null)} 
          />
        ) : (
          <>
            {/* Enhanced Search Bar */}
            <div className="mb-8 relative max-w-2xl mx-auto">
              <input 
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border dark:border-gray-700 rounded-full pl-12 focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white transition"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>

            {/* Posts Grid with Enhanced Layout */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredPosts.map(post => (
    <div 
      key={post.id} 
      className={`
        rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl
        ${isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700' 
          : 'bg-white hover:bg-gray-50'}
      `}
      onClick={() => setSelectedPost(post)}
    >
      <div className="relative">
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 p-3">
          <span className={`
            px-3 py-1 text-xs rounded-full
            ${isDarkMode 
              ? 'bg-primary-700 text-white' 
              : 'bg-primary-500 text-white'}
          `}>
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h2 className={`
          text-xl font-bold mb-2 line-clamp-2
          ${isDarkMode ? 'text-white' : 'text-gray-900'}
        `}>
          {post.title}
        </h2>
        <p className={`
          mb-4 line-clamp-3
          ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
        `}>
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className={`
              text-sm
              ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
            `}>
              {post.author}
            </span>
            <span className={`
              text-xs
              ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}
            `}>
              • {post.readTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogApp;