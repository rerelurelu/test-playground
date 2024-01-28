import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  StackProps,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import * as yup from 'yup';
import { schema } from '../schema';
import { useForm, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = yup.InferType<typeof schema>;

export const ProfileForm: FC<StackProps> = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    try {
      const res = await fetch('/profile', {
        method: 'post',
      });

      if (res.status === 200) {
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack spacing={16} {...props}>
      <Heading>ProfileForm</Heading>
      <Container maxW="container.sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <ProfileFormControl htmlFor="name" label="名前" error={errors.name}>
              <Input id="name" placeholder="名前" {...register('name')} />
            </ProfileFormControl>
            <ProfileFormControl htmlFor="email" label="メールアドレス" error={errors.email}>
              <Input id="email" placeholder="xxxx@example.com" {...register('email')} />
            </ProfileFormControl>
            <ProfileFormControl htmlFor="age" label="年齢" error={errors.age}>
              <Input id="age" placeholder="20" {...register('age')} />
            </ProfileFormControl>
            <ProfileFormControl htmlFor="introduction" label="紹介" error={errors.introduction}>
              <Textarea
                id="introduction"
                placeholder="自己紹介"
                rows={5}
                {...register('introduction')}
              />
            </ProfileFormControl>
            <ProfileFormControl htmlFor="job" label="職業" error={errors.job}>
              <Select id="job" placeholder="職業を選択" {...register('job')}>
                <option value="0">エンジニア</option>
                <option value="1">学生</option>
                <option value="2">その他</option>
              </Select>
            </ProfileFormControl>
            <Button
              type="submit"
              isDisabled={!isValid || isSubmitting}
              colorScheme="blue"
              w={'200px'}
            >
              保存
            </Button>
          </VStack>
        </form>
      </Container>
    </VStack>
  );
};

type ProfileFormControlProps = PropsWithChildren & {
  htmlFor: string;
  label: string;
  error: FieldError | undefined;
};

const ProfileFormControl: FC<ProfileFormControlProps> = ({ htmlFor, label, error, children }) => (
  <FormControl isInvalid={!!error}>
    <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
    {children}
    <FormErrorMessage>{error && error.message}</FormErrorMessage>
  </FormControl>
);
