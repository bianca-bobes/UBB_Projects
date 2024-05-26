declare module 'jsonwebtoken' {
    export type Secret = string | Buffer;
    export interface SignOptions {
        issuer?: string;
        subject?: string;
        audience?: string | string[];
        expiresIn?: string | number;
        notBefore?: string | number;
        algorithm?: string;
        header?: object;
        encoding?: string;
    }
    export interface VerifyOptions {
        issuer?: string;
        subject?: string;
        audience?: string | string[];
        maxAge?: string | number;
        clockTimestamp?: number;
        clockTolerance?: number;
        algorithms?: string[];
    }
    export interface DecodeOptions {
        complete?: boolean;
    }
    export interface JwtPayload {
        id: string;
    }
    export function sign(payload: string | Buffer | object, secretOrPrivateKey: Secret, options?: SignOptions): string;
    export function verify(token: string, secretOrPublicKey: Secret, options?: VerifyOptions): object | string;
    export function decode(token: string, options?: DecodeOptions): null | { [key: string]: any } | string;
}
