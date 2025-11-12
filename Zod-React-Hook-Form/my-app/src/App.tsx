import "./App.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(40),
    email: z.string().email(),
    age: z.number().min(18).max(40),
    password: z.string().min(5).max(20),
    confirmPassword: z.string().min(5).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const submitData = (data: FormData) => {
    console.log("IT WORKED", data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <label>First Name:</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && (
          <div className="error">{errors.firstName.message}</div>
        )}

        <label>Last Name:</label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && (
          <div className="error">{errors.lastName.message}</div>
        )}

        <label>Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && <div className="error">{errors.email.message}</div>}

        <label>Age:</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <div className="error">{errors.age.message}</div>}

        <label>Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <div className="error">{errors.password.message}</div>
        )}

        <label>Confirm Password:</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword.message}</div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
