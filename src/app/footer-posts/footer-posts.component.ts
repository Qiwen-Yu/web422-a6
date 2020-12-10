import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from 'src/BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-footer-posts',
  templateUrl: './footer-posts.component.html',
  styleUrls: ['./footer-posts.component.css']
})
export class FooterPostsComponent implements OnInit {

  posts: Array<BlogPost>;
  private postsSub;

  constructor(private data: PostService) { }

  ngOnInit(): void {
    this.postsSub = this.data.getPosts(1, null, null).subscribe( post => this.posts = post.slice(0,3) );
  }

}
