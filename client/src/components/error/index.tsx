import { useEffect } from "react";
import { useErrorStore } from "../../store/errorStore";

const Error = () => {
  const errors = useErrorStore((state) => state.errors);
  const removeError = useErrorStore((state) => state.removeError);

  useEffect(() => {
    const oldError = errors[0];
    if (errors && oldError) {
      const timer = setTimeout(() => {
        removeError(oldError?.id);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [errors, removeError]);

  return (
    <div
      className="
        fixed bottom-10 left-1/2 -translate-x-1/2
        flex flex-col gap-3 z-50
      "
    >
      {errors.map((error) => (
        <div
          key={error.id}
          className="
            backdrop-blur
            border border-red-400 text-red-500
            px-8 py-2 rounded
            shadow-md
            transition-all duration-300 ease-out
            animate-slide-up
          "
        >
          {error.message}
        </div>
      ))}
    </div>
  );
};

export default Error;
