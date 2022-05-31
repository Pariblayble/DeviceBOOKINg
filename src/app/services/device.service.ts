import {HttpClient} from "@angular/common/http";
import {IDevice} from "../interfaces/interfaces";
import {Injectable} from "@angular/core";
import {AuthService} from "../routes/auth/auth.service";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  accessToken!: string;
  ownerId!: number;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private jwtService: JwtService,
  ) {
    this.authService.currentUser.subscribe(x => {
      this.accessToken = x?.accessToken || '';
      if (this.accessToken) {
        const {id} = this.jwtService.decode<{ id: number }>(x!.accessToken);
        this.ownerId = id;
      }
    })
  }


  getDeviceBySlug(slug: string, expand: string[] = []) {
    const query = new URLSearchParams();
    query.append('slug', slug)
    query.append('_embed', "bookedDevices");
    expand.forEach(x => {
      query.append('_expand', x);
    })
    return this.http
      .get<IDevice[]>('http://localhost:3000/devices?' + query.toString());
  }

  getDevicesByCategoryId(id: number, page = 1, limit = 16, expand: string[] = []) {
    const query = new URLSearchParams();
    query.append('categoryId', String(id))
    query.append('_embed', "bookedDevices");
    query.append('_page', String(page));
    query.append('_limit', String(limit));
    expand.forEach(x => {
      query.append('_expand', x);
    })
    return this.http
      .get<IDevice[]>('http://localhost:3000/devices?' + query.toString());
  }
}
