import {HttpClient} from "@angular/common/http";
import {IDevice} from "../app/interfaces/interfaces";

export const updateDevice = (id: number, body: Partial<IDevice>, accessToken: string, callback: (device: IDevice) => any, http: HttpClient) => {
  const route = 'http://localhost:3000/devices/' + id;
  return http
    .get<IDevice>(route, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .subscribe((res: IDevice) => {
      res = {...res, ...body};
      return http
        .put<IDevice>(route, res, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
        .subscribe((res: IDevice) => {
          callback(res);
        });
    });
}
