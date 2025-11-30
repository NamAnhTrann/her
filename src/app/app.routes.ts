import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { LoveLetter } from './love-letter/love-letter';

export const routes: Routes = [
    {path: "", component:Homepage},
    {path: "love_letter", component:LoveLetter}
];
