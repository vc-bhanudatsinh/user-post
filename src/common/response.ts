export interface ICommonResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: [] | object;
  timeStamp: string;
}

export const sucess = (
  status: number,
  message: string,
  data: [] | object = [],
): ICommonResponse => {
  return {
    status: true,
    statusCode: status,
    message,
    data,
    timeStamp: new Date().toISOString(),
  };
};

export const error = (
  status: number,
  message: string,
  data: [] | object = [],
): ICommonResponse => {
  return {
    status: false,
    statusCode: status,
    message,
    data,
    timeStamp: new Date().toISOString(),
  };
};
