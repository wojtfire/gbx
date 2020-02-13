import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppLoadingService {
    private isLoading: boolean;

    get loading(): boolean {
        return this.isLoading;
    }

    start() {
        this.isLoading = true;
    }

    stop() {
        this.isLoading = false;
    }
}