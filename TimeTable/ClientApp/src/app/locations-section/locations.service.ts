import { EventEmitter, Injectable } from "@angular/core";
import { Location } from "../shared/models/location";

@Injectable()
export class LocationsService {

    locationsChanged = new EventEmitter<Location[]>()

    private locations: Location[] = [
        new Location(
            11,
            "Bolyai terem"
        ),
        new Location(
            12,
            "Ady terem"
        )
    ]

    getLocations() {
        return this.locations.slice()
    }

    addLocation(locationName: string) {
        this.locations.push(
            new Location(
                0,
                locationName
            )
        )
        this.locationsChanged.emit(this.locations.slice())
    }

    changeLocation(id: number, newname: string) {
        let locationToChange = this.locations.find(
            (location: Location) => location.locationId === id
        )
        if(locationToChange) locationToChange.name = newname
    }

    deleteLocation(locationId: number) {
        this.locations = this.locations.filter( x => x.locationId != locationId)
        this.locationsChanged.emit(this.locations.slice())
    }
}
