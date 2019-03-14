import {Express} from "express";

export default interface RouteComponent {
    setupRoute(server: Express): void;
}
