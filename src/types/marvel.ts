export interface BaseResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
}

export interface CharacterResponse extends BaseResponse {
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Character[];
  };
}

export interface Character {
  id: number;
  name: string;
  description: string;
}
