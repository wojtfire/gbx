import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotifierService {
    private $open = new Subject<any>();
    private $close = new Subject<any>();
    private currMessage: string;

    get message(): string {
        return this.currMessage;
    }

    get openEvent(): Observable<any> {
        return this.$open.asObservable();
    }

    get closeEvent(): Observable<any> {
        return this.$close.asObservable();
    }

    open(message: string, miliseconds: number) {
        this.currMessage = message;
        this.$open.next();
        this.close(miliseconds);
    }

    close(miliseconds: number) {
        setTimeout(() => {
            this.$close.next();
            this.clearMessage();
        }, miliseconds);
    }

    clearMessage() {
        this.currMessage = null;
    }
}