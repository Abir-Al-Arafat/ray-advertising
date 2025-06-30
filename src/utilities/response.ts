const success = <T>(message: string, data: T | null = null) => {
  return {
    success: true,
    message: message,
    data: data,
  };
};

const failure = (message: string, error = null) => {
  return {
    success: false,
    message: message,
    error: error,
  };
};

export { success, failure };
