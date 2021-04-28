import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private notificationSource = new BehaviorSubject<any>('');
    currentNotify = this.notificationSource.asObservable();

    changeNoficication(message: any) {
        this.notificationSource.next(message);
    }


    constructor() {
    }
}
