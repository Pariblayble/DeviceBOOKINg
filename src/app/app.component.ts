import { Component } from '@angular/core';

export interface CardElement{
    title: string,
    src: string,
    description: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cards = [
    {
        title: 'IPhone 11',
        src: 'src/imgs/iphone_11.png',
        description: 'Смартфон Apple iPhone 11 128GB с новой комплектацией черный'
    },
    {
        title: 'Honor 50',
        src: 'src/imgs/HONOR.jpg',
        description: 'Смартфон Honor 50 6/128GB изумрудно-зеленый'
    },
    {
        title: 'Samsung Galaxy Z',
        src: 'src/imgs/SAMSUNG.jpg',
        description: 'Samsung Galaxy Z Flip3 5G 8/128GB (бежевый)'
    },
    {
        title: 'IPhone 11',
        src: 'src/imgs/Xiaomi.jpg',
        description: 'Xiaomi Redmi Note 11 4/128GB (серый графит)'
    }
  ]

}
