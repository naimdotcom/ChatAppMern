import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models/user.model";
import { Document } from "mongoose";

enum HttpStatusResponse {
  ok = "response ok 200",
  created = "response created 201",
  accepted = "response accepted 202",
  noContent = "response no content 204",
  multipleChoices = "response multiple choices 300",
  movedPermanently = "response moved permanently 301",
  found = "response found 302",
  seeOther = "response see other 303",
  notModified = "response not modified 304",
  useProxy = "response use proxy 305",
  switchProxy = "response switch proxy 306",
  temporaryRedirect = "response temporary redirect 307",
  permanentRedirect = "response permanent redirect 308",
  badRequest = "response bad request 400",
  unauthorized = "response unauthorized 401",
  forbidden = "response forbidden 403",
  notFound = "response not found 404",
  methodNotAllowed = "response method not allowed 405",
  notAcceptable = "response not acceptable 406",
  proxyAuthenticationRequired = "response proxy authentication required 407",
  requestTimeout = "response request timeout 408",
  conflict = "response conflict 409",
  gone = "response gone 410",
  lengthRequired = "response length required 411",
  preconditionFailed = "response precondition failed 412",
  requestEntityTooLarge = "response request entity too large 413",
  requestUriTooLong = "response request uri too long 414",
  unsupportedMediaType = "response unsupported media type 415",
  requestedRangeNotSatisfiable = "response requested range not satisfiable 416",
  expectationFailed = "response expectation failed 417",
  internalServerError = "response internal server error 500",
  notImplemented = "response not implemented 501",
  badGateway = "response bad gateway 502",
  serviceUnavailable = "response service unavailable 503",
  gatewayTimeout = "response gateway timeout 504",
  httpVersionNotSupported = "response http version not supported 505",
  networkAuthenticationRequired = "response network authentication required 511",
}

interface userRequest extends Request {
  user: Document<unknown, {}, IUser> & IUser;
  [key: string]: any;
}

type CustomRequestHandler = (
  req: userRequest,
  res: Response,
  next: NextFunction
) => Promise<any> | any;

export { HttpStatusResponse, userRequest, CustomRequestHandler };
