import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from 'src/BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost;
  querySub: any;
  tags: String;

  constructor(private data: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params => {
      this.data
        .getPostbyId(params["id"])
        .subscribe(post => {this.blogPost = post; this.tags = this.blogPost.tags.toString();});
    });
  }

  formSubmit() {
    this.blogPost.tags = this.tags.split(',').map(tag=>tag.trim());
    this.data.updatePostById(this.blogPost._id,this.blogPost).subscribe((data)=>this.router.navigate(['admin']));
  }

  deletePost(){
    this.data.deletePostById(this.blogPost._id).subscribe((data)=>this.router.navigate(['admin']));
  }
}
