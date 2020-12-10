import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from 'src/BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private data: PostService, private router: Router) { }

  blogPost: BlogPost = new BlogPost();
  tags: String;
  
  ngOnInit(): void {
  }

  formSubmit() {
    this.blogPost.tags = this.tags.split(',').map(tag=>tag.trim());
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toLocaleDateString();
    this.blogPost.postedBy = "WEB422 Student";
    this.blogPost.views = 0;
    this.data.newPost(this.blogPost).subscribe((data)=>this.router.navigate(['admin']));
  }
}
