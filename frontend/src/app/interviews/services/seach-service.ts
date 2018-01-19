import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs/BehaviorSubject"

@Injectable()
export class SearchService {
    private searchKeywordBehavior = new BehaviorSubject<string>("");
    searchKeyword  = this.searchKeywordBehavior.asObservable();

    changeSearchKeyword(searchKeyword: string){
        this.searchKeywordBehavior.next(searchKeyword);
    }
}