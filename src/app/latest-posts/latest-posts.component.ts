import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from 'src/BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {

  posts: Array<BlogPost>;
  private postsSub;

  constructor(private data: PostService) { }

  ngOnInit(): void {
    this.postsSub = this.data.getPosts(1, null, null).subscribe( post => this.posts = post.slice(0,3) );
  }

}
