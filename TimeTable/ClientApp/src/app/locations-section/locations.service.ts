import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { AuthorizeService } from "src/api-authorization/authorize.service";
import { ILocation } from "../shared/interfaces/location-interface";
import { Location } from "../shared/models/location";

@Injectable()
export class LocationsService {

    locationsChanged = new EventEmitter<void>()
    url: string = 'https://orarend.azurewebsites.net/api/Location/locations'

    constructor(private http: HttpClient,private readonly authService:AuthorizeService) { }

    getLocations() {
      let myHeaders=new Headers();
      const authHeader=this.authService.getAuthCookie();
      console.log(authHeader)
      myHeaders.append(authHeader.name,authHeader.value);
      const options:Object={headers:myHeaders,withCredentials:true}
      console.log(options)
        return this.http
            .get<{ [key: number]: ILocation }>(
                'https://localhost:44320/api/Location/locations',options
            )
            .pipe(
                map(responseData => {
                    const locationArray: Location[] = []
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            locationArray.push(
                                new Location(
                                    responseData[key].locationId,
                                    responseData[key].name
                                )
                            )
                        }
                    }
                    return locationArray
                }))
    }

    addLocation(locationName: string) {
        const requestParam = '"'.concat(locationName).concat('"')
        return this.http.post(
            this.url,
            requestParam,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            }
        )
    }

    changeLocation(id: number, newname: string) {
        const requestParam = '"'.concat(newname).concat('"')
        return this.http.put(
            this.url + "/" + id,
            requestParam,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            }
        )
    }

    deleteLocation(locationId: number) {
        const requestParam = locationId
        return this.http
            .delete(this.url + "/" + requestParam, {
                observe: 'events',
                responseType: 'text'
            })
            .pipe(
                tap(event => {
                    if (event.type === HttpEventType.Sent) {
                        console.log("Delete request was sent.")
                    }
                    if (event.type === HttpEventType.Response) {
                        console.log(event.body);
                    }
                })
            );
    }
}
