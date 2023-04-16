export type RequestState<T> = {
  isLoading: boolean;
  error?: Error;
  data: T;
};