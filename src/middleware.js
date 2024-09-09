import { NextResponse } from "next/server";

export const config = {
    matcher: ['/game/:path*'],
}

export function middleware(req) {
    let userObj = req.cookies.get('username');
    if (!userObj || !userObj.value) {
        return NextResponse.redirect(new URL("/?error=2", req.url));
    }

    //Check DB for game ID, should exist, if exists should not be expired. - URL should be a GUID
    return NextResponse.next();
}