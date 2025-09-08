import {RequestInit} from "next/dist/server/web/spec-extension/request";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined in .env.local");
}

export class HttpError extends Error {
    status: number;
    payload: unknown; // 에러 응답 본문을 저장할 속성

    private constructor(message: string, status: number, payload: unknown) {
        super(message);
        this.name = "HttpError";
        this.status = status;
        this.payload = payload;
    }

    static async create(response: Response): Promise<HttpError> {
        let payload: unknown;
        try {
            payload = await response.json();
        } catch (e) {
            payload = await response.text();
        }
        const message = `HTTP error! status: ${response.status}`;
        return new HttpError(message, response.status, payload);
    }
}

async function apiFetcher<TResponse>(
    path: string,
    options: RequestInit = {}
): Promise<TResponse> {
    const url = new URL(path, BASE_URL);

    const token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    const mergedOptions: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    const response = await fetch(url.toString(), mergedOptions);

    if (!response.ok) {
        throw await HttpError.create(response);
    }

    if (response.status === 204) {
        return undefined as TResponse;
    }

    return await response.json() as Promise<TResponse>;
}


type FetcherOptions = Omit<RequestInit, 'body'>;

export const api = {
    get: <TResponse>(path: string, options?: FetcherOptions) =>
        apiFetcher<TResponse>(path, {...options, method: "GET"}),

    post: <TResponse>(
        path: string,
        body: object,
        options?: FetcherOptions
    ) =>
        apiFetcher<TResponse>(path, {
            ...options,
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        }),

    put: <TResponse>(path: string, body: object, options?: FetcherOptions) =>
        apiFetcher<TResponse>(path, {
            ...options,
            method: "PUT",
            body: JSON.stringify(body),
        }),

    del: <TResponse>(path: string, options?: FetcherOptions) =>
        apiFetcher<TResponse>(path, {...options, method: "DELETE"}),
};