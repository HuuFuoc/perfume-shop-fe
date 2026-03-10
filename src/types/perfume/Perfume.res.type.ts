export interface PerfumeRes {
  _id: string;
  perfumeName: string;
  uri: string;
  price: number;
  concentration: string;
  description: string;
  ingredients: string;
  volume: number;
  targetAudience: string;
  brand: string | null;
}

export interface GetAllPerfumesRes {
  message: string;
  total: number;
  data: PerfumeRes[];
}

export interface GetPerfumeByIdRes {
  message: string;
  data: PerfumeRes & { comments: Comment[] | null };
}

export interface CreatePerfumeRes {
  message: string;
}

export interface UpdatePerfumeRes {
  message: string;
}

export interface DeletePerfumeRes {
  message: string;
}

export interface CreateCommentRes {
  message: string;
}
