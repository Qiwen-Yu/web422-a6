import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogPosts: Array<BlogPost>;
  page: number = 1;
  tag: String = null;
  category: String = null;
  querySub: any;

  constructor(private data: PostService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if(params['tag']){
        this.tag = params['tag'];
        this.category = null;
      }else{
        this.tag = null;
      }
      if(params['category']){
        this.category = params['category'];
        this.tag = null;
      }else{ this.category = null; }
      this.getPage(+params['page'] || 1);
    });
  }

  getPage(num) {
    this.querySub = this.data.getPosts(num, this.tag, this.category).subscribe( data => {
      if(data.length > 0) {
        this.blogPosts = data.sort((a,b) => {
          return a.postDate == b.postDate ? 0 : a.postDate < b.postDate ? 1 : -1;
        });
        this.page = num;
      }
      else { // if query parameter 'page' is not provided, show all posts (without paging)
        this.blogPosts = data;
      }
      
    });
  }

  ngOnDestroy() {
    if(this.querySub) this.querySub.unsubscribe();
  }

}
