export const dummy = (blogs) => {
  return 1;
};

export const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

export const favoriteBlog = (blogs) => {
  const fav = blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max
  );

  return {
    title: fav.title,
    likes: fav.likes,
  };
};

export const mostBlogs = (blogs) => {
  const counts = {};

  blogs.forEach((blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1;
  });

  let topAuthor = null;
  let maxBlogs = 0;

  for (const author in counts) {
    if (counts[author] > maxBlogs) {
      maxBlogs = counts[author];
      topAuthor = author;
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs,
  };
};
