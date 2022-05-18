import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IDevice, User } from '../../interfaces/interfaces';
import { updateDevice } from "../../../services/device.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    currentCards!: IDevice[];
    dataLoaded = false;
    currentUser: User = {
        name: '',
        email: '',
        id: 0,
        password: '',
        secondName: '',
        accessToken: '',
    };

    constructor(private authService: AuthService, private _http: HttpClient, private modalService: NgbModal, private titleService: Title) {
        this.authService.currentUser.subscribe((x) => {
            this.currentUser = x!;
        });
        this.titleService.setTitle('Профиль ' + this.currentUser.email);
    }

    append(id: number) {
        return updateDevice(id, {},
            this.currentUser.accessToken!,
            () => {
                this.currentCards = this.currentCards.filter(x => x.id !== id);
            },
            this._http
        )
    }

    remove(id: number) {
        return updateDevice(id!, {
            bookData: {
                userId: null,
                comments: "",
                toDate: null,
                needCharge: false,
                fromDate: null,
            }
        },
            this.currentUser.accessToken!,
            () => {
                this.currentCards = this.currentCards.filter(x => x.id !== id);
            },
            this._http
        )
    }

    ngOnInit(): void {
        this._http
            .get<IDevice[]>('http://localhost:3000/devices?bookData.userId=' + this.currentUser.id, {
                headers: {
                    authorization: `Bearer ${this.currentUser.accessToken}`,
                },
            })
            .subscribe((x: IDevice[]) => {
                this.currentCards = x;
                this.dataLoaded = true;
            });
    }

    open(content: TemplateRef<any>, id: number) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
    }
}
