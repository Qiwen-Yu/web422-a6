import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from 'src/BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {

  post: BlogPost
  private querySub: any;

  commentName: string;
  commentText: string;

  constructor(private data: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params => {
      this.data
        .getPostbyId(params["id"])
        .subscribe(post => {
          this.post = post;
          this.post.views += 1;
          this.data.updatePostById(this.post._id, this.post).subscribe();
        });
        window.scrollTo(0,0);
    });
  }

  submitComment() {
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    });

    this.data.updatePostById(this.post._id, this.post)
      .subscribe((data) => {
        this.commentName = null;
        this.commentText = null;
      });
  }

  ngOnDestroy() {
    if(this.querySub) this.querySub.unsubscribe();
  }

}
