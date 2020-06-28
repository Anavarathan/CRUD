import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/service/home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any;

  constructor(private homeService: HomeService, private spinner: NgxSpinnerService,
    private _service: NotificationsService) { }

  ngOnInit() {
    this.homeService.getData().subscribe(res => {
      this.posts = res;
      let trimmedposts = this.posts.slice(0, 10).map(i => {
        return i;
      });
      this.posts = trimmedposts
    });
  }

  createpost(title) {
    this.spinner.show();
    let post = { title: title.value };
    title.value = '';
    this.homeService.postData(post).subscribe(res => {
      post['id'] = res;
      this.posts.splice(0, 0, post)
      this.onCreate();
    })
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  updatePost(post) {
    this.spinner.show();
    this.homeService.updateData(post).subscribe(res => {
      console.log('res', res)
    })
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  deletePost(post) {
    this.spinner.show();
    this.homeService.deleteData(post).subscribe(res => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      this.onDelete();
    })
  }

  onDelete() {
    this._service.info('Deleted successfully', '', {
      position: ['top', 'right'],
      timeOut: 3000,
      showProgressBar: false,
      // pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true
    });
  }

  onCreate() {
    this._service.success('Created successfully', '', {
      position: ['top', 'right'],
      timeOut: 3000,
      showProgressBar: false,
      // pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true
    });
  }
}
