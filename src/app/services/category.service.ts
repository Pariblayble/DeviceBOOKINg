import {HttpClient} from "@angular/common/http";
import {ICategory} from "../interfaces/interfaces";
import {Injectable} from "@angular/core";
import {AuthService} from "../routes/auth/auth.service";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  accessToken!: string;
  ownerId!: number;

  constructor(private authService: AuthService, private http: HttpClient, private jwtService: JwtService) {
    this.authService.currentUser.subscribe(x => {
      this.accessToken = x!.accessToken;
      const {id} = this.jwtService.decode<{ id: number }>(x!.accessToken);
      this.ownerId = id;
    })
  }

  getCategoryBySlug(slug: string, embed: string[] = []) {
    const httpOptions = {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    };
    const query = new URLSearchParams();
    query.append('slug', slug);
    if (embed.length) {
      embed.forEach(x => {
        query.append('_embed', x);
      })
    }
    return this.http
      .get<ICategory[]>('http://localhost:3000/categories?' + query.toString(), httpOptions)
  }

  getAllCategories(embed: string[] = []) {
    const httpOptions = {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    };
    const query = new URLSearchParams();
    if (embed.length) {
      embed.forEach(x => {
        query.append('_embed', x);
      })
    }
    return this.http
      .get<ICategory[]>('http://localhost:3000/categories?' + query.toString(), httpOptions)
  }
}
