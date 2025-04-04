const ErrorMessage = ({ message }: { message: string }) => {
    return <p style={{ color: "red" }}>Error: {message}</p>;
  };
  
  export default ErrorMessage;
  