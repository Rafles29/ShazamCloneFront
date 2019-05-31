import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'szaklon';

  constructor(private _auth: AuthenticationService) {}

  ngOnInit(): void {
    if (this._auth.hasToken()) {
      this._auth.enableCheckSession();
    }
  }
}
