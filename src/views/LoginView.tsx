import { useForm } from '@tanstack/react-form';

import { loginFormSchema } from '@/validations/loginForm';

import { Button } from '../components/ui/Button/Button';
import { Input } from '../components/ui/Input/Input';
import { Text } from '../components/ui/Text/Text';
import { useLogin } from '../hooks/useLogin';

interface LoginViewProps {
  onLoggedIn: () => void;
}

export default function LoginView({ onLoggedIn }: LoginViewProps) {
  const {
    login,
    error: loginError,
    isLoading: loginIsLoading,
  } = useLogin({ onSuccess: onLoggedIn });

  const defaultValues = {
    email: '',
    password: '',
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: loginFormSchema,
      onSubmit: loginFormSchema,
    },
    onSubmit: ({ value }) => {
      login(value);
    },
  });

  return (
    <div className="mx-auto mt-20 max-w-sm">
      <Text size="xl" as="h2" className="mb-6">
        Login
      </Text>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          children={(field) => (
            <Input
              type="email"
              label="Email"
              value={field.state.value}
              error={
                field.state.meta.isTouched
                  ? field.state.meta.errors[0]?.message || ''
                  : ''
              }
              placeholder="Enter your email"
              className="w-full rounded border p-4"
              onChange={(event) => field.handleChange(event.target.value)}
            />
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <Input
              type="password"
              label="Password"
              value={field.state.value}
              error={
                field.state.meta.isTouched
                  ? field.state.meta.errors[0]?.message || ''
                  : ''
              }
              placeholder="Enter your password"
              className="w-full rounded border p-4"
              onChange={(event) => field.handleChange(event.target.value)}
            />
          )}
        />

        {loginError && (
          <div className="mt-1">
            <Text variant="danger">{loginError.message}</Text>
          </div>
        )}

        <form.Subscribe
          selector={(state) =>
            [
              state.canSubmit,
              state.isSubmitting,
              state.isValid,
              state.isPristine,
            ] as const
          }
          children={([canSubmit, isSubmitting, isValid, isPristine]) => (
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={
                isPristine ||
                !canSubmit ||
                isSubmitting ||
                !isValid ||
                loginIsLoading
              }
            >
              {loginIsLoading ? 'Logging in...' : 'Login'}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
