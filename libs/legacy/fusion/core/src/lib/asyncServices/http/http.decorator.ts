import { HttpService, MediaType } from './http.service';
import { methodBuilder, paramBuilder, postMethodBuilder } from './utils.service';

/**********************************************
 * Class decorators
 * *********************************************/

// /**
//  * Set the base URL of REST resource
//  * @param {String} url - base URL
//  */
export function BaseUrl(url: string) {
  return function<TFunction extends Function>(Target: TFunction): TFunction {
    Target.prototype.getBaseUrl = () => url;
    return Target;
  };
}

// /**
//  * Set default headers for every method of the HttpService
//  * @param {Object} headers - deafult headers in a key-value pair
//  */
export function DefaultHeaders(headers: any) {
  return function<TFunction extends Function>(Target: TFunction): TFunction {
    Target.prototype.getDefaultHeaders = () => headers;
    return Target;
  };
}

// /**********************************************
//  * Method decorators
//  * *********************************************/

// /**
//  * GET method
//  * @param {string} url - resource url of the method
//  */
export const GET = methodBuilder('GET');
// /**
//  * POST method
//  * @param {string} url - resource url of the method
//  */
export const POST = postMethodBuilder('POST');
// /**
//  * PUT method
//  * @param {string} url - resource url of the method
//  */
export const PUT = methodBuilder('PUT');
// /**
//  * DELETE method
//  * @param {string} url - resource url of the method
//  */
export const DELETE = methodBuilder('DELETE');
// /**
//  * HEAD method
//  * @param {string} url - resource url of the method
//  */
export const HEAD = methodBuilder('HEAD');

// /**
//  * Set custom headers for a REST method
//  * @param {Object} headersDef - custom headers in a key-value pair
//  */
export function Headers(headersDef: any) {
  return function(target: HttpService, propertyKey: string, descriptor: any) {
    descriptor.headers = headersDef;
    return descriptor;
  };
}

// /**
//  * Defines the media type(s) that the methods can produce
//  * @param MediaType producesDef - MediaType to be sent
//  */
export function Produces(producesDef: MediaType) {
  return function(target: HttpService, propertyKey: string, descriptor: any) {
    descriptor.isJSON = producesDef === MediaType.JSON;
    descriptor.isFormData = producesDef === MediaType.FORM_DATA;
    return descriptor;
  };
}

// /**
//  * Defines the adatper function to modify the API response suitable for the app
//  * @param TFunction adapterFn - function to be called
//  */



// /**********************************************
//  * Parameter decorators
//  * *********************************************/

// /**
//  * Path variable of a method's url, type: string
//  * @param {string} key - path key to bind value
//  */
export const Path = paramBuilder('Path');
// /**
//  * Path variable of a method's url, type: string
//  * @param {string} key - path key to bind value
//  */
export const Dynamic = paramBuilder('Dynamic');
// /**
//  * Query value of a method's url, type: string
//  * @param {string} key - query key to bind value
//  */
export const Query = paramBuilder('Query');
// /**
//  * Body of a REST method, type: key-value pair object
//  * Only one body per method!
//  */
export const Body = paramBuilder('Body')('Body');
// /**
//  * Custom header of a REST method, type: string
//  * @param {string} key - header key to bind value
//  */
export const Header = paramBuilder('Header');
