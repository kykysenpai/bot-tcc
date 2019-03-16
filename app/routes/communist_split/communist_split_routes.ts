import {Express} from "express";
import RouteComponent from "../route_component";

export default class CommunistSplitRoutes implements RouteComponent {

    setupRoute(server: Express) {
        server.get("/api/communist-split/post", () => {
            console.info("new payment");
        });
    }
}
