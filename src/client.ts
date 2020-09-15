import { AWSSignerV4, sha256Hex } from "../deps.ts";
import type { GetParameterOptions, GetParameterResult } from "./types.ts";
import { SSMError } from"./error.ts"
import { GetParameterAction } from "./actions.ts";

interface Params {
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
}

export interface SSMConfig {
  region: string;
  accessKeyID: string;
  secretKey: string;
  sessionToken?: string;
  endpointURL?: string;
}

export class SSM {
  #signer: AWSSignerV4;
  #host: string;

  constructor(config: SSMConfig) {
    this.#signer = new AWSSignerV4(config.region, {
      awsAccessKeyId: config.accessKeyID,
      awsSecretKey: config.secretKey,
    });
    this.#host = config.endpointURL ??
      `https://ssm.${config.region}.amazonaws.com/`;
  }

  private async _doRequest(
    action: string,
    params: Params,
    body?: Uint8Array | undefined,
  ): Promise<Response> {
    const url = new URL("/", this.#host);

    url.searchParams.set("Action", action);
    for (const key in params) {
      url.searchParams.set(key, params[key]);
    }

    const headers: Params = {
      "X-Amz-Target": `AmazonSSM.${action}`,
      "Accept": "application/json"
    };

    const request = new Request(url.toString(), {
      headers,
      method: "POST",
      body,
    });

    const signedRequest = await this.#signer.sign("ssm", request);
    signedRequest.headers.set("x-amz-content-sha256", sha256Hex(body ?? ""));
    if (body) {
      signedRequest.headers.set("content-length", body.length.toFixed(0));
    }
    return fetch(signedRequest);
  }

  async getParameter(
    options: GetParameterOptions,
  ): Promise<string | undefined> {
    const res = await this._doRequest(
      GetParameterAction,
      options,
    );
    if (res.status === 404) {
      // clean up http body
      await res.arrayBuffer();
      return undefined;
    }
    if (res.status !== 200) {
      throw new SSMError(
        `Failed to get object: ${res.status} ${await res.text()}`,
        "",
      );
    }

    return await res.json();
  }
}
