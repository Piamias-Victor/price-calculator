import { RouteHandle } from "@/libs/context/router";

export interface UrlProps {
    readonly url?: RouteHandle
    readonly path?: string
  }