// CRUD Operations
class BlogPost {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
  createPost() {}

  updatePost() {}

  deletePost() {}
}

// RenderHTML
class BlogPostDisplay{
  constructor(public blogPost: BlogPost) {}

  displayHTML():void {
    console.log(`Blog title: ${this.blogPost.title} | Blog content: ${this.blogPost.content}`);
  }
}

// RenderJSON
class BlogPostJSON {
  constructor(public blogPost: BlogPost) {}

  returnJSON() {
    return JSON.stringify({
      title: this.blogPost.title,
      content: this.blogPost.content
    })
  }
}
